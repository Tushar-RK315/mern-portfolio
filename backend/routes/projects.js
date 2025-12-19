const router = require('express').Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  const list = await Project.find().sort({ createdAt: -1 });
  res.json(list);
});

router.post('/', async (req, res) => {
  const p = new Project(req.body);
  await p.save();
  res.status(201).json(p);
});

module.exports = router;