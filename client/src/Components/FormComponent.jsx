import { useState } from "react";
import "./../App.css";

function Form({ handleInputChange, handleSubmit, formData,selectedContact }) {
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Insert name..."
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            type="text"
            name="surName"
            placeholder="Insert surname..."
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
            placeholder="Insert email..."
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            placeholder="Insert phone number..."
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
