"use client";
import React, { useEffect, useState } from 'react';
import { useParams ,useRouter} from 'next/navigation';
import { buyEventTicket, getCartByUserId } from '@/services/eventUser';
import { FaChild } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { loadStripe } from '@stripe/stripe-js';
import { updateTicketPaymentWithTicketNoAdmin } from '@/services/auth';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function TicketPayment() {
  const { id } = useParams();
  const router = useRouter();
  const [ticketPriceList, setTicketPriceList] = useState();
  const [ticketForm, setTicketForm] = useState({
    addressLine: '',
    street: '',
    postcode: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCartByUserId(id);
      if (response) {
        setTicketPriceList(response.data.data);
        console.log(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching event pricing:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ticketForm.addressLine) newErrors.addressLine = 'Address Line is required';
    if (!ticketForm.street) newErrors.street = 'Street is required';
    if (!ticketForm.postcode) newErrors.postcode = 'Postcode is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const ticketInfoChange = (e) => {
    const { id, value } = e.target;
    setTicketForm((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (value) => {
    if (validateForm()) {
      setIsLoading(true);
      let ticketBody = {
        userId: id,
        address: ticketForm,
        cartId: ticketPriceList._id,
        status: "offline"
      };
      console.log(ticketBody)
      try {
        const ticket = await updateTicketPaymentWithTicketNoAdmin(ticketBody);
        if (ticket && ticket?.data) {
     
            router.push(`/admin/dashboard/list-ticket`);
       
            console.log("Offline payment selected.");
          
        } else {
          console.error("Error: sessionId not found in response");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="white-box">
        <div className="box-title">Pay Now</div>
      {ticketPriceList?.list?.length > 0 && ticketPriceList.list.map((ticket, index) => (
        <div key={index} className="box-card">
          <div className="box-icon">
            {ticket.age < 7 ? <FaChild /> : <BsFillPersonFill />}
          </div>
          <div className="box-text-area">
            <div className="box-sub-text">
              Name: <b>{ticket.name}</b>
            </div>
            <div className="box-sub-text">
              Age: <b>{ticket.age}</b>
              {ticket.age < 7 && <p>please bring proof of age</p>}
            </div>
          </div>
          <div className="box-price-area">
            <div className="box-sub-text">€ {ticket.price}</div>
          </div>
        
        </div>
      ))}
      <div style={{ height: "16px" }}></div>
      <div className="box-title" style={{ textAlign: "end" }}>Total Price: € {ticketPriceList?.total}</div>
      <div>
        <div className="box-title">Billing Address</div>
        <input
          className="box-card"
          placeholder="Address Line"
          id="addressLine"
          value={ticketForm.addressLine}
          onChange={ticketInfoChange}
        />
        {errors.addressLine && <div className="error-message">{errors.addressLine}</div>}
        <input
          className="box-card"
          placeholder="Street"
          id="street"
          value={ticketForm.street}
          onChange={ticketInfoChange}
        />
        {errors.street && <div className="error-message">{errors.street}</div>}
        <input
          className="box-card"
          placeholder="Postcode"
          id="postcode"
          value={ticketForm.postcode}
          onChange={ticketInfoChange}
        />
        {errors.postcode && <div className="error-message">{errors.postcode}</div>}
      </div>
      <div style={{ height: "16px" }}></div>
   
      <button className="box-card-btn" onClick={() => handleSubmit()}>
        {isLoading ? "Loading..." : "Book Now"}
      </button>
    </div>
  );
}

export default TicketPayment;
