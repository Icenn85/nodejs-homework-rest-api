const { HttpError } = require("../../helpers/index");
const { Contact } = require("../../models/contacts");

async function contactToUpdate(req, res, next) {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return next(HttpError(400, "missing fields"));
    }

    const contactUpdate = await Contact.findById(contactId);
    if (!contactUpdate) {
      return next(HttpError(404, "Not found"));
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
      },
      { new: true }
    );
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  contactToUpdate,
};