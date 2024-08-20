import { startServer } from '../src/server.js';
import { initMongoDb } from './db/initMongoDb.js';
import { createFolderIfNotExist } from './utils/createFolderIfNotExist.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
const bootstrap = async () => {
  await initMongoDb();
  await createFolderIfNotExist(TEMP_UPLOAD_DIR);
  await createFolderIfNotExist(UPLOAD_DIR);
  startServer();
};
bootstrap();
