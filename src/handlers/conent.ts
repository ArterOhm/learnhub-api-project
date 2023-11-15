import {RequestHandler} from "express"
import {Empty, IContentHandler, ID} from "."
import {IContentDto, ICreateContentDto, ICreateUpdateDto} from "../dto/content"
import {IErrorDto} from "../dto/error"
import {AuthStatus} from "../middleware/jwt"
import {IContent, IContentRepository, IContents} from "../repositories"
import {getOEmbedInfo} from "../utils/oemdeb"
import {Content} from "@prisma/client"

export default class ContentHandler implements IContentHandler {
  private repo: IContentRepository
  constructor(repo: IContentRepository) {
    this.repo = repo
  }

  public getAll: RequestHandler<Empty, IContents> = async (req, res) => {
    const data = await this.repo.getAll()
    const dataObject = {data}
    return res.status(200).json(dataObject).end()
  }
  public getById: RequestHandler<
    ID,
    IContent | IErrorDto,
    undefined,
    undefined
  > = async (req, res) => {
    try {
      const id = Number(req.params.id)
      const result = await this.repo.getById(id)
      return res.status(200).json(result).end()
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        return res.status(400).json({message: error.message}).end()
      }
      return res.status(500).json({message: "internal server error"}).end()
    }
  }
  public create: RequestHandler<
    {},
    IContentDto | IErrorDto,
    ICreateContentDto,
    undefined,
    AuthStatus
  > = async (req, res) => {
    try {
      const {rating, videoUrl, comment} = req.body
      const {author_name, author_url, thumbnail_url, title} =
        await getOEmbedInfo(videoUrl)
      if (typeof rating !== "number")
        return res.status(400).send({message: "rating is not a string"})
      if (rating < 0 || rating > 5)
        return res.status(400).send({message: "rating of range 0-5"})

      const {
        User: {registeredAt, ...userData},
        ...contentData
      } = await this.repo.create(res.locals.user.id, {
        rating,
        videoUrl,
        comment,
        creatorName: author_name,
        creatorUrl: author_url,
        thumbnailUrl: thumbnail_url,
        videoTitle: title,
      })
      const data = {...contentData}
      const createdAt = data.createdAt
      const updatedAt = data.updatedAt
      const result = {
        ...contentData,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        postedBy: {registeredAt: registeredAt.toISOString(), ...userData},
      }
      return res.status(201).json(result).end()
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        return res.status(400).json({message: error.message}).end()
      }
      return res.status(500).json({message: "internal server error"}).end()
    }
  }
  public updateById: RequestHandler<
    ID,
    IContent | IErrorDto,
    ICreateUpdateDto,
    undefined,
    AuthStatus
  > = async (req, res) => {
    try {
      const id = Number(req.params.id)
      const content = await this.repo.getById(id)
      const {comment, rating} = req.body
      if (isNaN(id)) return res.status(400).send({message: "id invalid"})
      if (typeof comment !== "string")
        return res.status(400).send({message: "comment is not a string"})
      if (typeof rating !== "number")
        return res.status(400).send({message: "rating is not a string"})
      if (rating < 0 || rating > 5)
        return res.status(400).send({message: "rating of range 0-5"})
      if (content.User.id !== res.locals.user.id)
        throw new Error("You're not the owner of this content!")
      const updeteData = await this.repo.update(id, {
        comment,
        rating,
        updatedAt: new Date(),
      })
      const contentUpdate = {...req.body, ...updeteData}
      return res.status(200).json(contentUpdate).end()
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        return res.status(400).json({message: error.message}).end()
      }
      return res.status(500).json({message: "internal server error"}).end()
    }
  }
  public deleteById: RequestHandler<
    ID,
    Content | IErrorDto,
    undefined,
    AuthStatus
  > = async (req, res) => {
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) return res.status(404).json({message: "Not a Number"})
      const content = await this.repo.getById(id)
      if (content.User.id !== res.locals.user.id)
        return res
          .status(403)
          .json({message: "You're not the owner of this content!"})
      const result = await this.repo.delete(id)
      return res.status(200).json(result).end()
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        return res.status(400).json({message: "Not found"}).end()
      }
      return res.status(500).json({message: "internal server error"}).end()
    }
  }
}
