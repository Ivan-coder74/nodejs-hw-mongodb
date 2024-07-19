import { isHttpError } from 'http-errors';

const errorHandlerMiddleware = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }
  res.status(500).json({
    message: 'Something went wrong',
    data: err.message,
  });
};

export default errorHandlerMiddleware;
