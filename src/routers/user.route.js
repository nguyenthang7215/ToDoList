import { Router } from 'express';
import * as userMiddleware from '../app/middleware/user.middleware.js';
import * as userController from '../app/controllers/user.controller.js';
import requireAuthentication from '../app/middleware/auth.middleware.js';

const userRouter = Router();
userRouter.use(requireAuthentication);

userRouter.post(
    '/',
    userController.createUser
);

userRouter.get(
    '/:id',
    userMiddleware.checkValidId,
    userController.readUserById
);

userRouter.get(
    '/:email',
    userMiddleware.checkValidEmail,
    userController.readUserByEmail
);

userRouter.put(
    '/:id',
    userMiddleware.checkValidId,
    userController.updateUser
);

userRouter.patch(
    '/:id/reset-password',
    userMiddleware.checkValidId,
    userController.resetPassword
);

userRouter.delete(
    '/:id',
    userMiddleware.checkValidId,
    userController.deleteUser
);

export default userRouter;