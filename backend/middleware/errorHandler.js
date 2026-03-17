// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.message || err);

    const status = err.status || err.statusCode || 500;
    res.status(status).json({
        error: err.name || 'InternalServerError',
        message: err.message || 'Ocurrió un error inesperado en el servidor',
    });
};

module.exports = errorHandler;
