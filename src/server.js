import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import contactsRouter from './routers/contacts.js';

import errorHandlerMiddleware from '../src/middlewares/errorHandlerMiddleware.js';
import notFoundMiddleware from '../src/middlewares/notFoundMiddleware.js';

const PORT = Number(env(ENV_VARS.PORT, '3000'));
// const PORT = Number(env(ENV_VARS.PORT, '3000'));
console.log('PORT', PORT);
export const startServer = () => {
  const app = express();
  app.use(express.json());

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(contactsRouter);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
