const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is missing.");
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(process.env.MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log(
          `MongoDB Atlas Connected: ${mongooseInstance.connection.host}`,
        );
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;
