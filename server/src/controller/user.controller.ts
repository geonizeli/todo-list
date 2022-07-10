import { Router } from "express";
import { UserDto } from "../dto/user.dto";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { CreateResponse, DeleteResponse } from "./typings/responses";

export const routes = Router();

export const apiNamespace = "/users";

routes.post<typeof apiNamespace, unknown, CreateResponse<UserDto>>(
  apiNamespace,
  (req, res) => {
    const { email, password } = req.body;

    UserService.create({
      email,
      password,
    })
      .then((user) => {
        res.json({
          data: {
            email: user.email,
          },
        });
      })
      .catch((err) => {
        res.status(422).json({
          errors: [err.message],
        });
      });
  }
);

const signInPath = `${apiNamespace}/sign_in`;
routes.post<typeof signInPath, unknown, CreateResponse<SessionDto>>(
  signInPath,
  async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);

    if (!user) {
      res.status(500).json({
        errors: ["Invalid credentails"],
      });
      return;
    }

    const isPasswordValid = await AuthService.isUserPasswordValid(
      user,
      password
    );

    if (isPasswordValid) {
      const token = await AuthService.createSession(user);

      res.json({
        data: {
          token,
        },
      });
    } else {
      res.status(500).json({
        data: {
          token: null,
        },
      });
    }
  }
);

const signOutPath = `${apiNamespace}/sign_out`;
routes.delete<typeof signOutPath, unknown, DeleteResponse>(
  signOutPath,
  async (req, res) => {
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
  }
);
