const express = require('express');

const path = require('path');
const Category = require('./category');

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

app.post('/add_category', (req, res) => {
  console.log(req.body);
  let cType = req.body.cType
  let red = req.body.red
  let green = req.body.green
  let blue = req.body.blue
  let flex = req.body.flex
  if (!cType || cType.trim() === '') {
    return res.status(400).send('<h2>Error:</h2><p>Category Name is required.</p>');
  } 
  const newCategory = {
    cType,
    red,
    green,
    blue
    // tasks: tasks || [], // Default to an empty array if tasks are not provided
    // description: description || ''
  };

  categories.push(newCategory);

  res.status(200).send(`
    <h2>Category Created:</h2>
    <pre>${JSON.stringify(newCategory, null, 2)}</pre>
  `);
});

app.get('/categories', (req, res) => {
  res.status(200).json(categories); // Return categories as JSON
});


const print = function(s) {
  console.log(s);
}

const port = 3000;
app.listen(port, () => console.log('Testing Server Running')) ;