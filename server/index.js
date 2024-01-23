const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

let contacts = [];

function sortAlphabetically(contacts) {
  
    contacts.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
  
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
  
      return 0; 
    });
  
    return contacts;
  }


app.get("/api/contact-list", (req, res) => {
  res.json(sortAlphabetically(contacts));
});

app.post("/api/add-contact", (req, res) => {
  const newContact = { ...req.body, id: uuidv4() };
  contacts.push(newContact);

  console.log(contacts);
  res.json(newContact);
});

app.delete("/api/delete-contact/:id", (req, res) => {
  const contactId = req.params.id;

  contacts = contacts.filter((contact) => contact.id !== contactId);
  
  console.log(contacts);
  res.json({ success: true, message: "Contact succesfully deleted" });
});

app.put("/api/edit-contact", (req, res) => {
  // const contactId = req.params.id;
  const editedContact = req.body;
  contacts = contacts.map((contact) =>
    contact.id === editedContact.id ? editedContact : contact
  );

  console.log(contacts);
  res.json({ success: true, message: 'Contact succesfully updated' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
