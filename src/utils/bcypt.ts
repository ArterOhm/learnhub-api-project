import {compareSync, genSaltSync, hashSync} from "bcryptjs"

export const hashPassword = (plaintext: string): string => {
  const salt = genSaltSync(12)
  return hashSync(plaintext, salt)
}

export const verifyPassword = (plaintex: string, hashVal: string): boolean =>
  compareSync(plaintex, hashVal)
