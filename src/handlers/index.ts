import { RequestHandler } from "express";
import { ICredentialDto, ILoginDto } from "../dto/auth";
import { IErrorDto } from "../dto/error";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { AuthStatus } from "../middleware/jwt";
import { IContentDto, ICreateContentDto } from "../dto/content";

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>;
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
  selfcheck: RequestHandler<
    {},
    IUserDto | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  >;
}

export interface IContentHandler {
  create: RequestHandler<
    {},
    IContentDto | IErrorDto,
    ICreateContentDto,
    undefined,
    AuthStatus
  >;
}