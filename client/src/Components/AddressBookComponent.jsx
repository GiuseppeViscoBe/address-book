import React, { useState, useEffect } from "react";
import FormComponent from "./FormComponent";
import ContactComponent from "./ContactComponent";
import AlertComponent from "./AlertComponent"
import "./../App.css";

function AddressBook() {
  // State per la lista dei contatti
  const [contactList, setContactList] = useState([]);
  // State per il contatto selezionato per l'editing
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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
    try {
      const response = await fetch("http://localhost:3001/api/contacts");

      if (!response.ok) {
        throw new Error(`Error fetching from server: ${response.statusText}`);
      }

      const data = await response.json();

      console.log("Response from server:", data.contacts);
      setContactList(data.contacts);
    } catch (error) {
      console.error(
        "Error fetching from server:",
        error.message
      );

      handleShowAlert();
    }
  }

  // Funzione per gestire la sottomissione del form
  function handleSubmit(event) {
    event.preventDefault();

    // Se ho un contatto selezionato lo modifico
    if (selectedContact) {
      editContact(formData, selectedContact._id);
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
      const response = await fetch("http://localhost:3001/api/contacts", {
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
      console.error("Error adding contact to server:", error);

      handleShowAlert();
    }
  }

  //Eliminazione Contatto

  async function handleDelete(contactId) {
    try {
      const response = await fetch(`http://localhost:3001/api/contacts/${contactId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchContacts();
      } else {
        console.error("Error deleting contact from server.");
      }
    } catch (error) {
      console.error(
        "Error deleting contact from server:",
        error
      );

      handleShowAlert();
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
    setSelectedContact(contactList.find((contact) => contact._id === contactId));
  }

  //Funzione che gestisce la modifica
  async function editContact(editedContact, contactId) {
    const editRequest = { ...editedContact, id: contactId };
    try {
      console.log("id del contatto: " + contactId)
      const response = await fetch(`http://localhost:3001/api/contacts/${contactId}`, {
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
        console.error("Error updating contact.");
      }
    } catch (error) {
      console.error(
        "Error updating contact:",
        error
      );

      handleShowAlert();
    }
  }

  //Funzione per la gestione dell'alert

  function handleShowAlert() {
    setShowAlert(true);
  }

  function handleCloseAlert() {
    setShowAlert(false);
  }

  return (
    <div className="addressBookBody">
      <div>

        {showAlert && (
          <AlertComponent
            message="There was an error with the server, try again later."
            onClose={() => handleCloseAlert()}
          />
        )}


      </div>
      <FormComponent
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formData={formData}
        selectedContact={selectedContact}
      />

      <div className="contactComponentBody">
        {contactList.map((contact) => (
          <ContactComponent
            key={contact._id}
            name={contact.name}
            surName={contact.surName}
            email={contact.email}
            phoneNumber={contact.phoneNumber}
            isSelected={
              selectedContact != null && selectedContact.id === contact._id
            }
            selectEdit={() => selectEdit(contact._id)}
            handleDelete={() => handleDelete(contact._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default AddressBook;
