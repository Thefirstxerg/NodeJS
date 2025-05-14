"use strict";

// Imports
const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const session = require('express-session');
const flash = require('connect-flash');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


//View Engine Setup
const app = express();
app.set('view engine', 'ejs'); 

app.use(express.static('public'));
app.use(bodyParser.json()); // Onload all incoming data as JSON so req.body can be used
app.use(bodyParser.urlencoded({ 
    extended: true 
}));

// Connect to MongoDB and get rid of depricated warnings
mongoose.set('strictQuery', false); // Get rid of depricated warnings
mongoose.connect('mongodb://localhost/my_database', { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true,
});

const PORT = 4000; // Port number
// Session middleware
app.use(session({
    secret: 'place-session-cookie-ID-here',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,      // Prevents client-side JS from reading the cookie
        secure: false,       // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Flash middleware
app.use(flash()); // Enables flash messages

// Changed global.loggedIn to res.locals.isLoggedIn 
// to make it more secure and to follow best practices
app.use("*", (req, res, next) => {
    res.locals.isLoggedIn = Boolean(req.session.userId);
    res.locals.userId = req.session.userId;
    next();
});

app.use(fileUpload()); // Any data uploaded via a form will be available in req.files

app.listen(PORT, () => {
    console.log('App listening on port 4000');
});