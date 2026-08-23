const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// =====================================
// FRONTEND
// =====================================

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);

// =====================================
// UPLOADS
// =====================================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "../uploads")
    )
);

// =====================================
// IMPORT ROUTES
// =====================================

const authRoutes = require("./routes/auth");
const complaintRoutes = require("./routes/complaints");
const adminRoutes = require("./routes/admin");
const feedbackRoutes = require("./routes/feedback");
const communityRoutes = require("./routes/communities");
const violationRoutes = require("./routes/violations");

// =====================================
// CHECK ROUTES
// =====================================

console.log("");
console.log("======================================");
console.log("       CIVICLINK ROUTE CHECK");
console.log("======================================");

console.log("AUTH        :", typeof authRoutes);
console.log("COMPLAINTS  :", typeof complaintRoutes);
console.log("ADMIN       :", typeof adminRoutes);
console.log("FEEDBACK    :", typeof feedbackRoutes);
console.log("COMMUNITIES :", typeof communityRoutes);
console.log("VIOLATIONS  :", typeof violationRoutes);

console.log("======================================");
console.log("");

// =====================================
// API ROUTES
// =====================================

console.log("Loading AUTH route...");
app.use("/api/auth", authRoutes);
console.log("AUTH route loaded successfully.");

console.log("Loading COMPLAINTS route...");
app.use("/api/complaints", complaintRoutes);
console.log("COMPLAINTS route loaded successfully.");

console.log("Loading ADMIN route...");
app.use("/api/admin", adminRoutes);
console.log("ADMIN route loaded successfully.");

console.log("Loading FEEDBACK route...");
app.use("/api/feedback", feedbackRoutes);
console.log("FEEDBACK route loaded successfully.");

console.log("Loading COMMUNITIES route...");
app.use("/api/communities", communityRoutes);
console.log("COMMUNITIES route loaded successfully.");

console.log("Loading VIOLATIONS route...");
app.use("/api/violations", violationRoutes);
console.log("VIOLATIONS route loaded successfully.");

// =====================================
// HEALTH CHECK
// =====================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CivicLink API is running"
    });
});

// =====================================
// FRONTEND HOME PAGE
// =====================================

app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );
});

// =====================================
// 404 HANDLER
// =====================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// =====================================
// ERROR HANDLER
// =====================================

app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

// =====================================
// DATABASE
// =====================================

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("");
    console.error("ERROR: MONGO_URI is missing.");
    console.error("Check your .env file.");
    console.error("");
    process.exit(1);
}

// =====================================
// START SERVER
// =====================================

async function startServer() {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected successfully.");

        app.listen(PORT, () => {
            console.log("");
            console.log("======================================");
            console.log("       CIVICLINK SERVER RUNNING");
            console.log("======================================");
            console.log(`Server : http://localhost:${PORT}`);
            console.log(`Health : http://localhost:${PORT}/api/health`);
            console.log("======================================");
            console.log("");
        });

    } catch (error) {
        console.error("");
        console.error("MongoDB connection failed.");
        console.error("Error:", error.message);
        console.error("");
        process.exit(1);
    }
}

startServer();