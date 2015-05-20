// REQUIRE EXPRESS FOR ALL API ROUTING PAGES
var express = require('express');
// SETS ROUTER FOR GIVEN LOCATION
var router = express.Router();

/* 
	BASICALLY RENDERS THE 
	HOMEPAGE WHEN CALLED
	JUST USED AS AN EXAMPLE
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 
	MODULE IS A GLOBAL SCOPE VARIABLE
	ESSENTIALLY REFERING TO THE APP AS 
	A WHOLE.  THIS JUST EXPORTS THIS 
	PARTICULAR ROUTER TO THE APPLICATION
*/ 

module.exports = router;
