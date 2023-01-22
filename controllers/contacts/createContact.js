const { HttpError } = require("../../helpers/index");
const { Contact } = require("../../models/contacts");

async function createContact(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return next(HttpError(400, "missing required name field"));
    }
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createContact,
};