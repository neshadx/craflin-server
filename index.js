


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
app.use("/api/groups", groupRoutes);

// Root check
app.get("/", (req, res) => {
  res.send("Craflin Backend Running");
});

// Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

