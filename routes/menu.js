// SAME AS INDEX.JS
var express = require('express');
var router = express.Router();
// REQUIRE MONGOOSE FOR MONGO FUNCTIONS
var mongoose = require('mongoose');
// REQUIRE THE USER DATA MODEL, AS FOUND UNDER MODELS
var Menu = require('../models/Food.js');

/* GET ALL USERS */
router.get('/', function (req, res, next) {
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	/* ATTEMPTS TO RETURN A LIST OF ALL USERS */
	Menu.find (function (err, data) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* RETURNS RESULT IN JSON */
		res.json(data);
	});
});

/* CREATE NEW MENU ITEM */
router.post('/', function (req, res, next) {
	/* ATTEMPTS TO CREATE A NEW USER */
	Menu.create (req.body, function (err, data) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* RETURNS NEW USER ID*/
		res.json(data._id);
	});
});

/* GET MENU ITEM BY ID */
router.get('/:id', function (req, res, next) {
	/* ATTEMPTS TO FIND USER GIVEN AN ID */
	Menu.findById(req.params.id, function (err, post) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* RETURNS RESULT IN JSON */
		res.json(post);
	});
});

/* UPDATE MENU ITEM BY ID */
router.put('/:id', function(req, res, next) {
	/* ATTEMPTS TO FIND AND UPDATE USER GIVEN AN ID */
	Menu.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
		/* CHEKCS FOR ERRORS */
		if (err) return next(err);
		/* RETURNS RESULT IN JSON */
		res.json(data);
	});
});

/* DELETE MENU ITEM BY ID */
router.delete('/:id', function(req, res, next) {
	/* ATTEMPTS TO FIND AND REMOVE USER GIVEN AN ID */
	Menu.findByIdAndRemove(req.params.id, req.body, function (err, data) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* OTHERWISE, RETURNS DATA OF DELETED USER */
		res.json(data);
	});
});

module.exports = router;