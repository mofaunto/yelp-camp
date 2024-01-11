const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require('../controllers/campgrounds')

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(validateCampground, isLoggedIn, catchAsync(campgrounds.createCampground));

//Check whether the user is logged in to perform the action
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(validateCampground, isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
