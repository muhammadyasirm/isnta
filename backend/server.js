const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

/*
  DEPLOYMENT CORS CONFIGURATION:
  Cloudflare Pages se requests allow karne ke liye CORS configuration.
  Aap chahein to CLIENT_URL me apna exact Cloudflare domain daal sakte hain,
  ya default sab allow kar sakte hain.
*/
const allowedOrigin = process.env.CLIENT_URL || "*";
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

// Health Check route for Render deployment verification
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      status: "OK",
      message: "Server is healthy and running on Render.",
    });
});

// Mount user API routes
app.use("/api", userRoutes);

/*
  DEPLOYMENT PORT:
  Render automatically PORT environment variable assign karta hai (e.g. 10000).
  Isliye process.env.PORT use karna lazmi hai.
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
