import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"

import { Post } from "../models/Post.js"

class ProfilesService {

    async getProfileById(profileId) {
        AppState.profile = null
        const res = await api.get(`api/profiles/${profileId}`)
        logger.log(res.data)
        AppState.profile = new Profile(res.data)
    }

    async getPostsByProfileId(profileId) {
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log('Posts by profile Id:', res.data)
        AppState.posts = res.data.posts.map(pojo => new Post(pojo))
        AppState.newerPage = res.data.newer
        AppState.olderPage = res.data.older
    }

    async changePage(url) {
        const res = await api.get(url)
        AppState.newerPage = res.data.newer
        AppState.olderPage = res.data.older
        AppState.posts = res.data.posts.map(pojo => new Post(pojo))
    }

    async getProfilesWithSearchQuery(searchQuery) {
        const res = await api.get(`api/profiles?query=${searchQuery}`)
        logger.log('get profiles with search', res.data)
        AppState.searchQuery = searchQuery
        const newProfile = res.data.map((profilePOJO) => new Profile(profilePOJO))
        AppState.profile = newProfile
    }

}

export const profilesService = new ProfilesService()