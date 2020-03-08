
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
        .then(() => winston.info("connected successfully to MongoDB..."));
}