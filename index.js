// Craflin Backend Entry - Express Server Setup

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//  Manual CORS Fix for Vercel & Localhost
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Preflight fix
  }

  next();
});

//  Parse JSON request bodies
app.use(express.json());

//  Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Error:", err));

//  Import Routes
const groupRoutes = require("./routes/groupRoutes");
const authRoutes = require("./routes/authRoutes");

//  Apply Routes
app.use("/api/groups", groupRoutes);
app.use("/api/auth", authRoutes);

//  Root route
app.get("/", (req, res) => {
  res.send("Craflin Backend Running ");
});

//  Start the server
app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
