import { Router } from 'express';
import { createContactSchema } from '../validation/createContactSchema.js';
import {
  getContactByIdController,
  getAllContactsController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/index.js';
import validateBody from '../middlewares/validateBody.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
const contactsRouter = Router();
contactsRouter.use('/:contactId', validateMongoId('contactId'));
contactsRouter.use('/', authenticate);
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post(
  '/',
  // validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));
contactsRouter.put(
  '/:contactId',
  validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(upsertContactController),
);
contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  upload.single('photo'),
  ctrlWrapper(patchContactController),
);
export default contactsRouter;
