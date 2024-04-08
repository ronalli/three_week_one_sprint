// import {Request, Response} from 'express'
//
// import {HTTP_STATUSES} from "../settings";
// import {PostDBType} from "../db/post-types-db";
// import {postsRepositories} from "./postsRepositories";
// import {BodyTypePost, ParamType} from "../types/request-response-type";
//
// export const postsControllers = {
//     createPost: async (req: Request, res: Response) => {
//         const inputDataPost = req.body as BodyTypePost;
//         const newPosts = await postsRepositories.createPost(inputDataPost);
//         if (!newPosts) {
//             res.status(HTTP_STATUSES.BED_REQUEST_400).send({})
//             return
//         }
//         res.status(HTTP_STATUSES.CREATED_201).send(newPosts)
//         return;
//     },
//     getPost: async (req: Request, res: Response) => {
//         const {id} = req.params as ParamType;
//         const findPost = postsRepositories.findPostById(id)
//         if (findPost !== undefined) {
//             res.status(HTTP_STATUSES.OK_200).send(findPost)
//             return
//         }
//         res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
//         return
//     },
//     getPosts: async (req: Request, res: Response) => {
//         const findPosts: PostDBType[] = await postsRepositories.findAllPosts();
//         res.status(HTTP_STATUSES.OK_200).send(findPosts)
//     },
//     updatePost: async (req: Request, res: Response) => {
//         const {id} = req.params as ParamType;
//         const updateDataPost = req.body as BodyTypePost;
//         const flag = await postsRepositories.updatePost(id, updateDataPost)
//         if (flag) {
//             res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
//             return
//         }
//         res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
//         return;
//     },
//     deletePost: async (req: Request, res: Response) => {
//         const {id} = req.params as ParamType;
//         const flag = await postsRepositories.deletePost(id);
//         if (flag) {
//             res.status(HTTP_STATUSES.NO_CONTENT_204).send({});
//             return;
//         }
//         res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
//     },
// }
//
