// Craflin Backend Entry - Express Server Setup

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); 

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//  Proper CORS setup for localhost + frontend deployment
app.use(cors({
  origin: ["http://localhost:5173", "https://craflin-client.vercel.app"], // include frontend origins
  credentials: true,
}));

//  Body parser for JSON requests
app.use(express.json());

//  Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

//  Import routes
const groupRoutes = require("./routes/groupRoutes");
const authRoutes = require("./routes/authRoutes");

// Apply routes
app.use("/api/groups", groupRoutes);
app.use("/api/auth", authRoutes);

// Root health check route
app.get("/", (req, res) => {
  res.send("Craflin Backend Running");
});

//  Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
