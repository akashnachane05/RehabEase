const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Patient = require("../models/Patient");
const Therapist = require("../models/Therapist");

const generateToken = (id,role) => {
  return jwt.sign({ id,role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register Patient
exports.registerPatient = async (req, res) => {
  try {
    const { name, age, dob, email, password, gender, medicalHistory, currentSymptoms } = req.body;
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) return res.status(400).json({ message: "Patient already exists" });

    const user = await Patient.create({
      name,
      age,
      dob,
      email,
      password,
      gender,
      medicalHistory: medicalHistory.split(","),
      currentSymptoms: currentSymptoms.split(","),
    });

    res.status(201).json({ message: "Patient registered", token: generateToken(user._id,"patient") });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register Therapist
exports.registerTherapist = async (req, res) => {
  try {
    const { name, age, dob, email, password, qualification, expertise, yearsOfExperience } = req.body;
    const existingTherapist = await Therapist.findOne({ email });
    if (existingTherapist) return res.status(400).json({ message: "Therapist already exists" });

    const therapist = await Therapist.create({
      name,
      age,
      dob,
      email,
      password,
      qualification,
      expertise: expertise.split(","),
      yearsOfExperience,
    });

    res.status(201).json({ message: "Therapist registered", token: generateToken(therapist._id,"therapist") });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Patient Login
exports.loginPatient = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Patient.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "Patient not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      res.json({
        token: generateToken(user._id,"patient"),
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Therapist Login
  exports.loginTherapist = async (req, res) => {
    const { email, password } = req.body;
    try {
      const therapist = await Therapist.findOne({ email });
  
      if (!therapist) return res.status(404).json({ message: "Therapist not found" });
  
      const isMatch = await bcrypt.compare(password, therapist.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      res.json({
        token: generateToken(therapist._id,"therapist"),
        user: { id: therapist._id, name: therapist.name, email: therapist.email },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  