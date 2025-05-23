"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  Subscriber = require("./models/subscriber"),
  User = require("./models/user"); // Add User model import

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true,
    useUnifiedTopology: true, // added to suppress deprecation warning
    useCreateIndex: true,}
);

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/", homeController.index);
app.get("/contact", homeController.getSubscriptionPage);

app.get("/users", usersController.index, usersController.indexView);
app.get("/subscribers", subscribersController.index, subscribersController.indexView);
app.get("/courses", coursesController.index, coursesController.indexView);

app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});




Subscriber.create({
  name: "Jon",
  email: "someemail@gmail.com",
  zipCode: 12345
});

User.create({
  name: {
    first: "Jon",
    last: "Wexler "
  },
  email: "jon@jonwexler.com",
  password: "pass123"
})
  .then(user => {
    return Subscriber.findOne({
      email: user.email
    }).then(subscriber => {
      user.subscribedAccount = subscriber;
      return user.save();
    });
  })
  .then(() => console.log("user updated"))
  .catch(error => console.log(error.message));