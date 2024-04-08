import {PostDBType} from "./post-types-db";
import {BlogDBType} from "./blog-types-db";

export type DBType = {
    posts: PostDBType[],
    blogs: BlogDBType[]
}