
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    // To handle errors outside of request and responce scope
    process.on('uncaughtException', (ex) => {
        //new winston.transports.Console({ prettyPrint: true, colorize: true});
        winston.error(ex.message, ex);
        process.exit(1);
    });

    // To handle errors outside of request and responce scope
    process.on('unhandledRejection', (ex) => {
        console.log('We got an unhandled rejection');
        winston.error(ex.message, ex);
        process.exit(1);
    });

    winston.add(winston.transports.File, {filename: 'logfile.log'});
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly'
        //level: 'info'
    });
}