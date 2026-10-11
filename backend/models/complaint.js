const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            default: "Other"
        },

        department: {
            type: String,
            default: "General Department"
        },

        media: [
            {
                type: String
            }
        ],

        location: {
            address: {
                type: String,
                default: ""
            },

            latitude: {
                type: Number,
                default: null
            },

            longitude: {
                type: Number,
                default: null
            }
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Assigned",
                "In Progress",
                "Completed",
                "Rejected"
            ],
            default: "Pending"
        },

        assignedDepartment: {
            type: String,
            default: ""
        },

        assignedBy: {
            type: String,
            default: ""
        },

        completedAt: {
            type: Date,
            default: null
        },

        coinsAwarded: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);