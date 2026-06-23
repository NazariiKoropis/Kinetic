import { MOVIE_STATUSES, MPAA_RATINGS } from '#constants/movie.js'
import mongoose from "mongoose"

const audioSchema = new mongoose.Schema({
  lang: { type: String, required: true },
  url: { type: String, required: true },
  voiceOver: { type: String, default: 'Original' }
}, { _id: false })


const subSchema = new mongoose.Schema({
  lang: { type: String, required: true },
  url: { type: String, required: true },
  voiceOver: { type: String, default: 'Default' }
}, { _id: false })

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  originalTitle: { type: String, trim: true },
  releaseYear: { type: Number, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  director: { type: String, required: true },
  genres: { type: [String], required: true },
  trailer: { type: String, required: true },
  studios: { type: [String], required: true },

  status: {
    type: String,
    enum: MOVIE_STATUSES,
    default: 'released'
  },
  ratingMPAA: {
    type: String,
    enum: MPAA_RATINGS,
    default: 'NR'
  },

  poster: { type: String, required: true },
  video: { type: String, required: true },
  audio: [audioSchema],
  sub: [subSchema],
  images: { type: [String], default: [] },

  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 10 }

}, { timestamps: true })

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
