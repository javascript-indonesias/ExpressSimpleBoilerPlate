// Memperbolehkan API diakses pada origin tertentu
// Pada front end yang memakai REST API Fetch atau Axios
// https://flaviocopes.com/express-cors/
// http://expressjs.com/en/resources/middleware/cors.html
// https://medium.com/hackernoon/the-definitive-guide-to-express-the-node-js-web-application-framework-649352e2ae87
import cors from 'cors';

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

const corsRequest = cors(corsOptions);
const corsAllRequest = cors();

export { corsRequest, corsAllRequest };
