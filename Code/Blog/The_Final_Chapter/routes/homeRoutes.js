"use strict";

const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/about", homeController.about);
router.get("/contact", homeController.contact);
router.get("/samplepost", homeController.samplePost);

module.exports = router;