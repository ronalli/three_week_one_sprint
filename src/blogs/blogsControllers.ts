import {Request, Response} from "express";

import {HTTP_STATUSES} from "../settings";
// import {blogsRepositories} from "./blogsRepositories";
import {BlogDBType} from "../db/blog-types-db";
import {BodyTypeBlog, ParamType} from "../types/request-response-type";
import {blogsMongoRepositories} from "./blogsMongoRepositories";

export const blogsControllers = {
    createBlog: async (req: Request, res: Response) => {
        const inputDataBlog = req.body as BodyTypeBlog
        const id = await blogsMongoRepositories.createBlog(inputDataBlog);
        res.status(HTTP_STATUSES.CREATED_201).send({})
        // if(id) {
        //     const blog = await blogsRepositories.findBlogById(id);
        //     res.status(HTTP_STATUSES.CREATED_201).send(blog)
        //     return
        // }
        // res.status(HTTP_STATUSES.BED_REQUEST_400).send({})
    },
    // getBlog: async (req: Request, res: Response) => {
    //     const {id}= req.params as ParamType;
    //     const blog = await blogsRepositories.findBlogById(id);
    //     if(blog) {
    //         res.status(HTTP_STATUSES.OK_200).send(blog)
    //         return
    //     }
    //     res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
    // },
    getBlogs: async (req: Request, res: Response) => {
        const findBlogs = await blogsMongoRepositories.findAllBlogs();
        res.status(HTTP_STATUSES.OK_200).send(findBlogs)
        return
    },
    // updateBlog: async (req: Request, res: Response) => {
    //     const {id} = req.params;
    //     const inputUpdateDataBlog = req.body as BodyTypeBlog;
    //     const flag = await blogsRepositories.updateBlog(id, inputUpdateDataBlog)
    //     if(flag) {
    //         res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
    //         return
    //     }
    //     res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
    //     return;
    // },
    // deleteBlog: async (req: Request, res: Response) => {
    //     const {id} = req.params;
    //     const flag = await blogsRepositories.deleteBlog(id);
    //     if(flag) {
    //         res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
    //         return
    //     }
    //     res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
    //     return
    // },
}