const express = require('express');

const path = require('path');
const Category = require('./category');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

app.get('/category_creator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/category_creator.html'));
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
  let newCat = new Category(cType, red, green, blue, flex)
      res.send(`
              <h2>Category Created:</h2>
              <pre>${JSON.stringify(newCat, null, 2)}</pre>
            `);
});

const print = function(s) {
  console.log(s);
}

const port = 3000;
app.listen(port, () => console.log('Testing Server Running')) ;