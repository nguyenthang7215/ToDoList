import Joi from 'joi';

export const createTodo = Joi.object({
    title: Joi.string()
        .trim()
        .max(255)
        .required()
        .label('Tiêu đề'),
    description: Joi.string()
        .allow('')
        .optional()
        .label('Mô tả'),
    status: Joi.string()
        .valid('pending', 'done')
        .default('pending')
        .required()
        .label('Trạng thái'),
    due_date: Joi.date()
        .iso() // chuan YYYY-MM-DD
        .min('now')
        .optional()
        .label('Ngày hết hạn'),
    user_id: Joi.number()
        .integer()
        .positive()
        .required()
        .label('Id người dùng')
})

export const findTodoById = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .label('Id của todo')
})

export const findTodoByUserId = Joi.object({
    user_id: Joi.number()
        .integer()
        .positive()
        .required()
        .label('Id người dùng')
})

export const updateTodo = Joi.object({
    title: Joi.string()
        .trim()
        .max(255)
        .required()
        .label('Tiêu đề'),
    description: Joi.string()
        .allow('')
        .optional()
        .label('Mô tả'), 
    status: Joi.string()
        .valid('pending', 'done')
        .default('pending')
        .required()
        .label('Trạng thái'),
    due_date: Joi.date()
        .iso() 
        .min('now')
        .optional()
        .label('Ngày hết hạn'),
})