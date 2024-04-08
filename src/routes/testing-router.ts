import {Router, Request, Response} from "express";
import {db} from "../db/db";
import {HTTP_STATUSES} from "../settings";

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    db.posts = []
    db.blogs = []
    res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
})