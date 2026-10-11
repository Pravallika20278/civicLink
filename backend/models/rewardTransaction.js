const mongoose = require("mongoose");

const rewardTransactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            enum: [
                "Complaint",
                "Feedback",
                "Community Task",
                "Bonus",
                "Penalty"
            ],
            required: true
        },

        coins: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "RewardTransaction",
    rewardTransactionSchema
);