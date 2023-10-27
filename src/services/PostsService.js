import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService"
import { Post } from "../models/Post.js"
import { AppState } from "../AppState"

class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('got data', res.data)
        AppState.posts = res.data.posts.map((postPOJO) => new Post(postPOJO))
    }
}

export const postsService = new PostsService()