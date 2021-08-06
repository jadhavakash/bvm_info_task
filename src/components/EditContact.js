import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");

  const { id } = useParams();
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setNumber(currentContact.number);
      setGender(currentContact.gender);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.email === email && email
    );

    const checkNumber = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.number === parseInt(number)
    );

    console.log(checkNumber);

    if (!name || !email || !number) {
      return toast.warning("Please fill all details!");
    }

    if (checkEmail) {
      return toast.error("Email already Exists!");
    }
    if (checkNumber) {
      return toast.error("This Number already Exists!");
    }

    const data = {
      id: parseInt(id),
      name,
      email,
      number,
      gender,
    };
    console.log(data);
    dispatch({ type: "UPDATE_CONTACT", payload: data });
    toast.success("Students updated succesfully");
    history.push("/");
  };

  return (
    <div className="container">
      {currentContact ? (
        <>
          <h1 className="display-3 my-5 text-center">Edit Contact</h1>
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
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
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
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Female
                    </label>
                  </div>
                </div>
                <div className="form-group mb-2">
                  <span style={{fontWeight:"bold"}}>The Gender Is: {gender}</span>
                </div>
                <div className="form-group mb-2">
                  <input
                    className="btn btn-dark "
                    type="submit"
                    value="Edit Student"
                  />
                  <Link to="/" className="btn btn-danger m-3">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center">
          Student Record with id {id} does not exists
        </h1>
      )}
    </div>
  );
};

export default EditContact;
