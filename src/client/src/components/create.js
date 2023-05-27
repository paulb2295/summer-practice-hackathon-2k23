import React, { useState } from "react";
import { useNavigate } from "react-router";


function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   code: randomNumberInRange(100000, 999999),
   
 });
 const navigate = useNavigate();

 function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
//  submission
async function onSubmit(e) {
    e.preventDefault();
  
    // new record to the database
    const newMfa = { ...form };
  
    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMfa),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setForm({ name: "", code: "" });
    navigate("/");
  }
  
  // html
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            className="form-control"
            id="code"
            value={form.code}
            onChange={(e) => updateForm({ code: e.target.value })}
          />
        </div>
        
        
        
        <div className="form-group">
          <input
            type="submit"
            value="Create MFA"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}