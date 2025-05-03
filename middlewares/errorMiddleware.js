// In your error middleware file (errorMiddleware.js)
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.error('ERROR 💥', err);
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      });
    } else {
      // Production error handling
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
  };