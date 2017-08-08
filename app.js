const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const db = require('./config/database');

mongoose.connect(db.database);

mongoose.connection.on('connected', () => {
	console.log('Connected to database: ' + db.database);
});

mongoose.connection.on('error', (err) => {
	console.log('Database Error: ' + err);
});


const app = express();

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


// Using Routes
const users = require('./routes/users');
app.use('/users', users);

const subjects = require('./routes/subjects');
app.use('/subjects', subjects);

const homeworks = require('./routes/homeworks');
app.use('/homeworks', homeworks);




app.get('/', (req, res) => {
	res.send("Hello!");
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
	console.log("Server started on port " + port);
});
