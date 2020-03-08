
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require('lodash');
const {User} = require('../modules/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
var router = express.Router();

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

   const token = user.generateAuthToken();
   res.send(token);
});

var validate = function (user) {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    };
    return result = Joi.validate(user, schema);
}

module.exports = router;