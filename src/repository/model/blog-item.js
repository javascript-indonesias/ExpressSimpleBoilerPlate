import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// blog schema
const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            default: '',
        },
        snippets: {
            type: String,
            required: true,
            default: '',
        },
        body: {
            type: String,
            required: true,
            default: '',
        },
    },
    { timestamps: true },
);

const Blog = model('BlogItem', blogSchema);
export default Blog;
