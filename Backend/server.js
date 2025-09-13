const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http');
const socketIo = require('socket.io');
const axios = require("axios"); // For calling Flask API
const Message = require('./models/Message'); // Import the Message model
const jwt = require('jsonwebtoken');
const verifyToken = require('./middlewares/authMiddleware');
const Patient = require("./models/Patient");
fs = require('fs');
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    methods: ["GET", "POST"]
  }
});

// Import Routes
const patientRoutes = require("./routes/patientRoutes");
const therapistRoutes = require("./routes/therapistRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/chat", chatRoutes);

// Start Exercise Route - Calls Flask API
// app.get("/api/start-exercise", async (req, res) => {
//     try {
//         console.log("Starting exercise session...");
//         const response = await axios.get("http://127.0.0.1:5000/api/start-exercise");
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error starting exercise processing:", error.response?.data || error.message);
//         res.status(500).json({ success: false, message: "Failed to start exercise" });
//     }
// });
app.post("/api/start-exercise", verifyToken, async (req, res) => {
  try {
    const { exercise_name } = req.body

    if (!exercise_name) {
      return res.status(400).json({ success: false, message: "Exercise name required!" })
    }

    // Get the user ID and role from the verified token
    const userId = req.user.id // Extracted from the token by the middleware
    const userRole = req.user.role // 'patient' or 'therapist'
 
    console.log(`User ${userId} (${userRole}) is starting exercise: ${exercise_name}`)
  
    // Send user ID along with exercise name to the external API
    const response = await axios.post("http://127.0.0.1:5000/api/start-exercise", { 
      user_id: userId,
      exercise_name 
    })

    res.json(response.data)
  } catch (error) {
    console.error("❌ Error starting specific exercise:", error.response?.data || error.message)
    res.status(500).json({ success: false, message: "Failed to start exercise" })
  }
})

app.get("/exercise-report", verifyToken, async(req, res) => {
  const user_id = req.user.id;
  const user_role = req.user.role; // Get the role from the verified token
  const filePath = "../AI/final_exercise_reports.json"; // Adjust path as per folder structure
  const patient = await Patient.findById(user_id);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }

    let reports;
    try {
      reports = JSON.parse(data); // Parse the JSON data
    } catch (parseError) {
      return res.status(500).json({ error: "Failed to parse report data" });
    }

    console.log("User Role:", user_role); // Debugging log

    if (user_role === "therapist") {
      // If the user is a therapist, return all reports
      return res.json({
        success: true,
        reports: reports
      });
    } else {
      // If the user is not a therapist, return only their reports
      if (!reports[user_id]) {
        return res.status(404).json({ error: `No reports found for user ID ${user_id}` });
      }

      return res.json({
        success: true,
        reports: reports[user_id],
      });
    }
  });
});

app.get("/api/patient/:user_id", async (req, res) => {
  try {
      const patient = await Patient.findById( req.params.user_id );
      if (!patient) return res.status(404).json({ message: "Patient not found" });

      res.json(patient);
  } catch (error) {
      res.status(500).json({ error: "Server Error" });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Adjust timeout if necessary
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.user.id}, Role: ${socket.user.role}`);

  socket.join(socket.user.id);

  socket.on('sendMessage', async (data) => {
    console.log("Received message data:", data);
    
    const { recipient, recipientType, text } = data;
    
    if (!recipient || !recipientType || !text) {
      console.error("Missing required message data:", { recipient, recipientType, text });
      socket.emit('messageError', { error: 'Missing required message data' });
      return;
    }

    try {
      const senderType = socket.user.role.charAt(0).toUpperCase() + socket.user.role.slice(1);
      
      const messageData = {
        sender: socket.user.id,
        senderType,
        recipient,
        recipientType,
        text
      };

      console.log("Creating message with data:", messageData);
      
      const message = new Message(messageData);
      await message.save();

      io.to(recipient).emit('receiveMessage', message);
      io.to(recipient).emit('notification', { message: 'New message received' });

      socket.emit('messageSent', message);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('messageError', { 
        error: 'Failed to send message', 
        details: error.message 
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.user.id}`);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
