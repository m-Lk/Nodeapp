
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const Rental = mongoose.model('Rentals', new mongoose.Schema({
  customer: {
      type: new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        phone: {
            type: String,
            minlength: 10
        },
        isGold: {
            type: Boolean,
            required: true
        }
      }),
      required: true
  },
  movie: {
      type: new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        dailyRentalRate: {
            type: Number,
            required: true,
            minlength: 0,
            maxlength: 255
        }
      }),
      required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
      type: Number,
      min: 0
  }
}));

var validateRental = function (rental) {
  const schema = {
      customerId: Joi.objectId().required(),
      movieId: Joi.objectId().required()
  };
  return result = Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;

