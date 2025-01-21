
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const Therapist = require("../models/Therapist");

const verifyToken = async (req, res, next) => {
    const token =
        req.header("Authorization") && req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token and extract data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the decoded role to the request object
        
        req.user = decoded;
        let user;
        // Verify the existence of the user based on role
       
        if (decoded.role === "patient") {
            user = await Patient.findById(decoded.id);
        } else if (decoded.role === "therapist") {
            user = await Therapist.findById(decoded.id);
        }

        if (!user) {
            return res.status(404).json({ message: `${decoded.role} not found` });
        }

        next(); // Proceed to the next middleware or controller
    } catch (error) {
        res.status(400).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = verifyToken;
