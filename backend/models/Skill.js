const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: String,
  level: String,
  order: Number
});

module.exports = mongoose.model('Skill', SkillSchema);