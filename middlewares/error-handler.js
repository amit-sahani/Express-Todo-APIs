const {CustomAPIErrors} = require('../errors/custom-error')

const errorhandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIErrors){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: 'Something went wrong, please try again.'})
}

module.exports = errorhandlerMiddleware