import { checkAuth, checkRole } from '#middlewares/auth.middleware.js'
import express from 'express'

// Web routes imports
import webAuthRoutes from './web/auth.routes.js'
import webCountryRoutes from './web/country.routes.js'
import webGenreRoutes from './web/genre.routes.js'
import webMovieRoutes from './web/movie.routes.js'
import webStudioRoutes from './web/studio.routes.js'

// CMS routes imports
import cmsCountryRoutes from './cms/country.routes.js'
import cmsDashboardRoutes from './cms/dashboard.routes.js'
import cmsGenreRoutes from './cms/genre.routes.js'
import cmsMovieRoutes from './cms/movie.routes.js'
import cmsMpaaRoutes from './cms/mpaa.routes.js'
import cmsStudioRoutes from './cms/studio.routes.js'
import cmsUploadRoutes from './cms/upload.routes.js'

const apiRouter = express.Router()

//  Public / User client routing branch
const webRouter = express.Router()

webRouter.use('/auth', webAuthRoutes)
webRouter.use('/movie', webMovieRoutes)
webRouter.use('/genre', webGenreRoutes)
webRouter.use('/country', webCountryRoutes)
webRouter.use('/studio', webStudioRoutes)

apiRouter.use('/web', webRouter)

// Admin / CMS routing branch (globally protected)

const cmsRouter = express.Router()
cmsRouter.use(checkAuth, checkRole)
cmsRouter.use('/movie', cmsMovieRoutes)
cmsRouter.use('/genre', cmsGenreRoutes)
cmsRouter.use('/country', cmsCountryRoutes)
cmsRouter.use('/studio', cmsStudioRoutes)
cmsRouter.use('/dashboard', cmsDashboardRoutes)
cmsRouter.use('/mpaa', cmsMpaaRoutes)
cmsRouter.use('/upload', cmsUploadRoutes)

apiRouter.use('/cms', cmsRouter)

export default apiRouter
