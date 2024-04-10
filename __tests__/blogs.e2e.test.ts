import {req} from "./test-helpers";
import {HTTP_STATUSES} from "../src/settings";
import {SETTINGS} from "../src/settings";
import {describe} from "node:test";
import {blogCollection, connectToDB} from "../src/db/mongo-db";


describe('/blogs', () => {
    beforeAll(async () => {
        await req.delete(SETTINGS.PATH.ALL_DELETE + '/all-data')
        await connectToDB()
    })
    it('should created blog', async () => {
        const blog = {
            name: 'test',
            websiteUrl: 'https://it-incubator.com',
            description: 'valid description',
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const insertedBlog = await blogCollection.insertOne(blog)

        const res = await req.get(`${SETTINGS.PATH.BLOGS}/${String(insertedBlog.insertedId)}`).expect(HTTP_STATUSES.OK_200)

        // console.log(res.body.id)
        expect(String(insertedBlog.insertedId)).toEqual(res.body.id);
    });
})