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

var UsersSchema = new mongoose.Schema ({
	name: String,
	password: String,
	email: String,
	address: String,
	phone: Number,
	verified: Boolean,
	updated_at: { type: Date, default: Date.now },
});

// Exports the new Mongoose model to the application
module.exports = mongoose.model('Users', UsersSchema);