const movieFilter = (req, file, cb) => {
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

export default movieFilter