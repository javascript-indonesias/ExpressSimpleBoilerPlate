import express from 'express';
import bodyParser from 'body-parser';

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

function getListBlogs(req, res) {
    res.send({ status: 'ok' });
}

function createNewBlogs(req, res) {
    res.send({ status: 'ok' });
}

function getBlogRoutes() {
    const router = express.Router();
    router.get('/blog-list', jsonParser, getListBlogs);
    router.post('/create-blog', urlencodedParser, createNewBlogs);
    return router;
}

export default getBlogRoutes;
