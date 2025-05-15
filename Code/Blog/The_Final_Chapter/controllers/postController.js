"use strict";

const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = {
  new: (req, res) => {
    res.render("create", {
      userId: req.session.userId
    });
  },

  store: async (req, res) => {
    try {
      let imagePath = '';
      if (req.files && req.files.image) {
        let image = req.files.image;
        await image.mv(path.resolve(__dirname, "../public/img", image.name));
        imagePath = '/img/' + image.name;
      }
      await BlogPost.create({
        ...req.body,
        image: imagePath,
        userid: req.session.userId
      });
      req.flash('success', 'Post created successfully!');
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getPost: async (req, res) => {
    try {
      const blogpost = await BlogPost.findById(req.params.id).populate('userid');
      if (!blogpost) {
        return res.render('notfound');
      }
      res.render("post", {
        blogpost
      });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.render('notfound');
    }
  }
};