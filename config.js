// Environment variable untuk development
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    endpoint: process.env.API_URL,
    masterKey: process.env.API_KEY,
    port: process.env.PORT,
    version: process.env.VERSIONAPP,
    mongouri: process.env.MONGODBURI,
    mode: process.env.NODE_ENV,
};
