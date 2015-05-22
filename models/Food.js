// Making Data models for Mongo requires mongoose
var mongoose = require('mongoose');

/* 
	Schema's create a template of sorts
	that specifies what a model should
	contain.  Since NoSQL has variable types
	almost anything COULD be stored as a user
	but this is the design we will follow
	for now
*/

var FoodSchema = new mongoose.Schema ({
	name: String,
	description: String,
	price: Number,
	updated_at: { type: Date, default: Date.now },
});

// Exports a new Mongoose model of the 
// defined schema to the application
module.exports = mongoose.model('Menu', FoodSchema);