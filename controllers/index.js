const {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    contactToUpdate,
    contactStatusToUpdate,
} = require("./contacts");

const {
    signup,
    login,
    logout,
    current,
} = require("./user");

module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    contactToUpdate,
    contactStatusToUpdate,
    signup,
    login,
    logout,
    current,
};
