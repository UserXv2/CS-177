const express = require('express');

const path = require('path');
const Category = require('./category');
const Tasks = require('./task');
const extraConsideration = require('./extraConsideration');
const clockTime = require('./clockTime');
const dateClass = require('./date');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let categories = [];

app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

app.get('/category_creator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/category_creator.html'));
});

app.get('/category_view', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/category_view.html'));
});

app.post('/add_task', (req, res) => {
  try {
    const isRecurr = req.body.taskRecurr === 'true';

    const catType = req.body.cType;
    const catRed = Number(req.body.cRed);
    const catGreen = Number(req.body.cGreen);
    const catBlue = Number(req.body.cBlue);
    const catFlex = req.body.cFlex === 'true';

    const progress = Number(req.body.progress);
    const details = req.body.details;

    const startDate = textDateToVar(req.body.dateS);
    const endDate = textDateToVar(req.body.dateE);
    const startTime = textTimeToVar(req.body.timeS);
    const endTime = textTimeToVar(req.body.timeE);

    if (!catType || !details || !startDate || !endDate || !startTime || !endTime) {
      return res.status(400).send("Missing required fields.");
    }

    const newTask = new Tasks(
      catType, catRed, catGreen, catBlue, catFlex,
      details, startDate, endDate, startTime, endTime,
      progress, isRecurr
    );

    res.send(`
      <h2>Task Created:</h2>
      <pre>${JSON.stringify(newTask, null, 2)}</pre>
    `);
  } catch (err) {
    res.status(500).send("Server Error: " + err.message);
  }
});


app.get('/categories', (req, res) => {
  res.status(200).json(categories); // Return categories as JSON
});

app.get('/new_task', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/new_task.html'));
});

function textDateToVar (dateString) {
  var dCMonth = dateString.slice(5,7)
  var dCDay = dateString.slice(8,10)
  
  var newDate = new dateClass(dCDay, dCMonth);
  return newDate;
}

function textTimeToVar (timeString) {
  var cTHour = timeString.slice(0,2);
  var cTTime = timeString.slice(3,5);
  var cTAM = true;
  if (cTHour > 11) { //it is am
    cTHour -= 12
    cTAM = false
  }
  var newClockTime = new clockTime(cTHour, cTTime, cTAM);
  return newClockTime;
}

app.post('/add_task', (req, res) => {
  var isRecurr = req.body.taskRecurr

  var catType = req.body.cType
  var catRed = req.body.cRed
  var catGreen = req.body.cGreen
  var catBlue = req.body.cBlue
  var catFlex = req.body.cFlex
  var taskCat = new category(catType, catRed, catGreen, catBlue, catFlex)

  var progress = req.body.progress

  var startDate = textDateToVar(req.body.dateS)
  var endDate = textDateToVar(req.body.dateE);
  var startTime = textTimeToVar(req.body.timeS);
  var endTime = textTimeToVar(req.body.timeE);
  //Assume these are not used, but consider them anyways
  var taskRed = req.body.tRed
  var taskGreen = req.body.tGreen
  var taskBlue = req.body.tBlue
  //this will be used
  var details = req.body.details

  var newTask = new Tasks(catType, catRed, catGreen, catBlue, catFlex, details, startDate, endDate, startTime, endTime, progress, isRecurr);
  res.send(`
      <h2>Consideration Created:</h2>
      <pre>${JSON.stringify(newTask, null, 2)}</pre>
      `);

});

const print = function(s) {
  console.log(s);
}

const port = 3000;
app.listen(port, () => console.log('Testing Server Running')) ;