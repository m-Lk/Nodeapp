
const winston = require('winston');
const express = require('express');
const app = express();

require('./startups/logging')();
require('./startups/routes')(app);
require('./startups/db')();
require('./startups/config')();
require('./startups/validation')();

//const app = express();

app.get('/',(req, res) => {
    res.send('Hello world');
});

app.listen(3000, () => winston.info('Listening on port 3000'));