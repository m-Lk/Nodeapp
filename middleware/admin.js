
const jwt = require('jsonwebtoken');
const config =  require('config');

function admin (req, res, next) {
    try {
        const isAdmin = req.user.isAdmin;
        if(!isAdmin) return res.status(403).send('Access denided.');
        next();
    }
    catch(ex) {
        res.status(400).send('Error occured  in file admin.js: Invalid token.');
    }
}

module.exports = admin;