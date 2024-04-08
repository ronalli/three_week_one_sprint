import {Collection, Db, MongoClient} from 'mongodb'
import {SETTINGS} from "../settings";
import {BlogDBType} from "./blog-types-db";
import {PostDBType} from "./post-types-db";


const client = new MongoClient(SETTINGS.MONGO_URL);
export const db: Db = client.db(SETTINGS.DB_NAME);

export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.BLOG_COLLECTION_NAME);
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.POSTS_COLLECTION_NAME);

export const connectToDB = async () => {
    try {
        await client.connect();
        console.log('connected to DB');
        return true;
    } catch (e) {
        console.log(e)
        await client.close();
        return false;
    }
}