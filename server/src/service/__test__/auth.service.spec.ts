import { User } from "../../entity/user.entity";
import { AuthService, SALT_ROUNDS } from "../auth.service";
import * as bcrypt from 'bcrypt'

describe('AuthService', () => {

  describe('#updateUserPassword', () => {
    it('should return a change user encryptedPassword', async () => {
      const user = new User();

      await new Promise<void>((resolve, reject) => {
        bcrypt.hash('example', SALT_ROUNDS, function (err, hash) {
          if (err) {
            reject(err)
          }

          user.encryptedPassword = hash

          resolve()
        });
      })

      const currentUserEncryptedPassowrd = user.encryptedPassword

      await AuthService.updateUserPassword(user, 'example');

      expect(currentUserEncryptedPassowrd).not.toBe(user.encryptedPassword);
    });
  })

  describe('#isUserPasswordValid', () => {
    it('should return true if password is valid', async () => {
      const user = new User();

      await new Promise<void>((resolve, reject) => {
        bcrypt.hash('example', SALT_ROUNDS, function (err, hash) {
          if (err) {
            reject(err)
          }

          user.encryptedPassword = hash

          resolve()
        });
      })

      const result = await AuthService.isUserPasswordValid(user, 'example');

      expect(result).toBeTruthy()
    });

    it('should return false if password is invalid', async () => {
      const user = new User();

      await new Promise<void>((resolve, reject) => {
        bcrypt.hash('example', SALT_ROUNDS, function (err, hash) {
          if (err) {
            reject(err)
          }

          user.encryptedPassword = hash

          resolve()
        });
      })

      const result = await AuthService.isUserPasswordValid(user, 'example2');

      expect(result).toBeFalsy()
    })
  })
})