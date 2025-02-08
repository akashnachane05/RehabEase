const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const therapistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  qualification: { type: String, required: true },
  expertise: { type: [String], default: [] },
  yearsOfExperience: { type: Number, required: true },
});

// Hash password before saving
therapistSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Therapist", therapistSchema);
