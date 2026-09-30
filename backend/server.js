const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Sare origins allow karein taake Cloudflare Pages se request block na ho
app.use(cors());
app.use(express.json());

// Har incoming request se pehle database connection ensure karein
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Health check route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Backend is running on Vercel" });
});

// API Routes
app.use("/api", userRoutes);

// Local environment k liye listen karega
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

// Vercel serverless runtime k liye export lazmi hai
module.exports = app;
