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
const const_1 = require("../const");
const library_1 = require("@prisma/client/runtime/library");
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.create({
                data: user,
                select: const_1.DATA_USER_SELECT,
            });
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.findUniqueOrThrow({
                where: { username },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.findUniqueOrThrow({
                where: { id },
                select: const_1.DATA_USER_SELECT,
            });
        });
    }
    getByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.findUniqueOrThrow({
                where: { username },
                select: const_1.DATA_USER_SELECT,
            });
        });
    }
    addToBlacklist(token, exp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.blacklist.create({
                data: { token, exp: new Date(exp) },
            });
            return;
        });
    }
    isAlreadyBlacklisted(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.blacklist.findUniqueOrThrow({
                    where: { token },
                });
                return true;
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2025")
                    return false;
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = UserRepository;
