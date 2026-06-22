import { createMovie } from '#controllers/movie.controller.js';
import { validateBody } from '#middlewares/validator.middleware.js';
import { movieCreateSchema } from '#schemas/movie.schema.js';
import express from 'express';

const movieAdminRouter = express.Router();

movieAdminRouter.post('/', validateBody(movieCreateSchema), createMovie);

export default movieAdminRouter