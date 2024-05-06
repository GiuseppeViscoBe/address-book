const express = require('express')
const router = express.Router()
const {getContacts, createContact, updateContact, deleteContact, getContactById} = require('../controllers/apiController')


router.get('/', getContacts)

router.get('/:id', getContactById )

router.put('/:id', updateContact)

router.post('/', createContact)

router.delete('/:id', deleteContact)

module.exports = router;


