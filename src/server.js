import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './constants/index.js';

import errorHandlerMiddleware from '../src/middlewares/errorHandlerMiddleware.js';
import notFoundMiddleware from '../src/middlewares/notFoundMiddleware.js';

import rootRouter from './routers/index.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env(ENV_VARS.PORT, '3000'));
// const PORT = Number(env(ENV_VARS.PORT, '3000'));
console.log('PORT', PORT);
export const startServer = () => {
  const app = express();
  app.use(express.json());

  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/auth/uploads', express.static(UPLOAD_DIR));
  app.use(rootRouter);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
