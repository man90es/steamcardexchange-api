import puppeteer from "puppeteer"

export default async function getAppData(appId) {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(`https://www.steamcardexchange.net/index.php?inventorygame-appid-${appId}`)

	const cards = await page.evaluate(() => {
		return [...document.querySelectorAll(".inventory-game-card-item")]
			.filter((item) => { // Ignore empty
				return item.querySelectorAll(".name-image-container *").length > 0
			})
			.map((item) => {
				return {
					name: item.querySelector(".card-name").innerText,
					amount: parseInt(item.querySelector(".card-amount").innerText.replace("Stock: ", "")) || 0,
					worth: parseInt(item.querySelector(".card-price:nth-of-type(2)").innerText.replace("Worth: ", "")) || null,
					price: parseInt(item.querySelector(".card-price:nth-of-type(3)").innerText.replace("Price: ", "")) || null,
				}
			})
	})

	browser.close()

	return cards
}
