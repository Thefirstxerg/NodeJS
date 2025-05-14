"use strict";

const User = require("../models/User");
const passport = require("passport");

module.exports = {
  getRegister: (req, res) => {
    res.render("register");
  },

  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      req.flash("success", "User registered successfully!");
      res.redirect("/users/login");
    } catch (error) {
      console.error(error);
      req.flash("error", "Error registering user");
      res.redirect("/users/register");
    }
  },

  getLogin: (req, res) => {
    res.render("login");
  },

  login: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in successfully!"
  }),

  logout: (req, res) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.redirect("/");
  }
};