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
class ContentHandler {
    constructor(repo) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { rating, videoUrl, comment } = req.body;
            if (rating > 5 || rating < 0)
                return res.status(400).json({ message: "rating is out of range 0-5" })
                    .send;
            const _a = yield this.repo.create(res.locals.user.id, {
                rating,
                videoUrl,
                comment,
                creatorName: "",
                creatorUrl: "",
                thumbnailUrl: `https://i.ytimg.com/vi/${videoUrl.substring(videoUrl.length - 11, videoUrl.length)}/hqdefault.jpg`,
                videoTitle: "",
            }), _b = _a.User, { registeredAt } = _b, userData = __rest(_b, ["registeredAt"]), contentData = __rest(_a, ["User"]);
            return res
                .status(201)
                .json(Object.assign(Object.assign({}, contentData), { postedBy: Object.assign(Object.assign({}, userData), { registeredAt: registeredAt.toISOString() }) }))
                .end();
        });
        this.repo = repo;
    }
}
exports.default = ContentHandler;
