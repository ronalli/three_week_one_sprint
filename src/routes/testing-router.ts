import {Router, Request, Response} from "express";
import {HTTP_STATUSES} from "../settings";
import {blogCollection, postCollection} from "../db/mongo-db";

export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    try {
        await postCollection.deleteMany({});
        await blogCollection.deleteMany({})
        res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
    } catch (e) {
        console.log(e)
        return;
    }

})