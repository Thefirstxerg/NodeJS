"use strict";

const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/new", authMiddleware, postController.new);
router.post("/store", authMiddleware, postController.store);
router.get("/:id", postController.getPost);

module.exports = router;