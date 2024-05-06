const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  contacts = sortAlphabetically(contacts)
  res.status(200).json({ contacts });
});

//@desc Get contact by id
//@route GET /api/contact/:id
//@access public
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json({ contact });
});

//@desc Create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, surName, email, phoneNumber } = req.body;

  if (!name || !surName || !email || !phoneNumber) {
    res.status(400);
    throw new Error("Request not valid");
  }

  const contact = await Contact.create({  name, surName, email, phoneNumber });
  res.status(201).json({ contact });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ updateContact });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  console.log(contact)
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  console.log("id deleted contact: " + req.params.id)
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({ contact });
});

module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
