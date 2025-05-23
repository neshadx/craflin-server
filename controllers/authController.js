const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, photoURL } = req.body;

    // Password validation
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    if (!hasUpper || !hasLower || password.length < 6) {
      return res.status(400).json({
        error: "Password must have at least 1 uppercase, 1 lowercase, and be 6+ characters long",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ name, email, password, photoURL });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { register, login };




