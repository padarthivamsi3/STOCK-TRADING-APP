const express = require("express");
const router = express.Router();

const {
    register,
    login,
    logout,
    getProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.get("/me", authMiddleware, getProfile);

module.exports = router;