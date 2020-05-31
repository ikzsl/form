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
  const { name, password, email, website, age, skills } = req.body;
  // console.log(users.findIndex((user) => email === user.email));
  if (users.findIndex((user) => email === user.email) > -1) {
    // console.log('АЖЫБГА', users);
    // res.send('АЖЫБГА-такой уже есть');
    app.use(() => {
      res.status(400);
      res.send('Пользователь с такой почтой уже есть').end();
    });
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
    // console.log(users);
    res.status(200);
    res.send('Пользователь успешно зарегистрирован').end();
  }
  // console.log(11111111, email, email, users);
});
