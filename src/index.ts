import express from "express"
import {PrismaClient} from "@prisma/client"

const PORT = Number(process.env.PORT || 8080)
const app = express()

app.get("/", (req, res) => {
  return res.status(200).send("welcome to LearnHub").end()
})

app.listen(PORT, () => {
  console.log(`LernHub API is up at ${PORT}`)
})
