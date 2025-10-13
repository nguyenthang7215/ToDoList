import Joi from 'joi';

export const createUser = Joi.object({
    username: Joi.string()
        .trim()
        .min(6)
        .max(255)
        .required()
        .label('Họ và tên'),
    email: Joi.string()
        .trim()
        .lowercase()
        .max(255)
        .email()
        .required()
        .label('Email'),
    password: Joi.string()
        .min(6)
        .max(255)
        .required()
        .label('Mật khẩu')
})

export const findUserById = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .label('Id người dùng')
})

export const findUserByEmail = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .max(255)
        .email()
        .required()
        .label('Email')
})

export const updateUser = Joi.object({
    username: Joi.string()
        .trim()
        .min(6)
        .max(255)
        .required()
        .label('Họ và tên'),
    email: Joi.string()
        .trim()
        .lowercase()
        .max(255)
        .email()
        .required()
        .label('Email')
})

export const resetPassword = Joi.object({
    new_password: Joi.string()
        .trim()
        .min(6)
        .max(255)
        .required()
        .label('Mật khẩu')
})