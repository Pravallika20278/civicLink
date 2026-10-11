const mongoose = require("mongoose");

const violationSchema = new mongoose.Schema(
    {
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        accusedName: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        evidence: [
            {
                type: String
            }
        ],

        location: {
            type: String,
            default: ""
        },

        fine: {
            type: Number,
            default: 0
        },

        creditReduction: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["Pending", "Reviewed", "Fine Assigned"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Violation", violationSchema);