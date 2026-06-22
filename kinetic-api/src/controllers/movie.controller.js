import Movie from '#models/Movie.js';
import moveTempFile from "#utils/move-temp-files.js";

//TODO: refactor method, mb add body parser
const createMovie = async (req, res) => {
  try {
    const body = req.body;

    const movieDoc = new Movie({ ...body });
    const movieId = movieDoc._id.toString();


    movieDoc.poster = await moveTempFile(body.poster, movieId);
    movieDoc.video = await moveTempFile(body.video, movieId);

    if (body.audio && body.audio.length > 0) {
      movieDoc.audio = await Promise.all(
        body.audio.map(async (aud) => ({
          ...aud,
          url: await moveTempFile(aud.url, movieId)
        }))
      );
    }

    if (body.sub && body.sub.length > 0) {
      movieDoc.sub = await Promise.all(
        body.sub.map(async (sub) => ({
          ...sub,
          url: await moveTempFile(sub.url, movieId)
        }))
      );
    }

    if (body.images && body.images.length > 0) {
      movieDoc.images = await Promise.all(
        body.images.map(async (img) => await moveTempFile(img, movieId))
      );
    }

    await movieDoc.save();

    res.status(201).json({ message: 'Movie created successfully!', movie: movieDoc });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating movie', error: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const { filter, sort, skip, limit, page } = req.mongoQuery;

    const [movies, totalMovies] = await Promise.all([
      Movie.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Movie.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: movies,
      pagination: {
        totalItems: totalMovies,
        totalPages: Math.ceil(totalMovies / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error getting movies', error: e.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;

    const movie = await Movie.findById(id)

    if (!movie) {
      res.status(404).json({ message: 'Movie didnt found' })
    }

    res.status(200).json(movie)
  }
  catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error getting movie', error: e.message });
  }
}

export { createMovie, getMovieById, getMovies };

