
const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

var validateGenre = function (genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return result = Joi.validate(genre, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;