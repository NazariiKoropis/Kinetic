import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
const generateMovieId = (req, res, next) => {
  if (!req.params.id && !req.movieId) {
    req.movieId = new mongoose.Types.ObjectId().toString();
  }
  next();
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const id = req.params.id || req.movieId;

    if (!id) {
      return cb(new Error('Movie ID is missing. Cannot create directory.'));
    }

    const dir = path.resolve(`uploads/${id}`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const fileName = `${file.fieldname}-${Date.now()}${ext}`;

    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/webp',
    'video/mp4', 'video/webm',
    'audio/mpeg', 'audio/mp3', 'audio/ogg',
    'text/vtt'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file format: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5000 * 1024 * 1024
  }
});

export { generateMovieId, upload };

