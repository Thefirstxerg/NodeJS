"use strict";

const BlogPost = require("../models/BlogPost");

module.exports = {
  index: async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');
    res.render("index", {
      blogposts: blogposts
    });
  },

  about: (req, res) => {
    res.render("about");
  },

  contact: (req, res) => {
    res.render("contact");
  },

  samplePost: (req, res) => {
    res.render("samplepost");
  }
};