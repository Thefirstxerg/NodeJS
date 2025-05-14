"use strict";

const router = require("express").Router();

// This route catches any unmatched routes and renders the notfound page
router.use((req, res) => res.render("notfound"));

module.exports = router;