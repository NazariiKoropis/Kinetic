import { MOVIE_STATUSES } from '#constants/movie.js'
import UPLOAD_FOLDERS from "#constants/upload.js"
import Movie from '#models/Movie.js'
import User from '#models/User.js'
import deleteFile from "#utils/delete-file.js"
import moveTempFile from "#utils/move-temp-files.js"
import { rm } from 'fs/promises'
import path from 'path'

const createMovie = async (req, res) => {
  try {
    const { title,
      originalTitle,
      releaseYear,
      duration,
      description,
      director,
      genres,
      countries,
      poster,
      video,
      audio,
      sub,
      images,
      status,
      ratingMPAA,
      studios,
      trailer } = req.body

    const newMovie = new Movie({ title, originalTitle, releaseYear, duration, description, director, genres, countries, poster, video, audio, sub, images, status, ratingMPAA, studios, trailer })

    const movieId = newMovie._id.toString()

    newMovie.poster = await moveTempFile(poster, UPLOAD_FOLDERS.MOVIE, movieId)
    newMovie.video = await moveTempFile(video, UPLOAD_FOLDERS.MOVIE, movieId)

    if (audio && audio.length > 0) {
      newMovie.audio = await Promise.all(
        audio.map(async (aud) => ({
          ...aud,
          url: await moveTempFile(aud.url, UPLOAD_FOLDERS.MOVIE, movieId)
        }))
      )
    }

    if (sub && sub.length > 0) {
      newMovie.sub = await Promise.all(
        sub.map(async (sub) => ({
          ...sub,
          url: await moveTempFile(sub.url, UPLOAD_FOLDERS.MOVIE, movieId)
        }))
      )
    }

    if (images && images.length > 0) {
      newMovie.images = await Promise.all(
        images.map(async (img) => await moveTempFile(img, UPLOAD_FOLDERS.MOVIE, movieId))
      )
    }

    await newMovie.save()

    res.status(201).json({ message: 'Movie created successfully!', movie: newMovie })

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error creating movie', error: e.message })
  }
}

