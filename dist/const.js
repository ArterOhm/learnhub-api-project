"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLACKLIST_REDIS_VALUE = exports.BLACKLIST_REDIS_KEY_PREFIX = exports.DATA_SELECT = exports.DATA_USER_SELECT = exports.REDIS_URL = exports.JWT_SECRET = void 0;
const { JWT_SECRET: ENV_JWT_SECRET, REDIS_URL: ENV_REDIS_URL } = process.env;
if (!ENV_JWT_SECRET)
    throw new Error("Environment variable: JWT_SECRET is not configured");
exports.JWT_SECRET = ENV_JWT_SECRET;
exports.REDIS_URL = ENV_REDIS_URL !== null && ENV_REDIS_URL !== void 0 ? ENV_REDIS_URL : "redis://localhost:6379";
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
exports.BLACKLIST_REDIS_KEY_PREFIX = "bl_";
exports.BLACKLIST_REDIS_VALUE = "1";
