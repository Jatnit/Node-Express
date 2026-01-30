function errorHandler(err, req, res, next) {
    console.error(err.stack);
    if(err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => ({
            field: e.field,
            message: e.message
        }));
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: errors
        });
    }
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
}
module.exports = errorHandler;