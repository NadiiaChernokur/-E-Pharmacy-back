// import { Contact } from "../db/contact.js";
import { NearestStore } from "../db/nearestStore.js";
import { Store } from "../db/store.js";
import HttpError from "../helpers/HttpError.js";
// import {
//   createContactSchema,
//   updateFavoriteSchema,
// } from "../schemas/contactsSchemas.js";

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    res.json(HttpError(404));
  }
};

export const getStoresNearest = async (req, res, next) => {
  try {
    const stores = await NearestStore.find();
    res.json(stores);
  } catch (error) {
    next(error);
  }
};

// export const deleteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleteContact = await Contact.findByIdAndDelete(id);
//     if (!deleteContact) throw HttpError(404);
//     res.json(deleteContact);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createContact = async (req, res, next) => {
//   try {
//     const { _id: owner } = req.user;
//     const { error } = createContactSchema.validate(req.body);
//     if (error) throw HttpError(400, error.message);
//     const result = await Contact.create({ ...req.body, owner });
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (Object.keys(req.body).length === 0)
//       throw HttpError(400, "Body must have at least one field");

//     const { error } = createContactSchema.validate(req.body);
//     if (error) throw HttpError(400, error.message);
//     const update = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//     if (!update) throw HttpError(404);
//     res.json(update);
//   } catch (error) {
//     next(error);
//   }
// };

// export const favoriteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!id) throw HttpError(404);

//     if (Object.keys(req.body).length === 0)
//       throw HttpError(400, "missing field favorite");

//     const { error } = updateFavoriteSchema.validate(req.body);
//     if (error) throw HttpError(400, "missing field favorite");
//     const update = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//     if (!update) throw HttpError(404);
//     res.json(update);
//   } catch (error) {
//     next(error);
//   }
// };
