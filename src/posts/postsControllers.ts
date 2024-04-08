import {Request, Response} from 'express'

import {HTTP_STATUSES} from "../settings";
import {PostDBType} from "../db/post-types-db";
import {postsRepositories} from "./postsRepositories";
import {BodyTypePost, ParamType} from "../types/request-response-type";

export const postsControllers = {
    createPost: (req: Request, res: Response) => {
        const inputDataPost = req.body as BodyTypePost;
        const newPosts = postsRepositories.createPost(inputDataPost);
        if (!newPosts) {
            res.status(HTTP_STATUSES.BED_REQUEST_400).send({})
            return
        }
        res.status(HTTP_STATUSES.CREATED_201).send(newPosts)
        return;
    },
    getPost: (req: Request, res: Response) => {
        const {id} = req.params as ParamType;
        const findPost = postsRepositories.findPostById(id)
        if (findPost !== undefined) {
            res.status(HTTP_STATUSES.OK_200).send(findPost)
            return
        }
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
        return
    },
    getPosts: (req: Request, res: Response) => {
        const findPosts: PostDBType[] = postsRepositories.findAllPosts();
        res.status(HTTP_STATUSES.OK_200).send(findPosts)
    },
    updatePost: (req: Request, res: Response) => {
        const {id} = req.params as ParamType;
        const updateDataPost = req.body as BodyTypePost;
        const flag = postsRepositories.updatePost(id, updateDataPost)
        if (flag) {
            res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
            return
        }
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
        return;
    },
    deletePost: (req: Request, res: Response) => {
        const {id} = req.params as ParamType;
        const flag = postsRepositories.deletePost(id);
        if (flag) {
            res.status(HTTP_STATUSES.NO_CONTENT_204).send({});
            return;
        }
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
    },
}

