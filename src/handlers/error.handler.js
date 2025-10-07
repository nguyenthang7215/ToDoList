import ApiError from '../utils/classes/api-eror.js';

function errorHandler(err, req, res, next){
    if(err instanceof ApiError){
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
        return;
    }

    res.status(500).json({
        success: false,
        message: err.message
    })
}

export default errorHandler;