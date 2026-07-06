const express = require("express");
const cors = require("cors");
const donorRoutes = require("./routes/donorRoutes");
require("dotenv").config();
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Default Route
app.get("/", (req, res) => {
    res.send("AI Blood Donation Management System Backend is Running...");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/donors", donorRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on Port ${PORT}`);
});