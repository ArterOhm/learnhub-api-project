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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const oemdeb_1 = require("../utils/oemdeb");
class ContentHandler {
    constructor(repo) {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.getAll();
            return res.status(200).json(result).end();
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo.getById(req.params.id);
                return res.status(200).json(result).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { rating, videoUrl, comment } = req.body;
                const { author_name, author_url, thumbnail_url, title } = yield (0, oemdeb_1.getOEmbedInfo)(videoUrl);
                if (typeof rating !== "number")
                    return res.status(400).send({ message: "rating is not a string" });
                if (rating < 0 || rating > 5)
                    return res.status(400).send({ message: "rating of range 0-5" });
                const _a = yield this.repo.create(res.locals.user.id, {
                    rating,
                    videoUrl,
                    comment,
                    creatorName: author_name,
                    creatorUrl: author_url,
                    thumbnailUrl: thumbnail_url,
                    videoTitle: title,
                }), _b = _a.User, { registeredAt } = _b, userData = __rest(_b, ["registeredAt"]), contentData = __rest(_a, ["User"]);
                const data = Object.assign({}, contentData);
                const createdAt = data.createdAt;
                const updatedAt = data.updatedAt;
                const result = Object.assign(Object.assign({}, contentData), { createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString(), postedBy: Object.assign({ registeredAt: registeredAt.toISOString() }, userData) });
                return res
                    .status(201)
                    .json(result)
                    .end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.updateById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { comment, rating } = req.body;
                if (typeof comment !== "string")
                    return res.status(400).send({ message: "comment is not a string" });
                if (typeof rating !== "number")
                    return res.status(400).send({ message: "rating is not a string" });
                if (rating < 0 || rating > 5)
                    return res.status(400).send({ message: "rating of range 0-5" });
                const result = yield this.repo.update(req.params.id, {
                    comment,
                    rating,
                });
                const contentUpdate = Object.assign(Object.assign({}, req.body), result);
                return res.status(200).json(contentUpdate).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.deleteById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo.delete(req.params.id);
                return res.status(200).json(result).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.repo = repo;
    }
}
exports.default = ContentHandler;
