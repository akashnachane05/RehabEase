const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// Import Routes
const patientRoutes = require("./routes/patientRoutes");
const therapistRoutes = require("./routes/therapistRoutes");

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/therapists", therapistRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Adjust the timeout if necessary
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
