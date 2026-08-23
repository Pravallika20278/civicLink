const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ===============================
// REGISTER
// ===============================

router.post("/register", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password
        } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                name,
                email,
                phone
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
});

// ===============================
// LOGIN
// ===============================

router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const token = jwt.sign(
            {
                email
            },
            process.env.JWT_SECRET || "civiclink_secret",
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
});

// ===============================
// TEST AUTH ROUTE
// ===============================

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Authentication API is working"
    });
});

// ===============================
// EXPORT
// ===============================

module.exports = router;