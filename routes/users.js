
const auth =  require('../middleware/auth');
const _ = require('lodash');
const {User, validate} = require('../modules/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
var router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('user already registered.')

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

   try {
       await user.save();

       // setting response Header
       const token = user.generateAuthToken();
       res.header('x-auth-token', token).send(_.pick(user, ["_id", "name", "email"]));
   }
   catch(e) {
       console.log(e.message);
   }
});

module.exports = router;