export type ParamType = {
    id: string
}

export type BodyTypePost = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type BodyTypeBlog = {
    name: string
    description: string
    websiteUrl: string
}

export type QueryType = {
    search?: string
}