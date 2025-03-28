import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Hamburger Icon */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      {isOpen && (
        <>
          <div className="sidebar">
            <h2>Admin Menu</h2>
            <ul>
              <li><Link to="/admin" onClick={toggleSidebar} className="sidebar-link">Game Manager</Link></li>
              <li><Link to="/admin/data" onClick={toggleSidebar} className="sidebar-link">Database</Link></li>
            </ul>
          </div>

          {/* Overlay */}
          <div className="overlay" onClick={toggleSidebar}></div>
        </>
      )}
    </div>
  );
}

export default Sidebar;