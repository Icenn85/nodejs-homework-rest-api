const { Contact } = require("../../models/contacts");

async function getContacts(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }).skip(skip).limit(limit);
  res.status(200).json(contacts);
}

module.exports = {
  getContacts,
};