import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService"
import { Post } from "../models/Post.js"
import { AppState } from "../AppState"
// import axios from "axios"

class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('got data', res.data)
        AppState.posts = res.data.posts.map((postPOJO) => new Post(postPOJO))
    }


    async changePage(endpointUrl) {
        const res = await api.get(endpointUrl)
        logger.log('got page', res.data)
        const newPosts = res.data.posts.map((pojo) => new Post(pojo))
        AppState.posts = newPosts
        AppState.newer = res.data.newer
        AppState.older = res.data.older
    }

}

export const postsService = new PostsService()