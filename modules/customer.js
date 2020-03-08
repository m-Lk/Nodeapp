
const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema ({
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
});

const Customer = mongoose.model('Customer', customerSchema);

var validateCustomer = function (customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10),
        isGold: Joi.boolean()
    };
    return result = Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;


