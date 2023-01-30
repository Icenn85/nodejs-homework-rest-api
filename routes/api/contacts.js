const express = require('express')
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  contactToUpdate,
  contactStatusToUpdate,
} = require("../../controllers");
const { validateBody, auth } = require("../../middlewares");
const {
  addContactSchema,
  updatedStatusContactSchema,
} = require("../../schemas/contactsSchemas");

const router = express.Router()

router.get('/', auth, getContacts)

router.get("/:contactId", auth, getContact);

router.post("/", auth, validateBody(addContactSchema), createContact);

router.delete("/:contactId", auth, deleteContact);

router.put("/:contactId", validateBody(addContactSchema), contactToUpdate);

router.patch(
  "/:contactId/favorite",
  auth,
  validateBody(updatedStatusContactSchema),
  contactStatusToUpdate
);

module.exports = router
