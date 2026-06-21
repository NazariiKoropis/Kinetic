import { MOVIE_STATUSES, MPAA_RATINGS } from '#constants/movie.js';
import * as z from 'zod';

const movieCreateSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  originalTitle: z.string().optional(),

  releaseDate: z.coerce.date({
    required_error: "Release date is required",
    invalid_type_error: "Invalid date format"
  }),

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
      url: z.string().min(1, 'Subtitle URL is required')
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


const movieUpdateSchema = movieCreateSchema.partial();

export { movieCreateSchema, movieUpdateSchema };

