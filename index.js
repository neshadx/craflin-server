const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//  Manually fix CORS (for Vercel)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

//  Parse JSON
app.use(express.json());

//  Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Routes
const groupRoutes = require("./routes/groupRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/groups", groupRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Craflin Backend Running");
});

//  Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
