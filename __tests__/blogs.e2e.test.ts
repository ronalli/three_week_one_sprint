import {req} from "./test-helpers";
import {HTTP_STATUSES} from "../src/settings";
import {SETTINGS} from "../src/settings";
import {setBlogDB} from "../src/db/db";
import {dataset} from "./dataset";
import {describe} from "node:test";
import {InputBlogType} from "../src/types/input-blog-type";

describe('/blogs', () => {
    beforeAll(async () => {
        await req.delete(SETTINGS.PATH.ALL_DELETE + '/all-data')
    })
    it('should get empty array', async () => {
        const res = await req.get(SETTINGS.PATH.BLOGS).expect(HTTP_STATUSES.OK_200)
    });
    it('should get not empty array', async () => {
        setBlogDB(dataset.blogs)
        const res = await req.get(SETTINGS.PATH.BLOGS).expect(HTTP_STATUSES.OK_200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual(dataset.blogs[0])
    });
    it('shouldn\'t be create blog (with correct data), as be out authorization header', async () => {
        const newBlog: InputBlogType = {
            name: 'test',
            websiteUrl: 'https://it-incubator.com',
            description: 'description'
        }
        const res = await req.post(SETTINGS.PATH.BLOGS).send(newBlog).expect(HTTP_STATUSES.UNAUTHORIZED)
    });
    it('should be create blog with correct data and authorization header', async () => {
        const newBlog: InputBlogType = {
            name: 'test',
            websiteUrl: 'https://it-incubator.com',
            description: 'description'
        }
        const res = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '').send(newBlog).expect(HTTP_STATUSES.CREATED_201)
    });
    it('shouldn\'t be create blog with authorization header, but not correct data: field name length more 15 symbol', async () => {
        const newBlog: InputBlogType = {
            name: 'teerwerwetrertertertertrertertert',
            websiteUrl: 'https://it-incubator.com',
            description: 'description'
        }
        const res = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '').send(newBlog).expect(HTTP_STATUSES.BED_REQUEST_400)
    });
    it('shouldn\'t be create blog with authorization header, but not correct data: field websiteUrl does not match pattern', async () => {
        const newBlog: InputBlogType = {
            name: 'teerwer',
            websiteUrl: 'http://it-incubator..com',
            description: 'description'
        }
        const res = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '').send(newBlog).expect(HTTP_STATUSES.BED_REQUEST_400)
    });

    it('shouldn\'t be create blog with authorization header, but data not found', async () => {
        const res = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '').send({}).expect(HTTP_STATUSES.BED_REQUEST_400)
    });

    it('shouldn\'t be create blog with authorization header, but not correct data: field websiteUrl does not match pattern', async () => {
        const newBlog: InputBlogType = {
            name: 'teerwer',
            websiteUrl: 'http://it-incubator..com',
            description: 'description'
        }
        const res = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '').send(newBlog).expect(HTTP_STATUSES.BED_REQUEST_400)
    });

    it('shouldn\'t be create blog with authorization header, but not found one with field', async () => {
        const newBlog = {
            websiteUrl: 'http://it-incubator..com',
            description: 'description'
        }
        const res = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '').send(newBlog).expect(HTTP_STATUSES.BED_REQUEST_400)
    });
    it('shouldn\'t be create blog with authorization header, but not correct field: description, length more 500 symbol', async () => {
        const newBlog = {
            websiteUrl: 'http://it-incubator..com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque eros vel ex elementum, non aliquet diam iaculis. Ut vel justo egestas, facilisis orci sed, molestie nisl. Donec feugiat est eu arcu pulvinar, vitae venenatis sapien faucibus. Quisque malesuada vitae ligula ac fringilla. Aenean venenatis laoreet quam. Duis posuere metus ut sem porta cursus. Fusce a blandit neque, eu commodo purus. Nunc vehicula justo id posuere convallis. Sed pellentesque elementum lobortis. In consectetur quis ex nec porta. Proin sagittis eros quis semper rutrum. Nulla in scelerisque erat. Sed id suscipit turpis, id ultricies felis. Ut pretium velit libero, vel facilisis ante ullamcorper id. Mauris vitae tempor orci, nec convallis diam. Suspendisse potenti. Nunc convallis ac nulla ut imperdiet. Sed ac laoreet massa, non blandit lacus. Mauris luctus tortor velit, id posuere libero rutrum a. Nunc et tristique sem. Suspendisse consequat et ex ac maximus. Cras lacinia dictum nisl, pellentesque maximus ligula pretium vitae. Quisque venenatis massa tincidunt, molestie nulla vitae, sollicitudin odio. Praesent et gravida risus. Nunc sit amet ultrices felis, vitae malesuada nulla.'
        }
        const res = await req.post(SETTINGS.PATH.BLOGS).set('Authorization', process.env.AUTH_HEADER || '').send(newBlog).expect(HTTP_STATUSES.BED_REQUEST_400)
    });

})