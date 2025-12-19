require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

console.log("🚀 Server setup started");

// routes
app.use("/api/skills", require("./routes/skills"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contact", require("./routes/contact"));
// Ensure route path matches actual filename (case-sensitive on some OS)
app.use("/api/profile", require("./routes/Profile")); // 🔥 নতুন profile route

// health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
console.log("🌱 Trying to connect to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => console.log("🚀 Server running on", PORT));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });