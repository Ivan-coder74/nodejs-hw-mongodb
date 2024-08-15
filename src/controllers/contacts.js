// import mongoose from 'mongoose';

import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortingParams.js';
export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  try {
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId: req.user._id,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};
export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactById(contactId, req.user._id);

    if (!contact) {
      return next(
        createHttpError(404, `Contact with id ${contactId} Not found`),
      );
    }

    // if (!mongoose.Types.ObjectId.isValid(contactId)) {
    //   return res.status(400).json({ message: 'Invalid contact ID format' });
    // }

    // try {
    //   const contact = await getContactById(contactId);
    //   if (!contact) {
    //     return res.status(404).json({ message: 'Contact not found' });
    //   }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
// export const getContactByIdController = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;

//     const contact = await getContactById(contactId, req.user._id);
//     if (!contact) {
//       return next(
//         createHttpError(404, `Contact with id ${contactId} Not found`),
//       );
//     }
//     res.status(200).json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const createContactController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await createContact({ payload: req.body, userId });
    res.status(201).json({
      status: 201,
      message: 'Successfully created contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId, req.user._id);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
export const upsertContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { isNew, result } = await updateContact(
      contactId,
      req.body,
      req.user._id,
      { upsert: true },
    );
    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }
    const status = isNew ? 201 : 200;
    res.status(status).json({
      status,
      message: 'Successfully updated contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body, req.user._id);
    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
