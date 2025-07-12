"use client";
import { createEventUser } from "@/services/eventUser";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

function UserForm() {
  const router = useRouter();

  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const submitBtnRef = useRef(null);

  const ticketInfoChange = (e) => {
    const { id, value } = e.target;
    setTicketForm({ ...ticketForm, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Clear the error message for the current input
  };

  const validateForm = () => {
     let formErrors = {};
   let isValid = true;

    if (!ticketForm.name) {
      formErrors.name = "Name is required";
      isValid = false;
     }

   if (!ticketForm.email) {
     formErrors.email = "Email is required";
     isValid = false;
   } else if (!/\S+@\S+\.\S+/.test(ticketForm.email)) {
     formErrors.email = "Email is invalid";
     isValid = false;
   }

   if (!ticketForm.phone) {
     formErrors.phone = "Phone number is required";
     isValid = false;
   } else if (!/^\d/.test(ticketForm.phone)) { // Modified regex to ensure exactly 10 digits
     formErrors.phone = "Phone number should be exactly 10 digits";
       isValid = false;
     }

     setErrors(formErrors);
     return isValid;
   };

  const addTicket = async (e) => {
    let formErrors = {};

  
    if (validateForm()) {
      setIsLoading(true);

      try {
        setIsLoading(true);
        const res = await createEventUser(ticketForm);
        router.push(`/buy-tickets/${res.data.data._id}`);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="box-title">Book your tickets now</div>
          <div>
            <input
              className="box-card"
              placeholder="Full Name"
              id="name"
              value={ticketForm.name}
              onChange={ticketInfoChange}
              ref={nameRef}
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>
          <div>
            <input
              className="box-card"
              placeholder="Email"
              id="email"
              type="email"
              value={ticketForm.email}
              onChange={ticketInfoChange}
              ref={emailRef}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>
          <div>
            <input
              className="box-card"
              placeholder="Phone number"
              id="phone"
              value={ticketForm.phone}
              onChange={ticketInfoChange}
              ref={phoneRef}
            />
            {errors.phone && (
              <span style={{ color: "red" }}>{errors.phone}</span>
            )}
          </div>
          <button
            className="box-card-btn"
            onClick={addTicket}
            ref={submitBtnRef}
          >
            Book Now
          </button>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default UserForm;
