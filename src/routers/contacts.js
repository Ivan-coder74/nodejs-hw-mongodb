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
const contactsRouter = Router();
contactsRouter.use('/:contactId', validateMongoId('contactId'));
contactsRouter.use('/', authenticate);
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get(
  '/:contactId',

  ctrlWrapper(getContactByIdController),
);
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
contactsRouter.delete(
  '/:contactId',

  ctrlWrapper(deleteContactController),
);
contactsRouter.put(
  '/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),

  ctrlWrapper(patchContactController),
);
export default contactsRouter;
