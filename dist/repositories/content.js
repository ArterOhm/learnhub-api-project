"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
class ContentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAll() {
        return this.prisma.content.findMany({
            select: const_1.DATA_SELECT
        });
    }
    getById(id) {
        return this.prisma.content.findUniqueOrThrow({
            where: { id: Number(id) },
            select: const_1.DATA_SELECT
        });
    }
    create(ownerId, content) {
        return this.prisma.content.create({
            data: Object.assign(Object.assign({}, content), { User: {
                    connect: { id: ownerId },
                } }),
            select: const_1.DATA_SELECT
        });
    }
    update(id, contentUpdate) {
        return this.prisma.content.update({
            where: { id: Number(id) },
            data: Object.assign(Object.assign({}, contentUpdate), { updatedAt: new Date() }),
            select: const_1.DATA_SELECT
        });
    }
    delete(id) {
        return this.prisma.content.delete({
            where: { id: Number(id) },
        });
    }
}
exports.default = ContentRepository;
