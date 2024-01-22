import { useState } from "react";

function Form({ handleInputChange, handleSubmit, formData,selectedContact }) {
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            name="name"
            placeholder="add item..."
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Cognome:
          <input
            type="text"
            name="surName"
            placeholder="Inserisci il cognome..."
            value={formData.surName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="text"
            name="email"
            placeholder="Inserisci l'email..."
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Numero di Telefono:
          <input
            type="text"
            name="phoneNumber"
            placeholder="Inserisci il numero di telefono..."
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">{selectedContact ? 'Save' : 'Add'} Contact</button>
      </form>
    </div>
  );
}

export default Form;
