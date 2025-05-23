"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");

const MongoDB = require("mongodb").MongoClient;
const dbURL = "mongodb://0.0.0.0:27017";
const dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => { //Database Server Connection
  if (error) throw error;

  //recipe_db
  let db = client.db(dbName); //insert a document into our collection
  db.collection("contacts2").insertMany({
    name: "Jada Mathele",
    email: "jada@mathele.com",
    phone: "123-456-7890",
    address: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zip: "62704"
    }
  }, {
    name: "John Doe",
    email: ""
  }, (error, db) => {
    if (error) throw error;
    console.log(db);
  });

  //find contacts 
  //print them to console as an array
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
