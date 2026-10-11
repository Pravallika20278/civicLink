const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        gender: {
            type: String,
            default: ""
        },

        place: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            default: ""
        },

        profession: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            default: "",
            trim: true
        },

        coins: {
            type: Number,
            default: 0
        },

        creditScore: {
            type: Number,
            default: 100
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);