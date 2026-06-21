import { checkAuth, checkRole } from '#middlewares/auth.middleware.js';
import { uploadTempMiddleware } from '#middlewares/upload.middleware.js';
import express from 'express';

const uploadRouter = express.Router();

uploadRouter.post('/', checkAuth, checkRole, uploadTempMiddleware.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }


    const fileUrl = `/uploads/temp/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

export default uploadRouter;