import {req} from "./test-helpers";
import {HTTP_STATUSES} from "../src/settings";
import {SETTINGS} from "../src/settings";

import {describe} from "node:test";
import {dataset} from "./dataset";
import {db, setBlogDB, setPostDB} from "../src/db/db";
import {InputPostType} from "../src/types/input-post-type";

describe('/posts', () => {
    beforeAll(async () => {
        await req.delete(SETTINGS.PATH.ALL_DELETE + '/all-data')
    })

    it('shouldn\'t return posts, as not found blogId', async () => {
        const newPost: InputPostType = {
            blogId: 'fsd',
            content: 'content 2',
            shortDescription: 'shortdescription',
            title: 'test 2'
        }
        const res = await req.post(SETTINGS.PATH.POSTS).set('Authorization', process.env.AUTH_HEADER || '').send(newPost).expect(HTTP_STATUSES.BED_REQUEST_400);
    });

    it('shouldn\'t create posts, as don\'t authorization', async () => {
        const newPost: InputPostType = {
            blogId: 'fsd',
            content: 'content 2',
            shortDescription: 'shortdescription',
            title: 'test 2'
        }
        const res = await req.post(SETTINGS.PATH.POSTS).send(newPost).expect(HTTP_STATUSES.UNAUTHORIZED)
    });
    it('shouldn\'t create posts, as don\'t authorization', async () => {
        const newPost: InputPostType = {
            blogId: 'fsd',
            content: 'content 2',
            shortDescription: 'shortdescription',
            title: 'test 2'
        }
        const res = await req.post(SETTINGS.PATH.POSTS).set('Authorization', process.env.AUTH_HEADER_FAIL || '').send(newPost).expect(HTTP_STATUSES.UNAUTHORIZED)
    });
    it('shouldn\'t create posts, as not correct data', async () => {
        const newPost: InputPostType = {
            blogId: 'fs',
            content: 'content 2',
            shortDescription: 'shortdescriptionshordescriptionshortdescriptionshordescriptionshortdescriptionshordescriptionshortdescriptionshordescriptionshortdescriptionshordescription',
            title: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
        }
        const res = await req.post(SETTINGS.PATH.POSTS).set('Authorization', process.env.AUTH_HEADER || '').send(newPost).expect(HTTP_STATUSES.BED_REQUEST_400)
    });
    it('should get post with correct id', async () => {
        setBlogDB(dataset.blogs)
        setPostDB(dataset.posts)
        const posts = dataset.posts
        const res = await req.get(SETTINGS.PATH.POSTS + `/${posts[0].id}`).expect(HTTP_STATUSES.OK_200);
    })
    it('should get empty array posts ', async () => {
        const res = await req.get(SETTINGS.PATH.POSTS).expect(HTTP_STATUSES.OK_200);
    });

    it('should get not empty array posts ', async () => {
        setBlogDB(dataset.blogs)
        setPostDB(dataset.posts)
        const res = await req.get(SETTINGS.PATH.POSTS).expect(HTTP_STATUSES.OK_200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual(db.posts[0]);
    });

    it('should create post', async () => {
        setBlogDB(dataset.blogs)
        setPostDB();
        const newPost: InputPostType = {
            blogId: db.blogs[0].id,
            title: 'test 1',
            shortDescription: 'shortdescription',
            content: 'content 1'
        }
        const res = await req.post(SETTINGS.PATH.POSTS).set('Authorization', process.env.AUTH_HEADER || '').send(newPost).expect(HTTP_STATUSES.CREATED_201)
        expect(res.body).toEqual(db.posts[0])
    })

})