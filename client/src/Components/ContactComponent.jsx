import React from "react";
import "./../App.css";

function Contact({ name, surName, email, phoneNumber, handleDelete, selectEdit, isSelected }) {
  const buttonStyle = isSelected ? { backgroundColor: '#adb5bd' } : { backgroundColor: 'rgb(189, 59, 59)' };

  return (
    <div className="contact">
      <ul>
        <li>{name}</li>
        <li>{surName}</li>
        <li>{email}</li>
        <li>{phoneNumber}</li>
      </ul>
      <button className="delete" onClick={handleDelete} disabled={isSelected} style={buttonStyle}>
        Delete
      </button>
      <button className="edit" onClick={selectEdit}>
        Edit
      </button>
    </div>
  );
}

export default Contact;
