// Fungsi crud ke database
import logger from '../utils/config-winston';
import Blog from './model/blog-item';

function getAllBlogs() {
    // Ambil semua daftar blog
    const objectResult = { data: [] };

    return Blog.find()
        .sort({ createdAt: -1 })
        .exec()
        .then((result) => {
            objectResult.data = result;
            return Promise.resolve(objectResult);
        })
        .catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
}

function addBlogs(title, snippets, body) {
    // Contoh insert data ke mongodb
    const blog = new Blog({
        title,
        snippets,
        body,
    });

    return blog
        .save()
        .then((result) => {
            return Promise.resolve(result);
        })
        .catch((error) => {
            logger.warn(error);
            return Promise.reject(new Error(error));
        });
}

function getDetailBlog(idblog) {
    // Ambil detail blog
    return Blog.findById(idblog)
        .exec()
        .then((result) => {
            return Promise.resolve(result);
        })
        .catch((error) => {
            logger.warn(error);
            return Promise.reject(new Error(error));
        });
}

function deleteBlog(idblog) {
    // Hapus blog dengan ID yang telah dipilih
    return Blog.findByIdAndDelete(idblog)
        .exec()
        .then((result) => {
            return Promise.resolve(result);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export { getAllBlogs, addBlogs, getDetailBlog, deleteBlog };
