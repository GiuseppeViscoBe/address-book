import "./../App.css";


function Contact({name,surName,email,phoneNumber,handleDelete,selectEdit,isSelected}) {
    return (
      <div className="contact">
          <ul>
            <li>{name}</li>
            <li>{surName}</li>
            <li>{email}</li>
            <li>{phoneNumber}</li>
          </ul>
          <button className="delete" onClick = {handleDelete} disabled={isSelected}>Delete</button>
          <button className="edit" onClick={selectEdit}>Edit</button>
      </div>
    );
  }
  
  export default Contact;


  