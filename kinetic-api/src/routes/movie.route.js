import { getMovieById, getMovies } from '#controllers/movie.controller.js';
import buildMovieFilter from "#middlewares/movieFilter.middleware.js";
import { validateQuery } from '#middlewares/validator.middleware.js';
import { movieFilterSchema } from '#schemas/movie.schema.js';
import express from "express";

const movieRouter = express.Router();

movieRouter.get('/', validateQuery(movieFilterSchema), buildMovieFilter, getMovies)
movieRouter.get('/:id', getMovieById)

export default movieRouter;