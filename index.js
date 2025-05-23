// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors"); // include this

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// //  FIX: CORRECT CORS MIDDLEWARE USAGE
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://craflin-client.vercel.app"],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     credentials: true,
//   })
// );

// // JSON parser
// app.use(express.json());

// //  MongoDB connect
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Error:", err));

// //  Routes
// const groupRoutes = require("./routes/groupRoutes");
// const authRoutes = require("./routes/authRoutes");

// app.use("/api/groups", groupRoutes);
// app.use("/api/auth", authRoutes);

// // Root
// app.get("/", (req, res) => {
//   res.send("Craflin Backend Running");
// });

// //  Start
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const groupRoutes = require('./routes/groupRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Enhanced CORS Configuration
// const corsOptions = {
//   origin: [
//     "http://localhost:5123", 
//     "http://localhost:5173",
//     "https://your-frontend-domain.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
//   optionsSuccessStatus: 200 // For legacy browser support
// };

// app.use(cors(corsOptions));

// // Handle preflight requests
// app.options('*', cors(corsOptions));

// // Middleware
// app.use(express.json());

// // Database Connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/groups', groupRoutes); // Fixed endpoint path

// // Health Check
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Server is running' });
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const groupRoutes = require('./routes/groupRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// //  CORS Configuration — place at the very top
// const corsOptions = {
//   origin: ["http://localhost:5173", "http://localhost:5123", "https://craflin-client.web.app"],
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// //  Handle Preflight (OPTIONS) Requests BEFORE all
// app.options("*", cors(corsOptions));

// // Use CORS and JSON parser
// app.use(cors(corsOptions));
// app.use(express.json());

// // Connect MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // API Routes
// app.use("/api/groups", groupRoutes);

// // Health Check Route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Server is running" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });







require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const groupRoutes = require("./routes/groupRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Minimal CORS manually handled (No CORS package!)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 👈 Change to specific origin in production
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ JSON Parser
app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api/groups", groupRoutes);
app.use("/api/auth", authRoutes);

// ✅ Health
app.get("/", (req, res) => {
  res.send("🎯 Backend is LIVE and CORS is open.");
});

// ✅ Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something broke!" });
});

// ✅ Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
