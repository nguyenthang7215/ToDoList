import { Router } from 'express';
import * as userMiddleware from '../app/middleware/user.middleware.js';
import * as userController from '../app/controllers/user.controller.js';
import requireAuthentication from '../app/middleware/common/require-authentication.js';
import validate from '../app/middleware/common/validate.js';
import * as userRequest from '../app/requests/user.request.js';

const userRouter = Router();
userRouter.use(requireAuthentication);

userRouter.post(
    '/',
    validate(userRequest.createUser),
    userController.createUser
);

userRouter.get(
    '/:id',
    userMiddleware.checkValidId,
    userController.readUserById
);

userRouter.get(
    '/:email/by-email',
    userMiddleware.checkValidEmail,
    userController.readUserByEmail
);

userRouter.put(
    '/:id',
    userMiddleware.checkValidId,
    validate(userRequest.updateUser),
    userController.updateUser
);

userRouter.patch(
    '/:id/reset-password',
    userMiddleware.checkValidId,
    validate(userRequest.resetPassword),
    userController.resetPassword
);

userRouter.delete(
    '/:id',
    userMiddleware.checkValidId,
    userController.deleteUser
);

export default userRouter;