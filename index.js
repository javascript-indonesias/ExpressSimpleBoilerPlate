/* eslint-disable import/no-unresolved */
const nodemon = require('nodemon');
const dist = require('./dist');

if (process.env.NODE_ENV === 'production') {
    dist();
} else {
    // require('nodemon')({ script: 'dev.js' });
    nodemon({ script: 'dev.js' });
}
