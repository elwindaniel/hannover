"use client";
import React, { useEffect, useState } from "react";
import { getSessionStorage } from "@/utils/sessionStorageUtil";
import { getTicketByUserId, updateTicketPayment } from "@/services/eventUser";
import { FaChild } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useParams} from "next/navigation";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentCancelledPage() {
    const params = useParams();
    const router = useRouter();
  const [ticketPriceList, setTicketPriceList] = useState();
  const [errors, setErrors] = useState({});
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

  const handleSubmit = async (value) => {
    setIsLoading(true);
    let ticketBody = {
      status: value,
    };
    try {
      const ticket = await updateTicketPayment(ticketPriceList._id, ticketBody);
      if (ticket && ticket.data.data && ticket.data.data.url) {
        const { sessionId } = ticket.data.data.url;
        if (value === "online") {
          // Initialize Stripe payment
          const stripe = await stripePromise;
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) {
            console.error("Error redirecting to Stripe checkout:", error);
          }
        } else {
            router.push(`/buy-tickets/${ticket.data.data.url}`);
          console.log("Offline payment selected.");
        }
      } else {
        console.error("Error: sessionId not found in response");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="white-box">
      <div className="box-title">Buy Tickets</div>
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
            <div className="box-price-area">
              <div className="box-sub-text">€ {ticket.price}</div>
            </div>
          </div>
        ))}
      <div style={{ height: "16px" }}></div>
      <div className="box-title" style={{ textAlign: "end" }}>
        Total Price: € {ticketPriceList?.total}
      </div>
      <div style={{ height: "16px" }}></div>
      <button className="box-card-btn" onClick={() => handleSubmit("online")}>
        {isLoading ? "Loading..." : "Pay Now"}
      </button>
    </div>
  );
}
