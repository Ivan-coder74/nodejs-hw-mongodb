import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const validateMongoId = (idName) => (req, res, next) => {
  const id = req.params[idName];
  if (!isValidObjectId(id)) {
    next(createHttpError(400, 'Invalid contact ID format'));
  }
  next();
};
export default validateMongoId;
