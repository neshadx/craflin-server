const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // include this

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//  FIX: CORRECT CORS MIDDLEWARE USAGE
app.use(
  cors({
    origin: ["http://localhost:5173", "https://craflin-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

//  MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

//  Routes
const groupRoutes = require("./routes/groupRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/groups", groupRoutes);
app.use("/api/auth", authRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Craflin Backend Running");
});

//  Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



