import Movie from '#models/Movie.js';
import moveTempFile from "#utils/move-temp-files.js";

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



export { createMovie };

