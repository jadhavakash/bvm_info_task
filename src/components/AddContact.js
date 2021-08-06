import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [term,setTerm] = useState(false);
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  //   console.log(contacts);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );

    const checkNumber = contacts.find(
      (contact) => contact.number === parseInt(number)
    );

    
    // console.log(checkNumber);

    if (!name || !email || !number || !gender  ) {
      return toast.warning("Please fill all details!");
    }

    if (checkEmail) {
      return toast.error("Email already Exists!");
    }
    if (checkNumber) {
      return toast.error("This Number already Exists!");
    }

    
    const data = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      number,
      gender,
      
    };
    console.log(data);
    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("Students added succesfully");
    history.push("/");
  };

  return (
    <div className="container">
      <h1 className="display-3 my-5 text-center">Add Contact</h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group  mb-2">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group  mb-2">
              <input
                className="form-control"
                type="number"
                placeholder="Phone"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="flexRadioDefault1"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "Male"}
                />
                <label className="form-check-label" for="gender">
                  Male
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="flexRadioDefault2"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "Female"}
                />
                <label className="form-check-label" for="gender">
                  Female
                </label>
              </div>
            </div>
            <div className="form-group form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="I agree to Terms "
                  name="term"
                  id="flexCheckIndeterminate"
                  required
                />
                <label className="form-check-label">Accept Terms & Conditions</label>
            </div>
            <div className="form-group mb-2">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Student"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
