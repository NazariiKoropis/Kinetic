import { uploadTempMiddleware } from '#middlewares/upload.middleware.js'
import express from 'express'

const uploadCmsRouter = express.Router()

uploadCmsRouter.post('/', uploadTempMiddleware.single('file'), (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ success: false, message: 'No file uploaded' })
		}

		const fileUrl = `/uploads/temp/${req.file.filename}`
		res.status(200).json({ success: true, url: fileUrl })

	} catch (e) {
		console.error(e)
		res.status(500).json({ success: false, message: 'Error uploading file' })
	}
})

export default uploadCmsRouter
