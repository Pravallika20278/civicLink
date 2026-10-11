const mongoose = require("mongoose");

const communityTaskSchema = new mongoose.Schema(
    {
        community: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        rewardCoins: {
            type: Number,
            default: 20
        },

        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending"
        },

        completedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "CommunityTask",
    communityTaskSchema
);