const express = require("express");

const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Violations API is working"
    });
});

// Get violation by ID
router.get("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Violation found",
        id: req.params.id
    });
});

// Create violation
router.post("/", (req, res) => {
    console.log("Violation received:", req.body);

    res.status(201).json({
        success: true,
        message: "Violation created successfully",
        data: req.body
    });
});

// Update violation
router.put("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Violation updated successfully",
        id: req.params.id,
        data: req.body
    });
});

// Delete violation
router.delete("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Violation deleted successfully",
        id: req.params.id
    });
});

// IMPORTANT
module.exports = router;