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
        AppState.newerPage = res.data.newer
        AppState.olderPage = res.data.older
    }


    async changePage(url) {
        const res = await api.get(url);
        AppState.newerPage = res.data.newer
        AppState.olderPage = res.data.older
        AppState.posts = res.data.posts.map((POJO) => new Post(POJO))
    }


    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        const newPost = new Post(res.data)
        AppState.posts.push(newPost)
    }
}

export const postsService = new PostsService()