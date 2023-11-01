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
const bcypt_1 = require("../utils/bcypt");
class UserHandler {
    constructor(repo) {
        this.registeration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, username, password: plainPassword } = req.body;
            const { id: registeredId, name: registeredName, registeredAt, username: registeredUsername, } = yield this.repo.create({
                name,
                username,
                password: (0, bcypt_1.hashPassword)(plainPassword),
            });
            return res
                .status(201)
                .json({
                id: registeredId,
                name: registeredName,
                registeredAt: `${registeredAt}`,
                username: registeredUsername,
            })
                .end();
            // const plainPassword = req.body.password;
        });
        this.repo = repo;
    }
}
exports.default = UserHandler;
