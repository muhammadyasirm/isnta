const mongoose = require("mongoose");
const dns = require("dns");

// Node.js ko force karein k woh Google aur Cloudflare k DNS use kare
// Ye ISP k querySrv ECONNREFUSED issue ko direct fix kar deta hai
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing.");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // IPv4 ko force karega (IPv6 resolving issues avoid karta hai)
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
