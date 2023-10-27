import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"

import { Post } from "../models/Post.js"

class ProfilesService {

    async getProfileById(profileId) {
        AppState.profile = null
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log(response.data)
        AppState.profile = new Profile(response.data)
    }

    async getPostsByProfileId(profileId) {
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log('Posts by profile Id:', response.data)
        AppState.posts = response.data.posts.map(pojo => new Post(pojo))
    }

}

export const profilesService = new ProfilesService()