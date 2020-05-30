const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let users = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3012, () => {
  // console.log('API app started');
});

app.use(cors());
app.use(bodyParser.json());

app.post('/sign-up', (req, res) => {
  const {
    name, password, email, website, age, skills,
  } = req.body;
  if (users.findIndex((user) => email === user.email) !== -1) {
    // console.log('АЖЫБГА-такой уже есть');
    // res.send('АЖЫБГА-такой уже есть');
    throw new Error('Something broke yet again! ');
  } else {
    users = [
      ...users,
      {
        name,
        password,
        email,
        website,
        age,
        skills,
      },
    ];
  }

  app.use((error, req, res, next) => {
    res.status(400);
    res.send('АЖЫБГА-такой уже есть');
  });

  // console.log(11111111, email, users[0].email, users);

  res.send('okkkkkkk').end();
});
