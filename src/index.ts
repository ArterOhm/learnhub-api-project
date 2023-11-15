import {PrismaClient} from "@prisma/client"
import express from "express"
import {IContentHandler, IUserHandler} from "./handlers"
import UserHandler from "./handlers/user"
import JWTMiddleware from "./middleware/jwt"
import {IContentRepository, IUserRepository} from "./repositories"
import UserRepository from "./repositories/user"
import ContentRepository from "./repositories/content"
import ContentHandler from "./handlers/conent"
import cors from "cors"
import {RedisClientType, createClient} from "redis"
import {REDIS_URL} from "./const"
import BlacklistRepository from "./repositories/backlist"

console.log(process.env)

const PORT = Number(process.env.PORT || 8888)
const app = express()
const clnt = new PrismaClient()

const redisClnt: RedisClientType = createClient({
  url: REDIS_URL,
})

clnt
  .$connect()
  .then(() => redisClnt.connect())
  .catch((err) => {
    console.error("Error", err)
  })

const blacklistRepo = new BlacklistRepository(redisClnt)

const userRepo: IUserRepository = new UserRepository(clnt)
const contentRepo: IContentRepository = new ContentRepository(clnt)

const userHandler: IUserHandler = new UserHandler(userRepo, blacklistRepo)
const contentHandler: IContentHandler = new ContentHandler(contentRepo)

const jwtMiddleware = new JWTMiddleware(blacklistRepo)

app.use(express.json())
app.use(cors())

app.get("/", jwtMiddleware.auth, (req, res) => {
  console.log(res.locals)
  return res.status(200).send("Welcome to LearnHub").end()
})

const userRouter = express.Router()
const authRouter = express.Router()
const contentRouter = express.Router()

app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/content", contentRouter)

userRouter.post("/", userHandler.registration)
userRouter.get("/:username", userHandler.userName)

authRouter.post("/login", userHandler.login)
authRouter.get("/logout", jwtMiddleware.auth, userHandler.logout)
authRouter.get("/me", jwtMiddleware.auth, userHandler.selfcheck)

contentRouter.get("/", contentHandler.getAll)
contentRouter.get("/:id", contentHandler.getById)
contentRouter.post("/", jwtMiddleware.auth, contentHandler.create)
contentRouter.patch("/:id", jwtMiddleware.auth, contentHandler.updateById)
contentRouter.delete("/:id", jwtMiddleware.auth, contentHandler.deleteById)

app.listen(PORT, () => {
  console.log(`LearnHub API is up at ${PORT}`)
})
