import {v4 as uuid} from 'uuid'

import {db} from "../db/db";
import {BodyTypePost} from "../types/request-response-type";
import {PostDBType} from "../db/post-types-db";
import {blogsRepositories} from "../blogs/blogsRepositories";

export const postsRepositories = {
  findPostById: (id: string) => {
        return db.posts.find(b => b.id === id);
    },
    findAllPosts: () => {
        return db.posts;
    },
    createPost: (post: BodyTypePost) => {
        const findBlog = blogsRepositories.findBlogById(post.blogId);
        let newPost: PostDBType;
        if(findBlog) {
           newPost = {
                ...post,
                id: uuid(),
                blogName: findBlog.name
            }
            db.posts = [...db.posts, newPost];
           return newPost;
        }
        return false;
    },
    updatePost: (id: string, updatePost: BodyTypePost) => {
        const findPost = db.posts.find(p => p.id === id);
        if(findPost) {
            findPost.title = updatePost.title
            findPost.content = updatePost.content
            findPost.shortDescription = updatePost.shortDescription
            findPost.blogId = updatePost.blogId
            return true;
        }
        return false;
    },
    deletePost: (id: string) => {
        const findDeletePost = db.posts.find(p => p.id === id);
        if(findDeletePost) {
            db.posts = db.posts.filter(p => p.id !== id);
            return true;
        }
        return false;
    },
}