
const mongoose = require('mongoose');
const { Movie, validate } = require('../modules/movie');
const { Genre } = require('../modules/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

   let movie = new Movie({
       title: req.body.title,
       genre: {
           _id: genre._id,
           name: genre.name
       },
       numberInStock: req.body.numberInStock,
       dailyRentalRate: req.body.dailyRentalRate
   });

   try {
       movie = await movie.save();
       res.send(movie);
   }
   catch(e) {
       console.log(e.message);
   }
});

module.exports = router;
