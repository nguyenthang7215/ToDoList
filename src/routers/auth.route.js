import { Router } from 'express';
import * as authController from '../app/controllers/auth.controller.js';
import requireAuthentication from '../app/middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post(
    '/signup',
    authController.register
);

authRouter.post(
    '/login',
    authController.login
);

authRouter.post(
    '/logout',
    requireAuthentication,
    authController.logout
);

authRouter.patch(
    '/reset-password',
    requireAuthentication,
    authController.resetPassword
);

export default authRouter;