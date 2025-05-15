"use strict";

const User = require("../models/User");
const passport = require("passport");
const BlogPost = require("../models/BlogPost");

module.exports = {
  getRegister: (req, res) => {
    res.render("register", {
      errors: [],
      username: "",
      password: ""
    });
  },

  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      req.flash("success", "User registered successfully!");
      res.redirect("/users/login");
    } catch (error) {
      console.error(error);
      res.render("register", {
        errors: [error.message],
        username: req.body.username || "",
        password: req.body.password || ""
      });
    }
  },

  getLogin: (req, res) => {
    res.render("login");
  },

  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('error', info.message || 'Failed to login.');
        return res.redirect('/users/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.session.userId = user._id;
        req.flash('success', 'Logged in successfully!');
        return res.redirect('/');
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.session.userId = null;
    req.logout((err) => {
      if (err) {
        console.error(err);
      }
      req.flash("success", "You have been logged out!");
      res.redirect("/");
    });
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.render('notfound');
      }
      const posts = await BlogPost.find({ userid: user._id }).sort({ datePosted: -1 });
      res.render('profile', {
        user,
        posts
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.render('notfound');
    }
  }
};