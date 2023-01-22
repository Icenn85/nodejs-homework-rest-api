const { HttpError } = require("../../helpers/index");
const { Contact } = require("../../models/contacts");

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return next(HttpError(404, "Not found"));
    }
    await Contact.findByIdAndRemove(contactId);
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  deleteContact,
};