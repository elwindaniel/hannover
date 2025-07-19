"use client";
import React, { useState, useEffect } from "react";
import { FaChild, FaTimesCircle } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import {
  createEventUserCart,
  getAllTicketByUserId,
  getEventPricing,
} from "@/services/eventUser";
import { useParams, useRouter } from "next/navigation";
import { setSessionStorage } from "@/utils/sessionStorageUtil";
import { Circles } from "react-loader-spinner";

function BuyTickets() {
  const params = useParams();
  const router = useRouter();
  const [ticketList, setTicketList] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketForm, setTicketForm] = useState({ name: "", age: "" });
  const [showForm, setShowForm] = useState(true);
  const [ticketPriceList, setTicketPriceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPricingLoading, setIsPricingLoading] = useState(true);

  useEffect(() => {
    fetchEventPricing();
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await getAllTicketByUserId(params.id);
      if (response) {
        console.log(response.data.data);
        setTickets(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching event pricing:", error);
    }
  };

  const fetchEventPricing = async () => {
    setSessionStorage("userId", params.id);

    try {
      const response = await getEventPricing();
      if (response) {
        setTicketPriceList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching event pricing:", error);
    } finally {
      setIsPricingLoading(false);
    }
  };

  const ticketInfoChange = (e) => {
    const { id, value } = e.target;
    setTicketForm((prevForm) => ({ ...prevForm, [id]: value }));
  };

  const addTicket = () => {
    const age = parseInt(ticketForm.age, 10);
    if (isNaN(age) || !ticketForm.name.trim()) {
      // Add appropriate validation error messages here
      return;
    }
    let price = 0;
    if (age <= ticketPriceList[0].age) {
      price = ticketPriceList[0].price;
    } else if (age <= ticketPriceList[1].age) {
      price = ticketPriceList[1].price;
    } else {
      price = ticketPriceList[2].price;
    }
    setTicketList((prevList) => [
      ...prevList,
      { name: ticketForm.name, age: ticketForm.age, price },
    ]);
    setTicketForm({ name: "", age: "" });
    setShowForm(false);
  };

  const removeTicket = (index) => {
    setTicketList((prevList) => prevList.filter((_, i) => i !== index));
    if (ticketList.length === 1) {
      setShowForm(true);
    }
  };

  const handleBuy = async () => {
    const dataForm = {
      list: ticketList,
      userId: params.id,
    };
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await createEventUserCart(dataForm);
        router.push(`/buy-tickets/${params.id}/payment`);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    return ticketList.length > 0;
  };

  const totalPrice = ticketList.reduce((sum, ticket) => sum + ticket.price, 0);

  return (
    <div className="buy-ticket-home">
      {isPricingLoading ? (
        <div className="loader-container">
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
        </div>
      ) : (
        <div className="white-box">
          {/* <div className="box-title">Sorry we are closed</div> */}
          {ticketList.length > 0 &&
            ticketList.map((ticket, index) => (
              <div key={index} className="box-card">
                <div className="box-icon">
                  {ticket.age < 12 ? <FaChild /> : <BsFillPersonFill />}
                </div>
                <div className="box-text-area">
                  <div className="box-sub-text">
                    Name: <b>{ticket.name}</b>
                  </div>
                  <div className="box-sub-text">
                    Age: <b>{ticket.age}</b>
                  </div>
                </div>
                <div className="box-price-area">
                  <div className="box-sub-text">€ {ticket.price}</div>
                </div>
                <div className="box-icon" onClick={() => removeTicket(index)}>
                  <FaTimesCircle size={20} />
                </div>
              </div>
            ))}
          {(ticketList.length === 0 || showForm) && (
            <div>
              <input
                className="box-card"
                placeholder="Full Name"
                id="name"
                value={ticketForm.name}
                onChange={ticketInfoChange}
              />
              <input
                className="box-card"
                placeholder="Age"
                id="age"
                value={ticketForm.age}
                onChange={ticketInfoChange}
              />
              <button className="box-card-btn" onClick={addTicket}>
                Add
              </button>
            </div>
          )}
          {ticketList.length > 0 && !showForm && (
            <div className="add-btn" onClick={() => setShowForm(true)}>
              <IoIosAddCircle size={25} /> Add
            </div>
          )}
          <div style={{ padding: "8px" }} />
          <div className="box-sub-text">Total Price: € {totalPrice}</div>
          {isLoading ? (
            <button className="box-card-btn">Loading...</button>
          ) : (
            <button className="box-card-btn" onClick={handleBuy}>
              Proceed
            </button>
          )}

<p style={{fontSize:"9px"}}>Please note that this purchase is non‑refundable.</p>        </div>
      )}
      <div>
        <div style={{ height: "16px" }}></div>
        <div className="white-box">
          <div className="box-title">Ticket list</div>
        </div>
        {tickets?.length > 0 &&
          tickets.map((ticket, index) => (
            <div
              className="white-box"
              style={{ marginTop: "16px" }}
              key={index}
            >
              <div>
                Ticket no : <b>{ticket?.ticketNo}</b>
              </div>
              <div>
                Status:{" "}
                {ticket?.status === "paid" ? "confirmed" : "payment is due"}
              </div>
              {ticket?.list?.length > 0 &&
                ticket.list?.map((tkt, idx) => (
                  <div key={idx} className="box-card">
                    <div className="box-icon">
                      {tkt.age < 7 ? <FaChild /> : <BsFillPersonFill />}
                    </div>
                    <div className="box-text-area">
                      <div className="box-sub-text">
                        Name: <b>{tkt.name}</b>
                      </div>
                      <div className="box-sub-text">
                        Age: <b>{tkt.age}</b>
                        {tkt.age < 7 && <p>please bring proof of age</p>}
                      </div>
                    </div>
                    <div className="box-price-area">
                      <div className="box-sub-text">€ {tkt.price}</div>
                    </div>
                  </div>
                ))}
    <p style={{fontSize:"9px"}}>Please note that this purchase is non‑refundable.</p>            </div>
          ))}
      </div>
    </div>
  );
}

export default BuyTickets;
