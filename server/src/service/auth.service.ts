import { User } from "../entity/user.entity";
import * as bcrypt from 'bcrypt'
import { JwtPayload, sign as JwtSign } from "jsonwebtoken";
import { sessionRepository } from "../repository/session.repository";

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

const isSessionValid = (token: string): Promise<boolean> => {
  return sessionRepository.sessionExists(token)
}

const createSession = async (user: User): Promise<string> => {
  const payload: JwtPayload = {
    sub: user.id.toString(),
  }

  const token = JwtSign(payload, process.env.SECRET);

  return new Promise<string>((resolve, reject) => {
    sessionRepository.saveSession(token)
      .then(() => resolve(token))
      .catch(reject)
  })
}

const destoySession = (token: string): Promise<boolean> => {
  return sessionRepository.deleteSession(token)
}

export const AuthService = {
  updateUserPassword,
  isUserPasswordValid,
  isSessionValid,
  createSession,
  destoySession
}