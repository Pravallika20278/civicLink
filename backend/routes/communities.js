const express = require("express");

const router = express.Router();

// ===============================
// GET ALL COMMUNITIES
// ===============================

router.get("/", async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Communities fetched successfully",
            communities: []
        });

    } catch (error) {
        console.error("Get communities error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch communities"
        });
    }
});

// ===============================
// CREATE COMMUNITY
// ===============================

router.post("/", async (req, res) => {
    try {
        const {
            name,
            description,
            location
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Community name is required"
            });
        }

        const community = {
            name,
            description: description || "",
            location: location || "",
            members: 0,
            createdAt: new Date()
        };

        console.log("New community:", community);

        res.status(201).json({
            success: true,
            message: "Community created successfully",
            community
        });

    } catch (error) {
        console.error("Create community error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create community"
        });
    }
});

// ===============================
// GET COMMUNITY BY ID
// ===============================

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).json({
            success: true,
            community: {
                id
            }
        });

    } catch (error) {
        console.error("Get community error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch community"
        });
    }
});

// ===============================
// JOIN COMMUNITY
// ===============================

router.post("/:id/join", async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).json({
            success: true,
            message: "Joined community successfully",
            communityId: id
        });

    } catch (error) {
        console.error("Join community error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to join community"
        });
    }
});

// ===============================
// EXPORT
// ===============================

module.exports = router;