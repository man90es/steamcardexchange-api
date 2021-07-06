import Bottleneck from "bottleneck"
import getAppData from "./getAppData.js"

export default class SteamcardexchangeAPI {
	static #limiter = new Bottleneck({
		maxConcurrent: 1,
		minTime: 333
	})

	static async getAppData(appId) {
		const ratelimited = SteamcardexchangeAPI.#limiter.wrap(getAppData)
		return ratelimited(appId)
	}
}
