import { startServer } from '../src/server.js';
import { initMongoDb } from './db/initMongoDb.js';
const bootstrap = async () => {
  await initMongoDb();
  startServer();
};
bootstrap();
