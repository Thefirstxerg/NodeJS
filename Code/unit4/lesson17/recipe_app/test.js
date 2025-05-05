const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const subscriberController = require("./controllers/subscribersController");

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // added to suppress deprecation warning
    useCreateIndex: true, // added to suppress ensureIndex deprecation warning
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.use(
    express.urlencoded({
        extended: false,
    })
)

app.use(express.json());
app.use(express.static("public"));

let exampleinstance = new Subscriber({
    name: "Jon",
    email: "ranssdozszm@gmail.com",
    zipCode: 12345,
});

Subscriber.create(exampleinstance)
    .then((subscriber) => Subscriber.findOne({ name: "Jon" }))
    .then((subscriber) => console.log(subscriber.getInfo()))
    .catch((error) => console.log(error.message));


Subscriber.findOne({ name: "Ulrich" })
    .then((subscriber) => console.log(subscriber.getInfo()))
    .catch((error) => console.log(error.message))