const getMovies = async (req, res) => {
  try {
    const { filter, sort, skip, limit, page } = req.mongoQuery

    const [movies, totalMovies] = await Promise.all([
      Movie.find(filter)
        .select('title poster releaseYear genres countries rating ratingMPAA duration status likesCount dislikesCount')
        .populate('genres')
        .populate('countries')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Movie.countDocuments(filter)
    ])

    res.status(200).json({
      success: true,
      data: movies,
      pagination: {
        totalItems: totalMovies,
        totalPages: Math.ceil(totalMovies / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error getting movies', error: e.message })
  }
}

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params

    const movie = await Movie.findById(id)
      .populate('genres')
      .populate('countries')

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.status(200).json({ success: true, data: movie })
  }
  catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error getting movie', error: e.message })
  }
}

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params
    const newMovie = req.body

    const oldMovie = await Movie.findById(id)
    if (!oldMovie)
      return res.status(404).json({ message: 'Movie didnt found' })

    const oldFiles = [
      oldMovie.poster,
      oldMovie.video,
      ...(oldMovie.audio?.map(a => a.url) || []),
      ...(oldMovie.sub?.map(s => s.url) || []),
      ...(oldMovie.images || [])
    ].filter(Boolean)

    if (newMovie.poster)
      newMovie.poster = await moveTempFile(newMovie.poster, UPLOAD_FOLDERS.MOVIE, id)

    if (newMovie.video)
      newMovie.video = await moveTempFile(newMovie.video, UPLOAD_FOLDERS.MOVIE, id)

    if (newMovie.audio) {
      newMovie.audio = await Promise.all(
        newMovie.audio.map(async (aud) =>
        ({
          ...aud,
          url: await moveTempFile(aud.url, UPLOAD_FOLDERS.MOVIE, id)
        })))
    }

    if (newMovie.sub) {
      newMovie.sub = await Promise.all(
        newMovie.sub.map(async (sub) =>
        ({
          ...sub,
          url: await moveTempFile(sub.url, UPLOAD_FOLDERS.MOVIE, id)
        })))
    }

    if (newMovie.images) {
      newMovie.images = await Promise.all(
        newMovie.images.map(async (img) =>
          await moveTempFile(img, UPLOAD_FOLDERS.MOVIE, id)))
    }

    Object.assign(oldMovie, newMovie)

    const newFiles = [
      oldMovie.poster,
      oldMovie.video,
      ...(oldMovie.audio?.map(a => a.url) || []),
      ...(oldMovie.sub?.map(s => s.url) || []),
      ...(oldMovie.images || [])
    ].filter(Boolean)

    const filesToDelete = oldFiles.filter(oldUrl => !newFiles.includes(oldUrl))

    await oldMovie.save()

    for (const fileUrl of filesToDelete) {
      await deleteFile(fileUrl, UPLOAD_FOLDERS.MOVIE, id)
    }

    res.status(200).json({
      message: 'Movie updated successfully!',
      data: oldMovie
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error updating movie', error: e.message })
  }
}

const deleteMovieById = async (req, res) => {
  try {
    const { id } = req.params

    const movie = await Movie.findById(id)
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    const folderPath = path.resolve(process.cwd(), 'uploads', UPLOAD_FOLDERS.MOVIE, id)

    try {
      await rm(folderPath, { recursive: true, force: true })
    } catch (err) {
      console.error(`Error deleting folder (might not exist):`, err.message)
    }

    await movie.deleteOne()

    res.status(200).json({ success: true, message: 'Movie deleted successfully' })

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error deleting movie', error: e.message })
  }
}

const toggleLikeMovie = async (req, res) => {
  try {
    const { id } = req.params
    const { id: userId } = req.user

    const [movie, user] = await Promise.all([
      Movie.findById(id),
      User.findById(userId)
    ])

    if (!movie || !user) {
      return res.status(404).json({ message: 'No movie or user found' })
    }

    const isLiked = user.likedMovies.some(mId => mId.toString() === id)
    const isDisliked = user.dislikedMovies.some(mId => mId.toString() === id)

    let userUpdate = {}
    let movieUpdate = { $inc: {} }

    if (isLiked) {
      userUpdate = { $pull: { likedMovies: id } }
      movieUpdate.$inc.likesCount = -1
    } else {
      userUpdate = {
        $addToSet: { likedMovies: id },
        $pull: { dislikedMovies: id }
      }
      movieUpdate.$inc.likesCount = 1
      if (isDisliked) {
        movieUpdate.$inc.dislikesCount = -1
      }
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, userUpdate),
      Movie.findByIdAndUpdate(id, movieUpdate)
    ])

    res.status(200).json({
      success: true,
      message: isLiked ? 'The like has been successfully removed' : 'Like added successfully'
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error while handling like', error: e.message })
  }
}

const toggleDislikeMovie = async (req, res) => {
  try {
    const { id } = req.params
    const { id: userId } = req.user

    const [movie, user] = await Promise.all([
      Movie.findById(id),
      User.findById(userId)
    ])

    if (!movie || !user) {
      return res.status(404).json({ message: 'No movie or user found' })
    }

    const isLiked = user.likedMovies.some(mId => mId.toString() === id)
    const isDisliked = user.dislikedMovies.some(mId => mId.toString() === id)

    let userUpdate = {}
    let movieUpdate = { $inc: {} }

    if (isDisliked) {
      userUpdate = { $pull: { dislikedMovies: id } }
      movieUpdate.$inc.dislikesCount = -1
    } else {
      userUpdate = {
        $addToSet: { dislikedMovies: id },
        $pull: { likedMovies: id }
      }
      movieUpdate.$inc.dislikesCount = 1
      if (isLiked) {
        movieUpdate.$inc.likesCount = -1
      }
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, userUpdate),
      Movie.findByIdAndUpdate(id, movieUpdate)
    ])

    res.status(200).json({
      success: true,
      message: isDisliked ? 'The dislike has been successfully removed' : 'Dislike added successfully'
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error while handling dislike', error: e.message })
  }
}

const addView = async (req, res) => {
  try {
    const { id } = req.params

    const movie = await Movie.findByIdAndUpdate(id,
      {
        $inc: { views: 1 }
      },
      { new: true }
    )

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.status(200).json({
      success: true, message: 'View added successfully'
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Error while adding view',
      error: e.message
    })
  }
}

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const movie = await Movie.findByIdAndUpdate(id, { status })

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.status(200).json({
      success: true, message: 'Status updated successfully'
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Error while updating status',
      error: e.message
    })
  }
}

const getRelatedMovies = async (req, res) => {
  try {
    const { id } = req.params

    const movie = await Movie.findById(id)
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    const relatedMovies = await Movie.find({
      _id: { $ne: id },
      status: { $in: [MOVIE_STATUSES[0], MOVIE_STATUSES[1]] },
      $or: [
        { genres: { $in: movie.genres } },
        { director: movie.director }
      ]
    })
      .select('title poster releaseYear genres countries rating ratingMPAA duration status likesCount dislikesCount')
      .populate('genres')
      .populate('countries')
      .limit(6)

    res.status(200).json({
      success: true,
      data: relatedMovies
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error while getting related movies', error: e.message })
  }
}

const getMovieForSearch = async (req, res) => {
  try {
    const { title } = req.query

    if (!title || title.trim() === '') {
      return res.status(200).json({ success: true, data: [] })
    }

    const movies = await Movie.find({
      title: { $regex: title, $options: 'i' },
      status: { $in: [MOVIE_STATUSES[0], MOVIE_STATUSES[1]] },
    }).select('_id title poster').limit(5)

    res.status(200).json({
      success: true,
      data: movies
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Error while getting movies',
      error: e.message
    })
  }
}

export {
  addView,
  createMovie,
  deleteMovieById,
  getMovieById,
  getMovieForSearch,
  getMovies,
  getRelatedMovies,
  toggleDislikeMovie,
  toggleLikeMovie,
  updateMovie,
  updateStatus
}
