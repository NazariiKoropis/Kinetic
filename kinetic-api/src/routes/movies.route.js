import { generateMovieId, upload } from "#config/multer.js";
import { checkAuth, checkRole } from "#middlewares/auth.middleware.js";
import validateBody from "#middlewares/validator.middleware.js";
import { movieCreateSchema } from "#schemas/movie.schema.js";
import express from "express";

import { createMovie } from '#controllers/movie.controller.js';


const movieRouter = express.Router();

movieRouter.post('/', checkAuth, checkRole, generateMovieId, upload.any(), validateBody(movieCreateSchema), createMovie)

export default movieRouter;