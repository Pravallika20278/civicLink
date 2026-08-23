const express = require("express");

const router = express.Router();

// ===============================
// GET ALL COMPLAINTS
// ===============================

router.get("/", async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Complaints fetched successfully",
            complaints: []
        });

    } catch (error) {
        console.error("Get complaints error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch complaints"
        });
    }
});

// ===============================
// GET COMPLAINT BY ID
// ===============================

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).json({
            success: true,
            message: "Complaint fetched successfully",
            complaint: {
                id
            }
        });

    } catch (error) {
        console.error("Get complaint error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch complaint"
        });
    }
});

// ===============================
// CREATE COMPLAINT
// ===============================

router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location
        } = req.body;

        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Complaint description is required"
            });
        }

        const complaint = {
            title: title || "Civic Complaint",
            description,
            category: category || "Other",
            location: location || "",
            status: "Pending",
            createdAt: new Date()
        };

        console.log("New complaint:", complaint);

        res.status(201).json({
            success: true,
            message: "Complaint submitted successfully",
            complaint
        });

    } catch (error) {
        console.error("Create complaint error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create complaint"
        });
    }
});

// ===============================
// UPDATE COMPLAINT
// ===============================

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).json({
            success: true,
            message: "Complaint updated successfully",
            complaintId: id,
            data: req.body
        });

    } catch (error) {
        console.error("Update complaint error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update complaint"
        });
    }
});

// ===============================
// DELETE COMPLAINT
// ===============================

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).json({
            success: true,
            message: "Complaint deleted successfully",
            complaintId: id
        });

    } catch (error) {
        console.error("Delete complaint error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete complaint"
        });
    }
});

// ===============================
// EXPORT
// ===============================

module.exports = router;