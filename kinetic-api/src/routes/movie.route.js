import { createMovie } from '#controllers/movie.controller.js';
import { checkAuth, checkRole } from "#middlewares/auth.middleware.js";
import validateBody from "#middlewares/validator.middleware.js";
import { movieCreateSchema } from "#schemas/movie.schema.js";
import express from "express";

const movieRouter = express.Router();

movieRouter.post('/', checkAuth, checkRole, validateBody(movieCreateSchema), createMovie);

export default movieRouter;