
const asyncMiddelware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../modules/genre');
const mongoose = require('mongoose');
const express = require('express');
var router = express.Router();

/*
    route handler function: 
    1st arg is route,
    2nd arg optional, middleware function,
    3rd arg actual route handler
*/

router.get('/', asyncMiddelware(async (req, res) => {
    //throw new Error('something went terribly wrong');
    const genres = await Genre.find().sort('name');
    res.send(genres);
}));

router.post('/', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

   let gen = new Genre({
       name: req.body.name
   });

   try {
       gen = await gen.save();
       res.send(gen);
   }
   catch(e) {
       console.log(e.message);
   }
});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const gen = await Genre.findByIdAndUpdate(req.params.id, 
        {name: req.body.name}, 
        { new: true});

    if(!gen) return res.status(400).send('Requesting genre not present');

    res.send(gen);
});

router.get('/:id', async (req, res) => {

    const gen = await Genre.findById(req.params.id);

    if(!gen) return res.status(400).send('Requesting genre not present');
    res.status(200).send(gen);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const gen = await Genre.findByIdAndRemove(req.params.id);

    if(!gen) return res.status(400).send('Requesting genre not present');

    res.status(200).send(gen);
});

module.exports = router;