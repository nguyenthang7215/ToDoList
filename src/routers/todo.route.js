import {Router} from 'express';
import * as todoController from '../app/controllers/todo.controller.js';
import * as todoMiddleware from '../app/middleware/todo.middleware.js';
import requireAuthentication from '../app/middleware/common/require-authentication.js';
import validate from '../app/middleware/common/validate.js';
import * as todoRequest from '../app/requests/todo.request.js';

const todoRouter = Router();
todoRouter.use(requireAuthentication);

todoRouter.post(
    '/', 
    validate(todoRequest.createTodo),
    todoController.createTodo
);

todoRouter.get(
    '/:id', 
    todoMiddleware.checkValidId,
    todoController.readTodoById
);

todoRouter.get(
    '/:userId/by-userId',
    todoMiddleware.checkValidUserId,
    todoController.readTodoByUserId
);

todoRouter.get(
    '/',
    todoController.readAllTodo
)

todoRouter.put(
    '/:id',
    todoMiddleware.checkValidId,
    validate(todoRequest.updateTodo),
    todoController.updateTodo 
);

todoRouter.patch(
    ':id/toggle-status',
    todoMiddleware.checkValidId,
    todoController.toggleStatus
);

todoRouter.delete(
    '/:id', 
    todoMiddleware.checkValidId,
    todoController.deleteTodo
);

export default todoRouter;