"use strict";

const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = {
  new: (req, res) => {
    res.render("create");
  },

  store: async (req, res) => {
    try {
      let image = req.files.image;
      await image.mv(path.resolve(__dirname, "../public/img", image.name));
      await BlogPost.create({
        ...req.body,
        image: '/img/' + image.name,
        userid: req.session.userId
      });
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getPost: async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render("post", {
      blogpost: blogpost
    });
  }
};