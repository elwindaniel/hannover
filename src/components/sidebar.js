
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-title">Hannover Malayalis</div>
      <ul className="sidebar-menu">
        <li className="sidebar-item"><a href="/admin/dashboard/book-ticket">Book Tickets</a></li>
        <li className="sidebar-item"><a href="/admin/dashboard/users">Users</a></li>
        <li className="sidebar-item"><a href="/admin/dashboard/list-ticket">Booked Tickets</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
