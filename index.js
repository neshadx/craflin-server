const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// FIXED CORS for localhost + frontend domain
app.use(cors({
  origin: ["http://localhost:5173", "https://craflin-client.vercel.app"],
  credentials: true
}));

// Parse JSON requests
app.use(express.json());

// MongoDB connect
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

//  Root route
app.get("/", (req, res) => {
  res.send("Craflin Backend Running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
