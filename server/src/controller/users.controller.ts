import { RequestHandler, Router } from 'express'
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

const router = Router();

const basePath = '/users'

export const post: RequestHandler = (req, res) => {
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
}
router.post(basePath, post)

export const UserRoutes = router;