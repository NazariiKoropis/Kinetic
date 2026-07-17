//libs
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import apiRouter from '#routes/index.js'

import connectDB from '#config/db.js'

connectDB()

const allowedCors = {
    origin: [process.env.WEB_END_URL, process.env.CMS_END_URL],
    credentials: true
}

const app = express()

const port = (process.env.PORT || "3000")
const host = (process.env.HOST || "127.0.0.1")

app.use(cors(allowedCors))
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.json({ message: 'Kinetic API is running successfully!' })
})

app.get('/api/v1', (req, res) => {
    res.json({ message: 'Kinetic API v1  is running successfully!' })
})

app.use('/api/v1', apiRouter)

app.listen(port, host, () => console.log(`Server running at http://localhost:${port}/`))
