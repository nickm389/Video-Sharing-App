const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const users_file = path.join(__dirname, '../data/users.json');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  const raw = JSON.parse(fs.readFileSync(users_file));
  let users = raw.users;

  users.push({ email, name, password });
  fs.writeFileSync(users_file, JSON.stringify({ users }, null, 2));

  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const raw = JSON.parse(fs.readFileSync(users_file));
  const users = raw.users;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.render('login');
  }

  req.session.user = { email: user.email, name: user.name };
  res.redirect('/video/dashboard/all');
});

module.exports = router;
