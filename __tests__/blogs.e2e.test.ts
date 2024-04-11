import {req} from "./test-helpers";
import {HTTP_STATUSES} from "../src/settings";
import {SETTINGS} from "../src/settings";
import {describe} from "node:test";
import {connectToDB} from "../src/db/mongo-db";
import {BlogOutputType} from "../src/types/output-blog-type";


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
        }
        const resCreated = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '').send(blog).expect(HTTP_STATUSES.CREATED_201)

        const res = await req.get(`${SETTINGS.PATH.BLOGS}/${String(resCreated.body.id)}`).expect(HTTP_STATUSES.OK_200)
        // // console.log(res.body.id)
        expect(String(resCreated.body.id)).toEqual(res.body.id);
    });

    it('shouldn\'t created blog? because not found authorization header', async () => {
        const blog = {
            name: 'test',
            websiteUrl: 'https://it-incubator.com',
            description: 'valid description',
        }
        const resCreated = await req.post(SETTINGS.PATH.BLOGS).send(blog).expect(HTTP_STATUSES.UNAUTHORIZED)
    });
})