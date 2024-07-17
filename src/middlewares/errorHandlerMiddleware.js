import { isHttpError } from 'http-errors';

const errorHandlerMiddleware = (error, req, res, next) => {
  if (isHttpError(error)) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error.data,
    });
    return;
  }
  res.status(500).json({
    message: 'Something went wrong',
    data: error.message,
  });
};

export default errorHandlerMiddleware;
