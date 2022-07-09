import { Router } from 'express';
import { UserDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { createPath as buildPath } from '../utils/createPath';

const router = Router();

const BASE_PATH = '/users'

export const createPath = BASE_PATH

router.post(createPath, (req, res) => {
  const { email, password } = req.body;

  UserService.create({
    email,
    password
  }).then(user => {
    const respose: UserDto = {
      id: user.id,
      email: user.email
    }

    res.json(respose);
  }).catch(err => {
    res.status(422).json({
      error: err.message
    });
  })
})

export const signInPath = buildPath(BASE_PATH, 'sign_in')
router.post(signInPath, async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.findByEmail(email)

  const isPasswordValid = await AuthService.isUserPasswordValid(user, password)

  if (isPasswordValid) {
    const token = await AuthService.createSession(user)

    res.json({
      auth: true,
      token
    })
  } else {
    res.status(500).json({
      auth: false,
      token: null,
    })
  }
})

export const signOutPath = buildPath(BASE_PATH, 'sign_out')
router.delete(signOutPath, async (req, res) => {
  const token = req.headers['x-access-token']

  if (typeof token === 'string') {
    await AuthService.destoySession(token)

    res.status(204).json({
      success: true
    })
  } else {
    res.status(422).json({
      success: false
    })
  }
})

export const UserRoutes = router;