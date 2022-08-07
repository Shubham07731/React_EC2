import React, { useEffect } from "react";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Table from "react-bootstrap/Table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "@ant-design/icons";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Link} from "react-router-dom"; 
import Api from "../../Api";

import "./Form.css";
import { Button } from "reactstrap";

import axios from "axios";
import Example from "../Example/Example";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [user, setUser] = useState(new Array());
 const [modal,setModal]=useState(false);

 const [userId,setUserId]=useState("");

 const toggleModal=()=>{
  setModal(!modal)
 }


const deleteRow = (id)=>{
  var delete_action=prompt("Are You Sure you want to Delete");
  console.log("yes",delete_action.valueOf())
  if(delete_action.valueOf() =='yes' ||delete_action.valueOf() =='Yes')
  {

    fetch(`${Api}delete/${id}`,{
      method:'POST',
      headers: { "Content-Type": "application/json"
  }
    }).then((res)=>res.json())
    .then((json)=>{
      if(json.success==1)
      {
        alert("Deleted Successfully")
       return window.open("/")
      }
    })
    .catch((error)=>console.log(error))
  }
  else{
console.log("No Id")
  }

}
  const setVcardData = (event) => {
    //     var splits=e.split('fakepath\\')
    // console.log("E",JSON.stringify(splits[1]))

    var input = event.target;

    var fname = /FN:(.*)/g;
    var org = /ORG:(.*)/g;
    var tel = /TEL;[^:]*:(.*)/g;

    var reader = new FileReader();
    reader.onload = function () {
      var text = reader.result;
      var fullname = fname.exec(text);
      var Phone = tel.exec(text);
      //   fullname=fullname[1];

      console.log("name", fullname[1]);
      const Fname = fullname[1].split(" ");
      setFirstName(Fname[0]);
      setlastName(Fname[1]);
      setphoneNumber(Phone[1].trim());
      console.log("phone", Phone[1].trim());
    };
    reader.readAsText(input.files[0]);
  };
 


  React.useEffect(() => {
    fetch(`${Api}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json().then((json) => 
    
    setUser(json.data)));
  }, []);
  console.log("user", user);

  function handleSubmit(e) {
    e.preventDefault();
    var bodyObj = {};
    bodyObj.firstName = firstName;
    bodyObj.lastName = lastName;
    bodyObj.phoneNumber = phoneNumber;
    console.log(bodyObj);

    fetch(`${Api}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj),
    })
      .then((res) => res.json())
      .then((json) => {
        alert(json.data)
       window.open("/")
  })
      .catch((error) => console.log(error));
  }

  return (
    <div className="form">
      <div className="contact-form">
        <div className="vcard-container">
          <label>Import Contact</label>{" "}
          <input
            type="file"
            className="vcard"
            accept=" text/x-vcard"
            onChange={(e) => setVcardData(e)}
          />
        </div>
        <form className="form-list">
          <div className="nested-import">
            <h4>Add Contact !</h4>
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
            value={phoneNumber}
            onChange={(value)=>setphoneNumber(value)}
            placeholder="Enter Phone Number"
          />
          <button className="btns-form" onClick={handleSubmit} type="submit">
            submit
          </button>
          <div id="output"></div>
        </form>
      </div>
      <div className="buttons">
        <div className="nested-buttons"></div>
        
        
        <table >
        <thead className="thead-dark">
        <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">last Name</th>
              <th scope="col">Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.length !== 0? (user.map((users,index)=>{
                 return <tr  key={index+1}>
                  <th scope="row">{index + 1}</th>
                <td>{users.firstName}</td>
                <td>{users.lastName}</td>
                <td>{users.phoneNumber}</td>
      <td>
        
      <Link onClick={toggleModal} to={`/edit/${users._id}`}>
                 
<EditOutlined />
                  </Link>
                  <DeleteOutlined onClick={()=>deleteRow(users._id)}/>
                 {/* <Link to={`/delete/${users._id}`onClick={}}><DeleteOutlined /></Link>  */}
                 
                  

      </td>                 
              </tr>
            })):"Loading..."}
          </tbody>
          </table>

      </div>
      
 
     
    </div>
  );
};

export default Form;
