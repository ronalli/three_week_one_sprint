import {BodyTypePost} from "../types/request-response-type";
import {PostDBType} from "../db/post-types-db";

import {postCollection} from "../db/mongo-db";
import {blogsMongoRepositories} from "../blogs/blogsMongoRepositories";
import {ObjectId} from "mongodb";

export const postsMongoRepositories = {
    findPostById: async (id: string) => {
        try {
            return await postCollection.findOne({_id: new ObjectId(id)});
        } catch (e) {
            console.log(e)
            return;
        }
    },
    findAllPosts: async () => {
        try {
            return postCollection.find({}).toArray()
        } catch (e) {
            console.log(e)
            return {error: e};
        }

    },
    createPost: async (post: BodyTypePost) => {
        const findBlog = await blogsMongoRepositories.findBlogById(post.blogId);
        let newPost: PostDBType;
        if(findBlog) {
            newPost = {
                ...post,
                blogName: findBlog.name,
                createdAt: new Date().toISOString(),
            }
            try {
                await postCollection.insertOne(newPost);
                return newPost;
            } catch (e) {
                console.log(e)
                return;
            }
        }
        return false;
    },
    updatePost: async (id: string, updatePost: BodyTypePost) => {
        try {
            const findPost = await postCollection.findOne({_id: new ObjectId(id)});

            if(findPost) {
                await postCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: {
                        title: updatePost.title,
                        content: updatePost.content,
                        shortDescription: updatePost.shortDescription,
                        blogId: updatePost.blogId
                    }})
                return true;
            }
            return false;
        } catch (e) {
            console.log(e)
            return;
        }

    },
    deletePost: async (id: string) => {
        const findDeletePost = await postCollection.findOne({_id: new ObjectId(id)});
        if(findDeletePost) {
            await postCollection.findOneAndDelete({_id: new ObjectId(id)});
            return true;
        }
        return false;
    },
}