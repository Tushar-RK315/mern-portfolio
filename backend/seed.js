require('dotenv').config();
const mongoose = require('mongoose');
const Skill = require('./models/Skill');
const Project = require('./models/Project');

const MONGO = process.env.MONGO_URI;

async function seed(){
  await mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true });
  await Skill.deleteMany({});
  await Project.deleteMany({});

  await Skill.insertMany([
    { name: 'React', level: 'Intermediate', order: 1 },
    { name: 'Node.js', level: 'Intermediate', order: 2 },
    { name: 'Express', level: 'Intermediate', order: 3 },
    { name: 'MongoDB', level: 'Beginner', order: 4 },
    { name: 'HTML/CSS', level: 'Advanced', order: 5 }
  ]);

  await Project.insertMany([
    {
      title: 'Task Manager',
      description: 'Simple task CRUD with React and Express',
      tech: ['React','Node','MongoDB'],
      image: '',
      liveUrl: '',
      repoUrl: ''
    },
    {
      title: 'Portfolio Site',
      description: 'My personal portfolio built with MERN',
      tech: ['React','Tailwind','Express'],
      image: '',
      liveUrl: '',
      repoUrl: ''
    }
  ]);

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(e=>{ console.error(e); process.exit(1); });