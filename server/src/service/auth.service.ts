import { User } from "../entity/user.entity";
import * as bcrypt from 'bcrypt'

export const SALT_ROUNDS = 10

const updateUserPassword = (user: User, password: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
      if (err) {
        reject(err)
      }

      user.encryptedPassword = hash

      resolve(true)
    });
  })
}

const isUserPasswordValid = (user: User, password: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, user.encryptedPassword, function (err, result) {
      if (err) {
        reject(err)
      }

      resolve(result)
    });
  })
}

export const AuthService = {
  updateUserPassword,
  isUserPasswordValid
}