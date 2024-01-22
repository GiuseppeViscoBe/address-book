import React, { useState, useEffect } from "react";
import FormComponent from "./FormComponent";
import ContactComponent from "./ContactComponent";

function AddressBook() {
  // State per la lista dei contatti
  const [contactList, setContactList] = useState([]);
  // State per il contatto selezionato per l'editing
  const [selectedContact, setSelectedContact] = useState(null);

  // State per i dati del form
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surName: "",
    email: "",
    phoneNumber: "",
  });

  //Chiamata al be
  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const response = await fetch("api/contact-list");
    const data = await response.json();
    setContactList(data);
  }

  // Funzione per gestire la sottomissione del form
  function handleSubmit(event) {
    event.preventDefault();

    // Se ho un contatto selezionato lo modifico
    if (selectedContact) {
      editContact(formData, selectedContact.id);
    } else {
      // Aggiungo un nuovo contatto
      addContact(formData);
    }

    setFormData({
      id: "",
      name: "",
      surName: "",
      email: "",
      phoneNumber: "",
    });
  }

  // Funzione per gestire i cambiamenti nell'input del form
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  //Aggiunta nuovo contatto

  async function addContact(newContact) {
    try {
      const response = await fetch("api/add-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      const newContactResponse = await response.json();

      // Aggiorna la lista locale dei contatti solo dopo aver aggiunto il contatto
      setContactList((existingList) => [newContactResponse, ...existingList]);

      // Azzera i dati del form
      setFormData({
        name: "",
        surName: "",
        email: "",
        phoneNumber: "",
      });

      // Aggiorna la lista completa dei contatti dal backend
      fetchContacts();
    } catch (error) {
      console.error("Errore durante l'aggiunta del contatto:", error);
    }
  }

  //Eliminazione Contatto

  async function handleDelete(contactId) {
    try {
      const response = await fetch(`/api/delete-contact/${contactId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchContacts();
      } else {
        console.error("Errore durante l'eliminazione del contatto");
      }
    } catch (error) {
      console.error(
        "Errore durante la richiesta di eliminazione del contatto:",
        error
      );
    }
  }

  //Modifica Contatto

  //Ogni volta che seleziono un contatto, popolo il form con i suoi dati per modificarlo
  useEffect(() => {
    if (selectedContact) {
      setFormData(selectedContact);
    } else {
      setFormData({
        id: "",
        name: "",
        surName: "",
        email: "",
        phoneNumber: "",
      });
    }
  }, [selectedContact]);

  // Funzione per selezionare un contatto per l'editing
  function selectEdit(contactId) {
    setSelectedContact(contactList.find((contact) => contact.id === contactId));
  }

  //Funzione che gestisce la modifica
  async function editContact(editedContact, contactId) {
    const editRequest = { ...editedContact, id: contactId };
    try {
      const response = await fetch(`/api/edit-contact/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editRequest),
      });

      if (response.ok) {
        fetchContacts();
        setSelectedContact(null);
      } else {
        console.error("Errore durante l'aggiornamento del contatto");
      }
    } catch (error) {
      console.error(
        "Errore durante la richiesta di aggiornamento del contatto:",
        error
      );
    }
  }

  return (
    <div className="App">
      <FormComponent
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formData={formData}
        selectedContact={selectedContact}
      />

      {contactList.map((contact) => (
        <ContactComponent
          key={contact.id}
          name={contact.name}
          surName={contact.surName}
          email={contact.email}
          phoneNumber={contact.phoneNumber}
          isSelected={selectedContact != null && selectedContact.id == contact.id}
          selectEdit={() => selectEdit(contact.id)}
          handleDelete={() => handleDelete(contact.id)}
        />
      ))}
    </div>
  );
}

export default AddressBook;
