import { AppState } from "../AppState.js"
import { Promotion } from "../models/Promotion.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService"

class AdsService {
    async getAds() {
        const res = await api.get('api/ads?count=2')
        logger.log('got ads', res.data)
        AppState.ad = res.data.map((adPOJO) => new Promotion(adPOJO))
    }
}

export const adsService = new AdsService()