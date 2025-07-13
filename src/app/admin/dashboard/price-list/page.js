 "use client"
import { getUsers } from '@/services/auth';
import '@/styles/users-list.css'; // Assuming you have your CSS file for styling
import React, { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from an API
    fetchTicket()
  }, []);

  const fetchTicket = async () => {
    try {
      const response = await getUsers()
      console.log(response)
      if (response) {
        setUsers(response.data.data);
        setLoading(false);
      }
    } catch (error) {
        setLoading(false);
      console.error("Error fetching event pricing:", error);
    }
  };
  if (loading) {
    return (
      <div className="loader-container">
        {/* <div className="loader">Loading...</div> */}
      </div>
    );
  }

  return (
    <div className="users-list">
      {users.map(user => (
        <div key={user.id} className="box-card" style={{justifyContent:"space-between", flexWrap:"wrap"}}>
         
            <div className="box-title">{user.name}</div>
            <div className="box-sub-text">{user.email}</div>
            <div className="box-sub-text">{user.phone}</div>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
