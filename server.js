const express = require('express');
const session = require('express-session');
const body_parser = require('body-parser');
const path = require('path');

const auth_routes = require('./routes/auth_routes');
const video_routes = require('./routes/video_routes');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(body_parser.urlencoded({ extended: true }));
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true
}));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.use('/auth', auth_routes);
app.use('/video', video_routes);

app.get('/', (req, res) => {
  res.redirect('/auth/register');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
