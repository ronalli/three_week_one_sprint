import {ObjectId} from "mongodb";

export type PostDBType = {
    _id?: ObjectId
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
}