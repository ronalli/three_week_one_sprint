import {BodyTypePost} from "../types/request-response-type";
import {PostDBType} from "../db/post-types-db";

import {postCollection} from "../db/mongo-db";
import {blogsMongoRepositories} from "../blogs/blogsMongoRepositories";
import {ObjectId} from "mongodb";
import {formatingDataForOutputPost} from "../utils/fromatingData";

export const postsMongoRepositories = {
    findPostById: async (id: string) => {
        try {
            const foundPost = await postCollection.findOne({_id: new ObjectId(id)});
            if (foundPost) {
                return formatingDataForOutputPost(foundPost);
            }
            return;
        } catch (e) {
            return;
        }
    },
    findAllPosts: async () => {
        try {
            const foundPosts = await postCollection.find({}).toArray();
            if (foundPosts.length > 0) {
                return foundPosts.map(post => {
                    return formatingDataForOutputPost(post)
                });
            }
            return;
        } catch (e) {
            return;
        }

    },
    createPost: async (post: BodyTypePost) => {
        const findBlog = await blogsMongoRepositories.findBlogById(post.blogId);
        let newPost: PostDBType;
        if (findBlog) {
            newPost = {
                ...post,
                blogName: findBlog.name,
                createdAt: new Date().toISOString(),
            }
            try {
                const insertedPost = await postCollection.insertOne(newPost);
                const foundPost = await postCollection.findOne({_id: insertedPost.insertedId});
                if (foundPost) {
                    return formatingDataForOutputPost(foundPost);
                }
                return;
            } catch (e) {
                return;
            }
        }
        return false;
    },
    updatePost: async (id: string, updatePost: BodyTypePost) => {
        try {
            const findPost = await postCollection.findOne({_id: new ObjectId(id)});
            if (findPost) {
                await postCollection.findOneAndUpdate({_id: new ObjectId(id)}, {
                    $set: {
                        title: updatePost.title,
                        content: updatePost.content,
                        shortDescription: updatePost.shortDescription,
                        blogId: updatePost.blogId
                    }
                })
                return true;
            }
            return false;
        } catch (e) {
            return;
        }

    },
    deletePost: async (id: string) => {
        const findDeletePost = await postCollection.findOne({_id: new ObjectId(id)});
        if (findDeletePost) {
            await postCollection.findOneAndDelete({_id: new ObjectId(id)});
            return true;
        }
        return false;
    },
}