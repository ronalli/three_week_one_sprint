// import {v4 as uuid} from 'uuid'
//
// import {db} from "../db/db";
import {BodyTypePost} from "../types/request-response-type";
import {PostDBType} from "../db/post-types-db";
// import {blogsRepositories} from "../blogs/blogsRepositories";
//
import {postCollection} from "../db/mongo-db";
import {blogsMongoRepositories} from "../blogs/blogsMongoRepositories";

export const postsMongoRepositories = {
    // findPostById: async (id: string) => {
    //     return db.posts.find(b => b.id === id);
    // },
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
    // updatePost: async (id: string, updatePost: BodyTypePost) => {
    //     const findPost = db.posts.find(p => p.id === id);
    //     if(findPost) {
    //         findPost.title = updatePost.title
    //         findPost.content = updatePost.content
    //         findPost.shortDescription = updatePost.shortDescription
    //         findPost.blogId = updatePost.blogId
    //         return true;
    //     }
    //     return false;
    // },
    // deletePost: async (id: string) => {
    //     const findDeletePost = db.posts.find(p => p.id === id);
    //     if(findDeletePost) {
    //         db.posts = db.posts.filter(p => p.id !== id);
    //         return true;
    //     }
    //     return false;
    // },
}