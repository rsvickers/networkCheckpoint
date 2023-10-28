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

    async removePost(postId) {
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('delete project', res.data)
        AppState.posts = AppState.posts.filter((post) => post.id != postId)
    }

    async editPost(postData) {
        const res = await api.put(`api/posts/${postData.id}`, postData)
        const newPost = new Post(res.data)
        AppState.posts = newPost
    }
    async likePost(postId) {
        const res = await api.post(`api/posts/${postId}/like`)
        logger.log('liked?', res.data)
        const newLike = new Post(res.data)
        const targetIndex = AppState.posts.findIndex((post) => post.id == postId)
        AppState.posts[targetIndex] = newLike
    }
}

export const postsService = new PostsService()