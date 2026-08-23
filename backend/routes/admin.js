const express = require("express");

const router = express.Router();

// ===============================
// ADMIN LOGIN
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

        res.status(200).json({
            success: true,
            message: "Admin login successful"
        });

    } catch (error) {
        console.error("Admin login error:", error);

        res.status(500).json({
            success: false,
            message: "Admin login failed"
        });
    }
});

// ===============================
// ADMIN DASHBOARD
// ===============================

router.get("/dashboard", async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Admin dashboard working",
            statistics: {
                totalComplaints: 0,
                pendingComplaints: 0,
                completedComplaints: 0,
                rejectedComplaints: 0
            }
        });

    } catch (error) {
        console.error("Dashboard error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard"
        });
    }
});

// ===============================
// GET PENDING COMPLAINTS
// ===============================

router.get("/complaints/pending", async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            complaints: []
        });

    } catch (error) {
        console.error("Pending complaints error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch pending complaints"
        });
    }
});

// ===============================
// ASSIGN COMPLAINT
// ===============================

router.put("/complaints/:id/assign", async (req, res) => {
    try {
        const { id } = req.params;
        const { department } = req.body;

        res.status(200).json({
            success: true,
            message: "Complaint assigned successfully",
            complaintId: id,
            department
        });

    } catch (error) {
        console.error("Assign complaint error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to assign complaint"
        });
    }
});

// ===============================
// UPDATE COMPLAINT STATUS
// ===============================

router.put("/complaints/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        res.status(200).json({
            success: true,
            message: "Complaint status updated",
            complaintId: id,
            status
        });

    } catch (error) {
        console.error("Status update error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update complaint status"
        });
    }
});

// ===============================
// EXPORT
// ===============================

module.exports = router;