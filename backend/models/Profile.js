const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true }, // e.g. MERN Stack Developer
    bio: { type: String, required: true },
    location: String,
    avatarUrl: String,
    social: {
      facebook: String,
      linkedin: String,
      github: String,
      instagram: String,
      whatsapp: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);