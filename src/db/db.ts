import {DBType} from "./index";
import {BlogDBType} from "./blog-types-db";
import {PostDBType} from "./post-types-db";

export const db: DBType = {
    posts: [],
    blogs: []
}

export const setBlogDB = (dataset: BlogDBType[]) => {
    if(!dataset) {
        db.blogs = [];
        return;
    }
    db.blogs = dataset
}

export  const setPostDB = (dataset?: PostDBType[]) => {
    if(!dataset) {
        db.posts = [];
        return;
    }
    db.posts = dataset
}