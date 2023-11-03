"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_SELECT = exports.DATA_USER_SELECT = exports.JWT_SECRET = void 0;
const { JWT_SECRET: ENV_JWT_SECRET } = process.env;
if (!ENV_JWT_SECRET)
    throw new Error("Environment variable: JWT_SECRET is not configured");
exports.JWT_SECRET = ENV_JWT_SECRET;
exports.DATA_USER_SELECT = {
    id: true,
    name: true,
    username: true,
    registeredAt: true,
};
exports.DATA_SELECT = {
    id: true,
    comment: true,
    videoUrl: true,
    videoTitle: true,
    thumbnailUrl: true,
    creatorUrl: true,
    creatorName: true,
    rating: true,
    createdAt: true,
    updatedAt: true,
    User: { select: exports.DATA_USER_SELECT },
};
