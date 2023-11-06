import {RequestHandler} from "express"
import {ICredentialDto, ILoginDto} from "../dto/auth"
import {IErrorDto} from "../dto/error"
import {ICreateUserDto, IUserDto} from "../dto/user"
import {AuthStatus} from "../middleware/jwt"
import {IContentDto, ICreateContentDto, ICreateUpdateDto} from "../dto/content"
import {IContent, IContents} from "../repositories"
import {Content} from "@prisma/client"

export interface UserName {
  username: string
}

export interface ID {
  id: string
}

export interface Empty {}

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>
  userName: RequestHandler<UserName, IUserDto | IErrorDto, undefined, undefined>
  selfcheck: RequestHandler<
    {},
    IUserDto | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  >
}

export interface IContentHandler {
  getAll: RequestHandler<Empty, IContents>
  getById: RequestHandler<ID, IContent | IErrorDto, undefined, undefined>
  create: RequestHandler<
    {},
    IContentDto | IErrorDto,
    ICreateContentDto,
    undefined,
    AuthStatus
  >
  updateById: RequestHandler<
    ID,
    IContent | IErrorDto,
    ICreateUpdateDto,
    undefined,
    AuthStatus
  >
  deleteById: RequestHandler<ID, Content | IErrorDto, undefined, AuthStatus>
}
