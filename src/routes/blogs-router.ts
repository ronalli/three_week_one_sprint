import {Router} from 'express';
import {blogsControllers} from "../blogs/blogsControllers";
import {validationCreateBlog} from "../middleware/input-validation-blog-middleware";
import {authMiddleware} from "../middleware/auth-middleware";
import {inputCheckErrorsMiddleware} from "../middleware/inputCheckErrorsMiddleware";

export const blogsRouter = Router({});

blogsRouter.get('/', blogsControllers.getBlogs)
blogsRouter.get('/:id', blogsControllers.getBlog)
blogsRouter.post('/', authMiddleware, ...validationCreateBlog, inputCheckErrorsMiddleware, blogsControllers.createBlog)
blogsRouter.put('/:id', authMiddleware, ...validationCreateBlog, inputCheckErrorsMiddleware, blogsControllers.updateBlog)
blogsRouter.delete('/:id', authMiddleware, blogsControllers.deleteBlog)