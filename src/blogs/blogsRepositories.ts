// import {db} from "../db/db";
// import {v4 as uuid} from 'uuid'
// import {BlogDBType} from "../db/blog-types-db";
// import {BodyTypeBlog} from "../types/request-response-type";
//
// export const blogsRepositories = {
//     createBlog: async (blog: BodyTypeBlog) => {
//         const newBlog: BlogDBType = {
//             ...blog,
//             id: uuid(),
//             createdAt: new Date().toISOString(),
//             isMembership: false
//         }
//         db.blogs = [...db.blogs, newBlog];
//         return newBlog.id;
//     },
//     findBlogById: async (id: string) => {
//         return db.blogs.find(b => b.id === id) || false;
//     },
//     findAllBlogs: async () => {
//         return db.blogs
//     },
//     updateBlog: async (id: string, inputUpdateDataBlog: BodyTypeBlog) => {
//         const {name, websiteUrl, description} = inputUpdateDataBlog
//
//         const findBlog = db.blogs.find(b => b.id === id);
//         if (findBlog) {
//             findBlog.name = name;
//             findBlog.websiteUrl = websiteUrl;
//             findBlog.description = description;
//             return true;
//         }
//         return false;
//     },
//     deleteBlog: async (id: string) => {
//
//         const flag = db.blogs.find(b => b.id === id)
//         if (!flag) {
//             return false;
//         }
//         db.blogs = db.blogs.filter(b => b.id !== id);
//         return true;
//     },
// }