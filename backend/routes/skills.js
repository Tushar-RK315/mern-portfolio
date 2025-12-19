const router = require('express').Router();
const Skill = require('../models/Skill');

router.get('/', async (req,res)=>{
  const list = await Skill.find().sort({ order: 1 });
  res.json(list);
});

router.post('/', async (req,res)=>{
  const s = new Skill(req.body);
  await s.save();
  res.status(201).json(s);
});

module.exports = router;