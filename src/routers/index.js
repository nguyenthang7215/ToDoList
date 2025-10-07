import userRouter from './user.route.js';
import authRouter from './auth.route.js';
import todoRouter from './todo.route.js';

function route(app){
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/todos', todoRouter);
}

export default route;