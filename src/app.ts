import express from "express"
import dotenv from "dotenv"
import getAppData from "./scraper"

dotenv.config()
const port = parseInt(process.env.PORT || "8002")

const app = express()

app.get("/apps/:appId", (req, res) => {
	getAppData(parseInt(req.params.appId))
		.then((data) => {
			res.send(data)
		})
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
