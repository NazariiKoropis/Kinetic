import { checkAuth, checkRole } from "#middlewares/auth.middleware.js"
import express from 'express'
import countryAdminRoutes from './country.admin.route.js'
import genreAdminRoutes from './genre.admin.route.js'
import movieAdminRoutes from './movie.admin.route.js'
import mpaaAdminRoutes from './mpaa.admin.route.js'
import studioAdminRoutes from './studio.admin.route.js'

const adminRouter = express.Router()

adminRouter.use(checkAuth, checkRole)

adminRouter.use('/movie', movieAdminRoutes)
adminRouter.use('/genre', genreAdminRoutes)
adminRouter.use('/country', countryAdminRoutes)
adminRouter.use('/mpaa', mpaaAdminRoutes)
adminRouter.use('/studio', studioAdminRoutes)

export default adminRouter
