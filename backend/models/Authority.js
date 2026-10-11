const mongoose = require("mongoose");

const authoritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      default: "admin"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Authority", authoritySchema);