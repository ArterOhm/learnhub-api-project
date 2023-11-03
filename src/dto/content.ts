import { Content } from "@prisma/client";
import { IUserDto } from "./user";

export interface ICreateContentDto {
  videoUrl: string;
  comment: string;
  rating: number;
}

export interface ICreateUpdateDto {
  comment: string
  rating: number
}

export interface IContentDto  {
  postedBy: IUserDto;
  id: number;
  videoTitle: string;
  videoUrl: string;
  comment: string;
  rating: number;
  thumbnailUrl: string;
  creatorName: string;
  creatorUrl: string;
  createdAt: string;
  updatedAt: string;
}

