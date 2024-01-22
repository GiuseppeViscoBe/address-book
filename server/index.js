const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

let contacts = [];

function sortAlphabetically(contacts) {
    // Utilizza la funzione sort per ordinare l'array in base al campo "nome"
    contacts.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Trasforma il nome in maiuscolo per l'ordinamento senza distinzioni tra maiuscole e minuscole
      const nameB = b.name.toUpperCase();
  
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
  
      return 0; // I nomi sono uguali
    });
  
    return contacts;
  }

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/contact-list", (req, res) => {
  //contacts = sortAlphabetically(contacts)
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

  res.json({ success: true, message: "Contatto eliminato con successo" });
});

app.put("/api/edit-contact", (req, res) => {
  // const contactId = req.params.id;
  const editedContact = req.body;
  console.log(req);
  contacts = contacts.map((contact) =>
    contact.id === editedContact.id ? editedContact : contact
  );

  console.log(contacts);
  res.json({ success: true, message: 'Contatto aggiornato con successo' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
