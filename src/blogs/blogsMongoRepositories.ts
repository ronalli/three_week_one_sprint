import {BlogDBType} from "../db/blog-types-db";
import {BodyTypeBlog} from "../types/request-response-type";
import {blogCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const blogsMongoRepositories = {
    createBlog: async (blog: BodyTypeBlog) => {
        const newBlog = {
            ...blog,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        try {
            const insertedBlog = await blogCollection.insertOne(newBlog);
            console.log(insertedBlog)
            return {id: new ObjectId(insertedBlog.insertedId)}
        } catch (e) {
            console.log(e)
            return {error: e};
        }
    },
    findBlogById: async (id: string) => {
        try {
            return await blogCollection.findOne({_id: new ObjectId(id)})
        } catch (e) {
            console.log(e)
            return {error: e};
        }

    },
    findAllBlogs: async () => {
        try {
            return await blogCollection.find().toArray();
        } catch (e) {
            return {error: e};
        }
    },
    updateBlog: async (id: string, inputUpdateDataBlog: BodyTypeBlog) => {
        const {name, websiteUrl, description} = inputUpdateDataBlog
        const findBlog = await blogCollection.findOne({_id: new ObjectId(id)});
        if (findBlog) {
            const success = await blogCollection.findOneAndUpdate({_id: new ObjectId(id)}, {
                $set: {
                    name,
                    description,
                    websiteUrl
                }
            });
            return true;
        }
        return false;
    },
    // deleteBlog: async (id: string) => {
    //     const flag = db.blogs.find(b => b.id === id)
    //     if (!flag) {
    //         return false;
    //     } else {
    //         db.blogs = db.blogs.filter(b => b.id !== id);
    //         return true;
    //     }
    // }
}