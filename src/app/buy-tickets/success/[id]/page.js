"use client";
import React, { useEffect, useState } from "react";
import { getSessionStorage } from "@/utils/sessionStorageUtil";
import { getTicketByUserId } from "@/services/eventUser";
import { FaChild } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";

export default function PaymentSuccess() {
    const params = useParams();
  const [ticketPriceList, setTicketPriceList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const userId = getSessionStorage("userId");
    console.log(userId);
    fetchTicket(userId);
  }, []);


  const fetchTicket = async (id) => {
    try {
      const response = await getTicketByUserId(params.id);
      if (response) {
        console.log(response.data.data)
        setTicketPriceList(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching event pricing:", error);
    }
  };


  return (
    <div className="white-box">
      <div className="box-title">Booked Tickets </div>
      <div className="box-title">Ticket No : {ticketPriceList?.ticketNo} </div>
      {ticketPriceList?.list?.length > 0 &&
        ticketPriceList.list.map((ticket, index) => (
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
          </div>
        ))}
      <div style={{ height: "16px" }}></div>
    </div>
  );
}
