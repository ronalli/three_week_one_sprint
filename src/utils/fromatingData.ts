import {OutputErrorsType} from "../types/output-errors-type";
import {ValidationError} from "express-validator";
import {BlogDBType} from "../db/blog-types-db";
import {BlogOutputType} from "../types/output-blog-type";
import {PostDBType} from "../db/post-types-db";
import {PostOutputType} from "../types/output-post-type";


export const formatingDataErrors = (array: ValidationError[]) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }
    array.map(item => {
        if (item.type !== "unknown_fields") {
            if (item.type !== "alternative_grouped") {
                if (item.type !== "alternative") {
                    errors.errorsMessages.push({message: item.msg, field: item.path})
                }
            }
        }
    });
    return errors;
}

export const formatingDataForOutputBlog = (input: BlogDBType):BlogOutputType => {
    return {
        id: String(input._id),
        name: input.name,
        description: input.description,
        websiteUrl: input.websiteUrl,
        createdAt: input.createdAt,
        isMembership: input.isMembership,
    };
}

export const formatingDataForOutputPost = (input: PostDBType):PostOutputType => {
    return {
        id: String(input._id),
        blogId: input.blogId,
        content: input.content,
        createdAt: input.createdAt,
        shortDescription: input.shortDescription,
        blogName: input.blogName,
        title: input.title,
    };
}