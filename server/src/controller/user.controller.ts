import { Router } from "express";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";

const router = Router();
export const UserRoutes = router;

export const apiNamespace = "/users";

router.post(apiNamespace, (req, res) => {
  const { email, password } = req.body;

  UserService.create({
    email,
    password,
  })
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(422).json({
        error: err.message,
      });
    });
});

router.post(`${apiNamespace}/sign_in`, async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.findByEmail(email);

  if (!user) {
    res.status(500).json({
      error: "Invalid credentails",
    });
    return;
  }

  const isPasswordValid = await AuthService.isUserPasswordValid(user, password);

  if (isPasswordValid) {
    const token = await AuthService.createSession(user);

    res.json({
      auth: true,
      token,
    });
  } else {
    res.status(500).json({
      auth: false,
      token: null,
    });
  }
});

router.delete(`${apiNamespace}/sign_out`, async (req, res) => {
  const token = req.headers["x-access-token"];

  if (typeof token === "string") {
    await AuthService.destoySession(token);

    res.status(204).json({
      success: true,
    });
  } else {
    res.status(422).json({
      success: false,
    });
  }
});
