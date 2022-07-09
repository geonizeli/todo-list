import { validate } from "class-validator"
import { NewUserDto } from "../dto/newUser.dto"
import { User } from "../entity/user.entity"
import { userRepository } from "../repository/user.repository"
import { AuthService } from "./auth.service"

async function create(newUserDto: NewUserDto): Promise<User> {
  const user = new User()
  user.email = newUserDto.email

  const errors = await validate(user);

  if (errors.length) {
    throw new Error("Invalid user data")
  }

  const result = await findByEmail(user.email)

  if (result) {
    throw new Error("User already exists")
  }

  await AuthService.updateUserPassword(user, newUserDto.password)

  return userRepository.save(user)
}

async function findByEmail(email: string): Promise<User | undefined> {
  return userRepository.findOneBy({ email })
}

async function findUserById(id: number): Promise<User | undefined> {
  return userRepository.findOneBy({ id })
}

export const UserService = {
  create,
  findByEmail,
  findUserById
}