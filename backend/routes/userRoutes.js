const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/users
router.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const newUser = await User.create({ email, password });

    return res.status(201).json({
      message: "User successfully stored in MongoDB Atlas!",
      user: {
        id: newUser._id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to store user in database: " + error.message,
    });
  }
});

module.exports = router;
