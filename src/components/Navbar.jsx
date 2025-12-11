// components/Navbar.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { auth } from "../firebase/auth";

export default function Navbar() {
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setMenuOpen(false);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Mobile menu portal - only render on mobile when menu is open
  const menuPortal = menuOpen && window.innerWidth <= 768 && ReactDOM.createPortal(
    <>
      <div className="nav-overlay" onClick={() => setMenuOpen(false)}></div>
      <div className={`nav-menu active`}>
        <div className="nav-links">
          <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          {currentUser && <Link to="/send" onClick={() => setMenuOpen(false)}>💬 Send</Link>}
          {currentUser && currentUser.uid === "A96mgtRfFYM2rZvw81INwwEobq03" && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>👨‍💼 Admin</Link>
          )}
        </div>

        <div className="nav-auth">
          {currentUser ? (
            <>
              <span className="user-email">{currentUser.email}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <>
      {menuPortal}
      
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            💬 Anonymous
          </Link>
          
          <button 
            className="menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop menu - always visible on desktop */}
          <div className="nav-menu">
            <div className="nav-links">
              <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
              {currentUser && <Link to="/send" onClick={() => setMenuOpen(false)}>💬 Send</Link>}
              {currentUser && currentUser.uid === "A96mgtRfFYM2rZvw81INwwEobq03" && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>👨‍💼 Admin</Link>
              )}
            </div>

            <div className="nav-auth">
              {currentUser ? (
                <>
                  <span className="user-email">{currentUser.email}</span>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
