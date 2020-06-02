const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let users = [];

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.listen(3012, () => {
  // console.log('Server started');
});

app.use(cors());
app.use(bodyParser.json());

app.post('/sign-up', (req, res) => {
  const {
    name, password, email, website, age, skills,
  } = req.body;
  if (users.findIndex((user) => email === user.email) > -1) {
    res.status(400);
    res.send('Пользователь с такой почтой уже есть').end();
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
    res.send('Вы успешно зарегистрированы').end();
  }
});
