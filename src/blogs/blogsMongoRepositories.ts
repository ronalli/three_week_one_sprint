import {BlogDBType} from "../db/blog-types-db";
import {BodyTypeBlog} from "../types/request-response-type";
import {blogCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";
import {blogsControllers} from "./blogsControllers";
import e from "express";

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

        try {
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
            } else {
                return false;
            }
        } catch (e) {
            console.log(e)
            return {error: e};
        }
    },
    deleteBlog: async (id: string) => {
        try {
            const flag = await blogCollection.findOne({_id: new ObjectId(id)});
            if (!flag) {
                return false;
            } else {
                await blogCollection.findOneAndDelete({_id: new ObjectId(id)});
                return true;
            }
        } catch (e) {
            return {error: e};
        }
    }
}