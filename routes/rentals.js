
const mongoose = require('mongoose');
const { Movie } = require('../modules/movie');
const { Customer } = require('../modules/customer');
const { Rental, validate } = require('../modules/rental');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock === 0){
        return res.status(400).send('Movie not in stock.');
    }

   let rental = new Rental({
       customer: {
           _id: customer._id,
           name: customer.name,
           phone: customer.phone,
           isGold: customer.isGold
       },
       movie: {
           _id: movie._id,
           title: movie.title,
           dailyRentalRate: movie.dailyRentalRate
       }
   });

   try {
       rental = await rental.save();

       movie.numberInStock--;
       movie.save();

       res.send(rental);
   }
   catch(e) {
       console.log(e.message);
   }
});

module.exports = router;
