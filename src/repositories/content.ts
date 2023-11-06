import {Content, PrismaClient} from "@prisma/client"
import {
  IContent,
  IContentRepository,
  IContents,
  ICreateContent,
  IUpdateContent,
} from "."
import {DATA_SELECT, DATA_USER_SELECT} from "../const"

export default class ContentRepository implements IContentRepository {
  private prisma: PrismaClient
  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }
  public getAll(): Promise<IContent[]> {
    return this.prisma.content.findMany({
      select: DATA_SELECT,
    })
  }
  public getById(id: number): Promise<IContent> {
    return this.prisma.content.findUniqueOrThrow({
      where: {id: id},
      select: DATA_SELECT,
    })
  }
  public create(ownerId: string, content: ICreateContent): Promise<IContent> {
    return this.prisma.content.create({
      data: {
        ...content,
        User: {
          connect: {id: ownerId},
        },
      },
      select: DATA_SELECT,
    })
  }

  public update(id: number, contentUpdate: IUpdateContent): Promise<IContent> {
    return this.prisma.content.update({
      where: {id: id},
      data: {...contentUpdate},
      select: DATA_SELECT,
    })
  }
  public delete(id: number): Promise<Content> {
    return this.prisma.content.delete({
      where: {id: Number(id)},
    })
  }
}
