import {Content, User} from "@prisma/client"
import {ICreateUserDto, IUserDto} from "../dto/user"
import {IContentDto, ICreateUpdateDto} from "../dto/content"

export interface IUser {
  id: string
  username: string
  name: string
  registeredAt: Date
}
export interface ICreateContent
  extends Omit<Content, "ownerId" | "id" | "createdAt" | "updatedAt"> {}

export interface IUpdateContent extends Omit<Content, "ownerId"> {}

export interface IContent {
  id: number
  videoTitle: string
  videoUrl: string
  comment: string
  rating: number
  thumbnailUrl: string
  creatorName: string
  creatorUrl: string
  createdAt: Date
  updatedAt: Date
  User: IUser
}

export interface IContents {
  data: IContent[]
}

export interface IUserRepository {
  create(user: ICreateUserDto): Promise<IUser>
  findByUsername(username: string): Promise<User>
  findById(id: string): Promise<IUser>
  getByUsername(username: string): Promise<IUser>
}
export interface IBlacklistRepository {
  addToBlacklist(token: string, exp: number): Promise<void>
  isAlreadyBlacklisted(token: string): Promise<boolean>
}
export interface IContentRepository {
  getAll(): Promise<IContent[]>
  getById(id: number): Promise<IContent>
  create(ownerId: string, content: ICreateContent): Promise<IContent>
  update(id: number, contentUpdate: ICreateUpdateDto): Promise<IContent>
  delete(id: number): Promise<Content>
}
