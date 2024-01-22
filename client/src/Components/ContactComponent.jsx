
function Contact({name,surName,email,phoneNumber,handleDelete,selectEdit,isSelected}) {
    return (
      <div className="App">
          <ul>
            <li>{name}</li>
            <li>{surName}</li>
            <li>{email}</li>
            <li>{phoneNumber}</li>
          </ul>
          <button onClick = {handleDelete} disabled={isSelected}>Delete</button>
          <button onClick={selectEdit}>Edit</button>
      </div>
    );
  }
  
  export default Contact;


  