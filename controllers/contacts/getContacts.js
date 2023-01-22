const { Contact } = require("../../models/contacts");

async function getContacts(req, res) {
  const { limit } = req.query;
  const contacts = await Contact.find({}).limit(limit);
  res.status(200).json(contacts);
}

module.exports = {
  getContacts,
};