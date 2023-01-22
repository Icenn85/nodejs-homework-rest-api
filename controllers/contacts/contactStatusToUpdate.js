const { HttpError } = require("../../helpers/index");
const { Contact } = require("../../models/contacts");

async function contactStatusToUpdate(req, res, next) {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const contactToUpdate = await Contact.findById(contactId);
    if (!contactToUpdate) {
      return next(HttpError(404, "Not found"));
    }
    const updatedStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return res.status(200).json(updatedStatusContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  contactStatusToUpdate,
};