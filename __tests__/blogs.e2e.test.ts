import {req} from "./test-helpers";
import {HTTP_STATUSES} from "../src/settings";
import {SETTINGS} from "../src/settings";
import {describe} from "node:test";
import {connectToDB} from "../src/db/mongo-db";
import {BodyTypeBlog} from "../src/types/request-response-type";


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
        const resCreated = await req.post(SETTINGS.PATH.BLOGS)
            .set('Authorization', process.env.AUTH_HEADER || '')
            .send(blog).expect(HTTP_STATUSES.CREATED_201)

        const res = await req.get(`${SETTINGS.PATH.BLOGS}/${String(resCreated.body.id)}`).expect(HTTP_STATUSES.OK_200)
        expect(String(resCreated.body.id)).toEqual(res.body.id);
    });

    it('shouldn\'t created blog, because not found authorization header', async () => {
        const blog = {
            name: 'test',
            websiteUrl: 'https://it-incubator.com',
            description: 'valid description',
        }
        const resCreated = await req.post(SETTINGS.PATH.BLOGS).send(blog).expect(HTTP_STATUSES.UNAUTHORIZED)
    });

    it('shouldn\'t created blog, because incorrect data', async () => {
        const blog = {
            name: 't',
            websiteUrl: 'https://it-incubator..com',
            description: 'valid description',
        }
        const resCreated = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '')
            .send(blog).expect(HTTP_STATUSES.BED_REQUEST_400)
    });
    it('shouldn\'t created blog, because not found correct data', async () => {
        const blog = {
            name: 't',
            websiteUrl: 'https://it-incubator..com',
        }
        const resCreated = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '')
            .send(blog).expect(HTTP_STATUSES.BED_REQUEST_400)
    });

    it('shouldn\'t created blog, because not found correct authorization header', async () => {
        const blog = {
            name: 'test valid',
            websiteUrl: 'https://it-incubator.com',
            description: 'valid description',
        }
        const resCreated = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER_FAIL || '')
            .send(blog).expect(HTTP_STATUSES.UNAUTHORIZED)
    });

    it('should created blog, and return correct data', async () => {
        const blog = {
            name: 'test valid',
            websiteUrl: 'https://it-incubator.com',
            description: 'valid description',
        }
        const resCreated = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '')
            .send(blog).expect(HTTP_STATUSES.CREATED_201)

        const res = await req.get(`${SETTINGS.PATH.BLOGS}/${String(resCreated.body.id)}`).expect(HTTP_STATUSES.OK_200);

        expect(resCreated.body).toEqual(res.body)
    });

    it('should get correct blog', async () => {
        const foundBlogs = await req.get(SETTINGS.PATH.BLOGS).expect(HTTP_STATUSES.OK_200);

        const res = await req.get(`${SETTINGS.PATH.BLOGS}/${String(foundBlogs.body[0].id)}`).expect(HTTP_STATUSES.OK_200);

        expect(foundBlogs.body[0].id).toEqual(res.body.id)
    });

    it('shouldn\'t get blog with incorrect id', async () => {
        const res = await req.get(`${SETTINGS.PATH.BLOGS}/${String(35534534534534)}`).expect(HTTP_STATUSES.NOT_FOUND_404);
    });

    it('should correct delete blog', async () => {
        const foundBlogs = await req.get(SETTINGS.PATH.BLOGS).expect(HTTP_STATUSES.OK_200);

        await req.delete(`${SETTINGS.PATH.BLOGS}/${String(foundBlogs.body[0].id)}`)
            .set('Authorization', process.env.AUTH_HEADER || '')
            .expect(HTTP_STATUSES.NO_CONTENT_204);

        const res = await req.get(`${SETTINGS.PATH.BLOGS}/${String(foundBlogs.body[0].id)}`).expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it('should correct update blog', async () => {
        const findBlogs = await req.get(SETTINGS.PATH.BLOGS);

        const updateBlogs: BodyTypeBlog = {
            name: 'test valid',
            websiteUrl: 'https://example.com',
            description: 'valid description',
        }

        await req.put(`${SETTINGS.PATH.BLOGS}/${String(findBlogs.body[0].id)}`)
            .set('Authorization', process.env.AUTH_HEADER || '')
            .send(updateBlogs)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

    })

    it('should correct delete vlog', async () => {
        const findBlogs = await req.get(SETTINGS.PATH.BLOGS);

        await req.delete(`${SETTINGS.PATH.BLOGS}/${String(findBlogs.body[0].id)}`)
            .set('Authorization', process.env.AUTH_HEADER || '')
            .expect(HTTP_STATUSES.NO_CONTENT_204);

        await req.get(`${SETTINGS.PATH.BLOGS}/${String(findBlogs.body[0].id)}`).expect(HTTP_STATUSES.NOT_FOUND_404)
    })

})