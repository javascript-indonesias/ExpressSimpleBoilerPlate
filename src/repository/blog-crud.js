// Fungsi crud ke database
import logger from 'loglevel';
import Blog from './model/blog-item';

function getAllBlogs() {
    // Ambil semua daftar blog
    const objectResult = { data: [] };

    Blog.find()
        .exec()
        .then((result) => {
            objectResult.data = result;
            return Promise.resolve(objectResult);
        })
        .catch((error) => {
            logger.warn(error);
            return Promise.reject(new Error(error));
        });
}

function addBlogs(title, snippets, body) {
    // Contoh insert data ke mongodb
    const blog = new Blog({
        title,
        snippets,
        body,
    });

    blog.save()
        .then((result) => {
            return Promise.resolve(result);
        })
        .catch((error) => {
            logger.warn(error);
            return Promise.reject(new Error(error));
        });
}

export { getAllBlogs, addBlogs };
