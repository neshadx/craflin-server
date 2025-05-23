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
const cors = require("cors");
const mongoose = require("mongoose");

const groupRoutes = require("./routes/groupRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Step 1: CORS
app.use(cors({
  origin: "*", // Temporary for testing; replace with array of allowed origins in production
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Step 2: Manual override for stubborn CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Try specific frontend if * fails
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// ✅ Step 3: Middleware
app.use(express.json());

// ✅ Step 4: DB connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Step 5: Routes
app.use("/api/groups", groupRoutes);
app.use("/api/auth", authRoutes);

// ✅ Step 6: Health
app.get("/", (req, res) => {
  res.send("🎯 Craflin backend is alive.");
});

// ✅ Step 7: Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong." });
});

// ✅ Step 8: Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
