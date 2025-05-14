"use strict";

const router = require("express").Router();
const BlogPost = require("../models/BlogPost");
const newPostController = require("../controllers/newPost");
const storePostController = require("../controllers/storePost");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/new", authMiddleware, newPostController);
router.post("/store", authMiddleware, storePostController);
router.get("/:id", async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render("post", {
        blogpost: blogpost
    });
});

module.exports = router;