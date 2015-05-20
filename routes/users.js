// SAME AS INDEX.JS
var express = require('express');
var router = express.Router();
// REQUIRE MONGOOSE FOR MONGO FUNCTIONS
var mongoose = require('mongoose');
// REQUIRE THE USER DATA MODEL, AS FOUND UNDER MODELS
var Users = require('../models/Users.js');

/* GET ALL USERS */
router.get('/', function (req, res, next) {
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	/* ATTEMPTS TO RETURN A LIST OF ALL USERS */
	Users.find (function (err, data) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* RETURNS RESULT IN JSON */
		res.json(data);
	});
});

/* CREATE NEW USER */
router.post('/', function (req, res, next) {
	/* ATTEMPTS TO CREATE A NEW USER */
	Users.create (req.body, function (err, data) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* RETURNS NEW USER ID*/
		res.json(data._id);
	});
});

/* GET USER BY ID */
router.get('/:id', function (req, res, next) {
	/* ATTEMPTS TO FIND USER GIVEN AN ID */
	Users.findById(req.params.id, function (err, post) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* RETURNS RESULT IN JSON */
		res.json(post);
	});
});

/* UPDATE USER BY ID */
router.put('/:id', function(req, res, next) {
	/* ATTEMPTS TO FIND AND UPDATE USER GIVEN AN ID */
	Users.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
		/* CHEKCS FOR ERRORS */
		if (err) return next(err);
		/* RETURNS RESULT IN JSON */
		res.json(data);
	});
});

/* DELETE USER BY ID */
router.delete('/:id', function(req, res, next) {
	/* ATTEMPTS TO FIND AND REMOVE USER GIVEN AN ID */
	Users.findByIdAndRemove(req.params.id, req.body, function (err, data) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* OTHERWISE, RETURNS DATA OF DELETED USER */
		res.json(data);
	});
});

/* VERIFY USERNAME AND PASSWORD, RETURNS ID???*/
router.get('/login/:email/:pass', function(req, res, next) {
	/* ATTEMPTS TO FIND USER ID GIVEN EMAIL AND PASSWORD */
	Users.find ({ 'email' : req.params.email, 'password' : req.params.pass }, function (err, data) {
		/* CHECKS FOR ERRORS */
		if (err) return next(err);
		/* IF INCORRECT CREDENTIALS, RETURN -1 */
		if (data.length === 0) res.json(-1);
		/* IF CORRECT CREDENTIALS, RETURN USER ID */
		else {
			var id = data[0]._id;
			res.json(id);
		}
	})
});

module.exports = router;