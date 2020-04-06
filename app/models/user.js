var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable


// User Mongoose Schema
var UserSchema = new Schema({
    email: { type: String, lowercase: true, required: true, unique: true},
    password: { type: String, required: true},
    
});

module.exports = mongoose.model('User', UserSchema)