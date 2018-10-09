const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Db config

const db = require('./config/keys').mongoURI;

// con to moog
mongoose
.connect(db)
.then(() => console.log('connected'))
.catch(err => console.log(err));

// passport middle ware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running ${port}`));