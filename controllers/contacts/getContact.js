const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return next(HttpError(404, "Movie not found"));
    }
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContact,
};
