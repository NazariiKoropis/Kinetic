import { MOVIE_STATUSES, MPAA_RATINGS } from "#constants/movie.js";
import mongoose from "mongoose";


const subSchema = new mongoose.Schema({
  lang: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });


const audioSchema = new mongoose.Schema({
  lang: { type: String, required: true },
  url: { type: String, required: true },
  voiceOver: { type: String, default: 'Original' }
}, { _id: false });


const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  originalTitle: {
    type: String,
    trim: true
  },
  trailer: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  likesCount: {
    type: Number,
    default: 0
  },
  dislikesCount: {
    type: Number,
    default: 0
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  video: {
    type: String,
    required: true
  },
  genres: {
    type: [String],
    required: true
  },
  audio: {
    type: [audioSchema],
    default: []
  },
  sub: {
    type: [subSchema],
    default: []
  },
  poster: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
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
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;