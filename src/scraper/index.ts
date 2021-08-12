import puppeteer from "puppeteer"
import { Card } from "../types"

export default async function getAppData(appId: number): Promise<Card[]> {
	const browser = await puppeteer.launch({
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
		],
	})
	const page = await browser.newPage()
	await page.goto(`https://www.steamcardexchange.net/index.php?inventorygame-appid-${appId}`)

	const cards = await page.evaluate(() => {
		function parseIntAdvanced(str: string, radix?: number): number {
			return parseInt(str.replace(/(?!\.)(\D)/g, ""), radix)
		}

		return [...document.querySelectorAll(".inventory-game-card-item")]
			.filter((item) => { // Ignore empty
				return item.querySelectorAll(".name-image-container *").length > 0
			})
			.map((item): Card => {
				return {
					name:   (item.querySelector(".card-name") as HTMLElement)?.innerText,
					amount: parseIntAdvanced((item.querySelector(".card-amount") as HTMLElement)?.innerText) || 0,
					worth:  parseIntAdvanced((item.querySelector(".card-price:nth-of-type(2)") as HTMLElement)?.innerText) || undefined,
					price:  parseIntAdvanced((item.querySelector(".card-price:nth-of-type(3)") as HTMLElement)?.innerText) || undefined,
				}
			})
	})

	browser.close()

	return cards
}
