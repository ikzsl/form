const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3012, () => {
  console.log('API app started');
});

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.get('/q', (req, res, next) => {
  console.log(req.params);
  res.send('okkkkkkk').end();
});

app.post('/sign-up', (req, res) => {
  console.log(req.body);
  res.send('okkkkkkk').end();
});
