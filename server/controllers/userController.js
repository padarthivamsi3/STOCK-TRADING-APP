const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// Register User
// ==========================
const register = async (req, res) => {
    try {
        const { username, email, password, usertype } = req.body;

        // Validate fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            usertype: usertype || "user"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Login User
// ==========================
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please enter email and password."
            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found."
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Credentials."
            });

        }

        // JWT Token
        const token = jwt.sign(

            {
                id: user._id,
                email: user.email,
                usertype: user.usertype
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        // Save token in cookie
        res.cookie("token", token, {

            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000

        });

        res.status(200).json({

            success: true,
            message: "Login Successful",
            token,
            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ==========================
// Logout
// ==========================
const logout = async (req, res) => {

    res.clearCookie("token");

    res.status(200).json({

        success: true,
        message: "Logged out successfully."

    });

};

// ==========================
// Get Profile
// ==========================
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        res.status(200).json({

            success: true,
            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    register,
    login,
    logout,
    getProfile

};