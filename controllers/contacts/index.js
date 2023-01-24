const { getContacts } = require("./getContacts");
const { getContact } = require("./getContact");
const { createContact } = require("./createContact");
const { deleteContact } = require("./deleteContact");
const { contactToUpdate } = require("./contactToUpdate");
const { contactStatusToUpdate } = require("./contactStatusToUpdate");

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  contactToUpdate,
  contactStatusToUpdate,
};
