import express from 'express';
import bodyParser from 'body-parser';

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

function getListBlogs(req, res) {
    //
}

function createNewBlogs(req, res) {
    //
}

function getBlogRoutes() {
    const router = express.Router();
    router.get('/blog-list', jsonParser, getListBlogs);
    router.post('/create-blog', urlencodedParser, createNewBlogs);
}

export default getBlogRoutes;
