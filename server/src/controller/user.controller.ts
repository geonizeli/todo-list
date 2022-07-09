import { Router } from 'express';
import { UserDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

const router = Router();

export const apiNamespace = '/users'

router.post(apiNamespace, (req, res) => {
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

router.post(`${apiNamespace}/sign_in`, async (req, res) => {
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

router.delete(`${apiNamespace}/sign_out`, async (req, res) => {
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