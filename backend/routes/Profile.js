const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// সর্বশেষ profile ফেরত দেবে
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// নতুন profile save করবে (Thunder Client থেকে)
router.post("/", async (req, res) => {
  try {
    const profile = new Profile(req.body);
    const saved = await profile.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;