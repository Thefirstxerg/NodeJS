"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const subscribersController = require("./controllers/subscribersController");
const methodOverride = require("method-override"); 

//connecting to database
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");

});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Setup middleware
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// Custom middleware
app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

// Routes
app.get("/", homeController.index);
app.get("/courses", homeController.showCourses);  // Add courses route

// Contact routes
app.get("/contact", homeController.showSignUp);
app.post("/contact", subscribersController.saveSubscriber);

// Subscriber routes (order matters)
app.get("/subscribers/:id/edit", subscribersController.edit);
app.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
app.delete("/subscribers/:id", subscribersController.delete, subscribersController.redirectView); // Changed this line
app.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
app.get("/subscribers", subscribersController.index, subscribersController.indexView);

// Error handling
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
