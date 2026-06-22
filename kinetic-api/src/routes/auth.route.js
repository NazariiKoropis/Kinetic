import { validateBody } from "#middlewares/validator.middleware.js";
import { userLoginSchema, userRegisterSchema } from "#schemas/user.schema.js";
import express from "express";

import { login, logout, refresh, register } from "#controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);
authRouter.post("/login", validateBody(userLoginSchema), login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);

export default authRouter;