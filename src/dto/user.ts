export interface IUserDto {
  id: string;
  username: string;
  name: string;
  registeredAt: string;
}

// export interface IUserDtoExtends extends Pick<User, "id" | "username" | "name"> {
//   registeredAt: string
// }

export interface ICreateUserDto {
  name: string;
  username: string;
  password: string;
}

// export interface ICreateUserDtoExtends
//   extends Pick<User, "name" | "username" | "password"> {}
