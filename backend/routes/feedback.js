const express = require("express");

const router = express.Router();

// ===============================
// GET ALL FEEDBACK
// ===============================

router.get("/", async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Feedback fetched successfully",
            feedback: []
        });

    } catch (error) {
        console.error("Get feedback error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch feedback"
        });
    }
});

// ===============================
// SUBMIT FEEDBACK
// ===============================

router.post("/", async (req, res) => {
    try {
        const {
            complaintId,
            rating,
            comment
        } = req.body;

        if (!complaintId || !rating) {
            return res.status(400).json({
                success: false,
                message: "Complaint ID and rating are required"
            });
        }

        const feedback = {
            complaintId,
            rating,
            comment: comment || "",
            createdAt: new Date()
        };

        console.log("New feedback:", feedback);

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully",
            feedback
        });

    } catch (error) {
        console.error("Submit feedback error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit feedback"
        });
    }
});

// ===============================
// GET FEEDBACK FOR COMPLAINT
// ===============================

router.get("/complaint/:complaintId", async (req, res) => {
    try {
        const { complaintId } = req.params;

        res.status(200).json({
            success: true,
            complaintId,
            feedback: []
        });

    } catch (error) {
        console.error("Complaint feedback error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch complaint feedback"
        });
    }
});

// ===============================
// EXPORT
// ===============================

module.exports = router;