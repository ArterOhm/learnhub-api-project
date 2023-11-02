"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("../utils/bcrypt");
class UserHandler {
    constructor(repo) {
        this.registration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, username, password } = req.body;
            if (typeof name !== "string" || name.length === 0)
                return res.status(400).json({ message: "name is invalid" });
            if (typeof username !== "string" || username.length === 0)
                return res.status(400).json({ message: "username is invalid" });
            if (typeof password !== "string" || password.length < 5)
                return res.status(400).json({ message: "password is invalid" });
            // try {
            const result = yield this.repo.create({
                name,
                username,
                password: (0, bcrypt_1.hashPassword)(password),
            });
            const userRes = Object.assign(Object.assign({}, result), { registeredAt: result.registeredAt.toUTCString() });
            return res
                .status(201)
                .json(userRes)
                .end();
            // } catch (error) {
            //   if (error instanceof UserCreationError) {
            //     return res.status(500).json({
            //       message: `${error.column} is invalid`,
            //     });
            //   }
            //   return res.status(500).json({
            //     message: `Internal Server Error`,
            //   });
            // }
        });
        this.repo = repo;
    }
}
exports.default = UserHandler;
