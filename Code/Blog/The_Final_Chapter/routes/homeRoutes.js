"use strict";

const router = require("express").Router();
const BlogPost = require("../models/BlogPost");

router.get("/", async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render("index", {
        blogposts: blogposts
    });
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/samplepost", (req, res) => {
    res.render("samplepost");
});

module.exports = router;