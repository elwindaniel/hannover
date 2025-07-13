'use client'
import React, { useState, useEffect } from 'react';
import '@/styles/tickets.css';
import { adminTickets, deleteTicketByTicketNo } from '@/services/auth';

function Tickets() {
  const [openList, setOpenList] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggle = (id) => {
    setOpenList(openList === id ? null : id);
  };

  useEffect(() => {
    fetchTicket();
  }, [loading]);

  const fetchTicket = async () => {
    try {
      const response = await adminTickets();
      if (response) {
        setData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching tickets:", error);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        {/* <div className="loader">Loading...</div> */}
      </div>
    );
  }

  const DeleteTicket = async (ticket) => {
    if (window.confirm(`Are you sure you want to delete ticket number ${ticket.ticketNo}?  status : ${ticket.status}`)) {
      setLoading(true);
      try {
        const deleteData = await deleteTicketByTicketNo(ticket.ticketNo);
        setLoading(false);
        // Optionally, you could trigger a refresh of the ticket list after deletion
        fetchTicket();
      } catch (error) {
        setLoading(false);
        console.error("Error deleting ticket:", error);
      }
    }
  }

  return (
    <div className="tickets-container">
      <h1 style={{ color: "#fff" }}>Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Ticket No</th>
            <th>Status</th>
            <th>Total</th>
            <th>No</th>
            <th>Address</th>
            <th>List</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.ticketNo}</td>
              <td>{ticket.status}</td>
              <td>{ticket.total}</td>
              <td>{ticket.list.length}</td>
              <td>{`${ticket.address.addressLine}, ${ticket.address.street}, ${ticket.address.postcode}`}</td>
              <td>
                <button onClick={() => handleToggle(ticket._id)} className="toggle-button">
                  {openList === ticket._id ? 'Hide List' : 'Show List'}
                </button>
                {openList === ticket._id && (
                  <ul className="ticket-list">
                    {ticket.list.map(item => (
                      <li key={item._id}>{`${item.name} (Age: ${item.age}, Price: ${item.price})`}</li>
                    ))}
                  </ul>
                )}
              </td>
              <td><button onClick={() => DeleteTicket(ticket)}>Del</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tickets;
