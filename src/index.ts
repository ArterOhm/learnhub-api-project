import { PrismaClient } from "@prisma/client";
import express from "express";
import { IContentHandler, IUserHandler } from "./handlers";
import UserHandler from "./handlers/user";
import JWTMiddleware from "./middleware/jwt";
import { IContentRepository, IUserRepository } from "./repositories";
import UserRepository from "./repositories/user";
import ContentRepository from "./repositories/content";
import ContentHandler from "./handlers/conent";

const PORT = Number(process.env.PORT || 8888);
const app = express();
const clnt = new PrismaClient();

const userRepo: IUserRepository = new UserRepository(clnt);
const contentRepo: IContentRepository = new ContentRepository(clnt);

const userHandler: IUserHandler = new UserHandler(userRepo);
const contentHandler: IContentHandler = new ContentHandler(contentRepo);

const jwtMiddleware = new JWTMiddleware();

app.use(express.json());

app.get("/", jwtMiddleware.auth, (req, res) => {
  console.log(res.locals);
  return res.status(200).send("Welcome to LearnHub").end();
});

const userRouter = express.Router();
const authRouter = express.Router();
const contentRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/content", contentRouter);

userRouter.post("/", userHandler.registration);
authRouter.post("/login", userHandler.login);
authRouter.get("/me", jwtMiddleware.auth, userHandler.selfcheck);
contentRouter.post("/", jwtMiddleware.auth, contentHandler.create);

app.listen(PORT, () => {
  console.log(`LearnHub API is up at ${PORT}`);
});