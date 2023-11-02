"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(ownerId, content) {
        return this.prisma.content.create({
            data: Object.assign(Object.assign({}, content), { User: {
                    connect: { id: ownerId },
                } }),
            include: {
                User: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        registeredAt: true,
                    },
                },
            },
        });
    }
}
exports.default = ContentRepository;
