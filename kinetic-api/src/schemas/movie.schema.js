import { MOVIE_STATUSES, MPAA_RATINGS } from '#constants/movie.js';
import * as z from 'zod';

const movieCreateSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  originalTitle: z.string().optional(),

  releaseYear: z.coerce.number()
    .int('The year must be an integer')
    .min(1888, 'The year must be at least 1888')
    .max(new Date().getFullYear() + 5, 'A year too far in the future'),

  duration: z.coerce.number().min(1, 'Duration must be at least 1 minute'),

  description: z.string().min(10, 'Description must be at least 10 characters'),
  director: z.string().min(2, 'Director name must be at least 2 characters'),

  genres: z.array(z.string().min(2, 'Genre must be at least 2 characters'))
    .min(1, 'At least one genre is required'),

  poster: z.string({ required_error: 'Poster is required' }).min(1, 'Poster is required'),
  video: z.string({ required_error: 'Video is required' }).min(1, 'Video is required'),

  audio: z.array(
    z.object({
      lang: z.string().min(2, 'Language must be at least 2 characters'),
      url: z.string().min(1, 'Audio URL is required'),
      voiceOver: z.string().optional()
    })
  ).optional(),

  sub: z.array(
    z.object({
      lang: z.string().min(2, 'Language of subtitles must be specified'),
      url: z.string().min(1, 'Subtitle URL is required'),
      voiceOver: z.string().optional()
    })
  ).optional(),

  images: z.array(z.string()).optional(),

  status: z.enum(MOVIE_STATUSES, {
    required_error: 'Status is required',
    invalid_type_error: 'Invalid status'
  }),

  ratingMPAA: z.enum(MPAA_RATINGS, {
    required_error: 'MPAA rating is required',
    invalid_type_error: 'Invalid MPAA rating'
  })
});

const movieFilterSchema = z.object({
  title: z.string().optional(),


  genres: z.string().optional(),

  status: z.enum(MOVIE_STATUSES, {
    invalid_type_error: 'Invalid status'
  }).optional(),

  releaseYear: z.coerce.number()
    .int('The year must be an integer')
    .min(1888, 'The year must be at least 1888')
    .max(new Date().getFullYear() + 5, 'A year too far in the future')
    .optional(),

  duration: z.coerce.number().optional(),

  ratingMPAA: z.enum(MPAA_RATINGS, {
    invalid_type_error: 'Invalid MPAA rating'
  }).optional(),

  director: z.string().optional(),


  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),

  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
});

const movieUpdateSchema = movieCreateSchema.partial();

export { movieCreateSchema, movieFilterSchema, movieUpdateSchema };

