"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./handlers/user"));
const jwt_1 = __importDefault(require("./middleware/jwt"));
const user_2 = __importDefault(require("./repositories/user"));
const content_1 = __importDefault(require("./repositories/content"));
const conent_1 = __importDefault(require("./handlers/conent"));
const PORT = Number(process.env.PORT || 8888);
const app = (0, express_1.default)();
const clnt = new client_1.PrismaClient();
const userRepo = new user_2.default(clnt);
const contentRepo = new content_1.default(clnt);
const userHandler = new user_1.default(userRepo);
const contentHandler = new conent_1.default(contentRepo);
const jwtMiddleware = new jwt_1.default();
app.use(express_1.default.json());
app.get("/", jwtMiddleware.auth, (req, res) => {
    console.log(res.locals);
    return res.status(200).send("Welcome to LearnHub").end();
});
const userRouter = express_1.default.Router();
const authRouter = express_1.default.Router();
const contentRouter = express_1.default.Router();
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
