import express from 'express';
import bodyParser from 'body-parser';
import {
    addBlogs,
    getAllBlogs,
    getDetailBlog,
    deleteBlog,
} from '../repository/blog-crud';

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

async function getListBlogs(_req, res) {
    try {
        const resultblog = await getAllBlogs();
        res.json({ status: true, message: 'sukses', data: resultblog });
    } catch (err) {
        res.json({
            status: false,
            message: 'Daftar blog tidak tersedia',
            data: [],
        });
    }
}

async function createNewBlogs(req, res) {
    const { body } = req;
    try {
        const result = await addBlogs(body.title, body.snippet, body.text);
        res.json({ status: true, message: 'sukses', data: result });
    } catch (err) {
        res.json({ status: false, message: 'Error memasukkan data blog' });
    }
}

async function getBlogDetail(req, res) {
    const idBlog = req.params.id;
    try {
        const result = await getDetailBlog(idBlog);
        res.json({ status: true, message: 'sukses', data: result });
    } catch (err) {
        res.json({ status: false, message: 'Error mengambil data blog' });
    }
}

async function deleteBlogById(req, res) {
    const idBlog = req.params.id;
    try {
        const result = await deleteBlog(idBlog);
        res.json({ status: true, message: 'sukses', data: result });
    } catch (err) {
        res.json({ status: false, message: 'Gagal menghapus data blog' });
    }
}

// Definisikan router di sini dari setiap controller di atas
function getBlogRoutes() {
    const router = express.Router();
    router.get('/blog-list', jsonParser, getListBlogs);
    router.post('/create-blog', urlencodedParser, createNewBlogs);
    router.get('/blogs/:id', getBlogDetail);
    router.delete('/blogs/:id', deleteBlogById);
    return router;
}

export default getBlogRoutes;
