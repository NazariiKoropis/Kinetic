import { checkAuth, checkRole } from "#middlewares/auth.middleware.js";
import express from 'express';
import movieAdminRoutes from './movie.admin.route.js';

const adminRouter = express.Router();

adminRouter.use(checkAuth, checkRole);

adminRouter.use('/movie', movieAdminRoutes);


export default adminRouter;