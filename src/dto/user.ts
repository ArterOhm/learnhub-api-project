export interface IUserDTO {
  id: string
  username: string
  name: string
  registeredAt: string
}

export interface ICreateUserDTO {
  username: string
  name: string
  password: string
  registeredAt: string
}
