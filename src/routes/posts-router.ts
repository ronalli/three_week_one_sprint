import {Router} from 'express';
import {postsControllers} from "../posts/postsControllers";
import {validationCreatePost} from "../middleware/input-validation-post-middleware";
import {authMiddleware} from "../middleware/auth-middleware";
import {inputCheckErrorsMiddleware} from "../middleware/inputCheckErrorsMiddleware";
export const postsRouter = Router({});

postsRouter.get('/', postsControllers.getPosts)
postsRouter.get('/:id', postsControllers.getPost)
postsRouter.post('/', authMiddleware, ...validationCreatePost, inputCheckErrorsMiddleware, postsControllers.createPost)
postsRouter.put('/:id', authMiddleware, ...validationCreatePost, inputCheckErrorsMiddleware, postsControllers.updatePost)
postsRouter.delete('/:id', authMiddleware, postsControllers.deletePost)