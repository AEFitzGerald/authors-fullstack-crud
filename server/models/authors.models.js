const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    authorFullName: { 
        type: String, 
        required: [true, "Name is required"], 
        minlength: [2, "Author name must be at least 2 characters long"]
    }
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;