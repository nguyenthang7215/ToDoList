import Joi, { ValidationError } from 'joi';
import ApiError from '../../../utils/classes/api-eror';

function validate(schema) {
    if (!Joi.isSchema(schema)) {
        throw new Error('"schema" must be a Joi schema.');
    }

    return async function (req, res, next) {
        try{
            const validateData = await schema.validateAsync(req.body)
            req.body = validateData;
            return next();
        }
        catch(error){
            if(error instanceof ValidationError){
                return next(new ApiError.badRequest(error.details[0].message));
            }

            return next(error);
        }
    }
}

export default validate;