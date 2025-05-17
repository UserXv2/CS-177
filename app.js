const express = require('express');
const path = require('path');
const fs = require('fs');

const Category = require('./category');
const Tasks = require('./task');
const extraConsideration = require('./extraConsideration');
const ClockTime = require('./clockTime');
const DateClass = require('./date');

const taskStorage = require('./taskStorage');
const categoryStorage = require('./categoryStorage');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Load categories from file
let categories = categoryStorage.loadCategories();

app.get('/tasks', (req, res) => {
  try {
    const tasks = taskStorage.loadTasks(); // Assuming this returns an array
    res.json(tasks);
  } catch (err) {
    res.status(500).send({ error: 'Failed to load tasks' });
  }
});

app.get('/task/:id', (req, res) => {
  const tasks = taskStorage.loadTasks();
  const taskId = req.params.id;
  // res.json(tasks);
	const task = tasks.tasks.find(t => t.id === taskId);
  console.log((task))
	if (!task) {
  return res.status(404).send('Task not found');
}
  res.render('task', { task, taskId });

});


app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

app.get('/category_creator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/category_creator.html'));
});

app.get('/category_view', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/category_view.html'));
});

app.get('/new_task', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/new_task.html'));
});

app.get('/new_task_detail', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/new_task_detail.html'));
});

// Get all categories
app.get('/categories', (req, res) => {
  res.status(200).json(categories);
});

// Add a task
app.post('/add_task', (req, res) => {
  try {
    const taskName = req.body.task_name;
    const isRecurr = req.body.taskRecurr === 'true';
    const catType =  req.body.category;
    const catRed = Number(req.body.red);
    const catGreen = Number(req.body.green);
    const catBlue = Number(req.body.blue);
    const catFlex = 5;
    const progress = Number(req.body.progress);
    const details = req.body.details;

    const startDate = textDateToVar(req.body.dateS);
    const endDate = textDateToVar(req.body.dateE);
    const startTime = textTimeToVar(req.body.timeS);
    const endTime = textTimeToVar(req.body.timeE);

    if (!taskName || !catType || !details || !startDate || !endDate || !startTime || !endTime) {
      return res.status(400).send("Missing required fields.");
    }

    const newTask = new Tasks(
      taskName, catType, catRed, catGreen, catBlue, catFlex,
      details, startDate, endDate, startTime, endTime,
      progress, isRecurr
    );

    taskStorage.addTask(newTask);
    res.send(`<h2>Task Created:</h2><pre>${JSON.stringify(newTask, null, 2)}</pre>`);
  } catch (err) {
    res.status(500).send("Server Error: " + err.message);
  }
});

// Add a category
app.post('/add_category', (req, res) => {
  try {
    const cType = req.body.cType;
    const red = req.body.red;
    const green =req.body.green;
    const blue = req.body.blue;
    const flex = req.body.flex;

    console.log("catType", cType);
    const newCategory = new Category(cType, red, green, blue, flex);


    // categories.push(newCategory);
    console.log("categories", newCategory);
    categoryStorage.addCategories(newCategory);

    res.send(`<h2>Category Created:</h2><pre>${JSON.stringify(newCategory, null, 2)}</pre>`);
  } catch (err) {
    res.status(500).send("Error saving category: " + err.message);
  }
});

// Utility to convert string date to DateClass
function textDateToVar(dateString) {
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  return new DateClass(day, month);
}

// Utility to convert string time to ClockTime
function textTimeToVar(timeString) {
  let hour = parseInt(timeString.slice(0, 2));
  const minute = parseInt(timeString.slice(3, 5));
  let isAM = true;
  if (hour > 11) {
    if (hour > 12) hour -= 12;
    isAM = false;
  }
  return new ClockTime(hour, minute, isAM);
}

const port = 3000;
app.listen(port, () => {
  console.log('Testing Server Running on port', port, new Date().toLocaleTimeString());
});
