import { RedisConnection } from "../infra/redis"

const sessionExists = async (jwt: string): Promise<boolean> => {
  const result = await RedisConnection.get(jwt)

  return result === "EXIST"
}

const saveSession = async (jwt: string): Promise<boolean> => {
  const result = await RedisConnection.set(jwt, 'EXIST')

  return result === "OK"
}

const deleteSession = async (jwt: string): Promise<boolean> => {
  const result = await RedisConnection.del(jwt)

  return !!result
}

export const sessionRepository = {
  sessionExists,
  saveSession,
  deleteSession,
}