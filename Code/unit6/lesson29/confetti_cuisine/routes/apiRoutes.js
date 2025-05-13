"use strict";

const router = require("express").Router(),
  coursesController = require("../controllers/coursesController"),
  usersController = require("../controllers/usersController");

router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.use(coursesController.errorJSON);

router.get(
  "/users", 
  usersController.index, 
  usersController.respondJSON
);
router.use(usersController.errorJSON);

module.exports = router;