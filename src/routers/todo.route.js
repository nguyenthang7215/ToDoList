import {Router} from 'express';
import * as todoController from '../app/controllers/todo.controller.js';
import * as todoMiddleware from '../app/middleware/todo.middleware.js';

const todoRouter = Router();

todoRouter.post(
    '/', 
    todoController.createTodo
);

todoRouter.get(
    '/:id', 
    todoMiddleware.checkValidId,
    todoController.readTodoById
);

todoRouter.get(
    '/:userId',
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