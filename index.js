import express from "express"
import getAppData from "./scraper/index.js"
import dotenv from "dotenv"

dotenv.config()
const port = parseInt(process.env.PORT) || 8002

const app = express()

app.get('/apps/:appId', (req, res) => {
	getAppData(req.params.appId)
		.then((data) => {
			res.send(data)
		})
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
