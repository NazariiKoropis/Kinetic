import movieFilter from "#config/multer.js"
import fs from 'fs'
import multer from 'multer'
import path from 'path'


const tempDir = path.resolve('uploads/temp')
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true })
}

const storageTemp = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, tempDir)
  },
  filename: (req, file, cb) => {

    const ext = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  }
})

export const uploadTempMiddleware = multer({
  storage: storageTemp,
  movieFilter,
  limits: { fileSize: 5000 * 1024 * 1024 }
})
