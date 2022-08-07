import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PhoneInput from "react-phone-input-2";
import { useParams ,Navigate, Route} from 'react-router-dom';
import "./Example.css";
import {Link} from "react-router-dom"; 
import Api from '../../Api';

function Example() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState();
  const [user, setUser] = useState(new Array());
 const [modal,setModal]=useState("");

 const params=useParams();
 var user_id=params.id;
 console.log(user_id)
 
const handleUpdate=(e)=>{
   e.preventDefault();
  var body={}
  body.firstName=firstName;
  body.lastName=lastName;
  body.phoneNumber=modal;

  fetch(`${Api}Update/${user_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
}).then((res) => res.json())
.then((json) => {
  console.log("json",json)
  if(json.success == 1)
  {    
    alert("Successfully Updated")
   return window.open("/")
  }
  }  )
.catch((error) => console.log(error));

}
  useEffect(() => {
  fetch(`${Api}edit/${user_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json"
  },
  }).then((res) => res.json())
  .then((json) => {setFirstName(json.data.firstName)
                   setlastName(json.data.lastName)
                   setModal(json.data.phoneNumber)
    }  )
  .catch((error) => console.log(error));
}, []);
  return (

     <div className="form">
      <div className="contact-form">
        <div>
        <Link className='btn btn-warning' to={`/`}>
                 <button>Back</button>
                  
                  </Link>
        </div>
        <form className="form-list">
          <div className="nested-import">
            <h4>Edit Contact !</h4>
          </div>

          <input
            type="text"
            placeholder="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            value={lastName}
            placeholder="lastname"
            onChange={(e) => {
              setlastName(e.target.value);
            }}
          />
          <PhoneInput            
            className="phone"
            value={modal}
            onChange={(value)=>setModal(value)}
            placeholder="Enter Phone Number"
          />
          <button type='Submit' onClick={handleUpdate}>Update</button>
          </form>
          </div>
          </div>
  )
}

   
          
  //  )
  //         }
export default Example;