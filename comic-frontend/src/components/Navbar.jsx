import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: "linear-gradient(to right, #141e30, #243b55)",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff"
    }}>
      <h2 style={{ margin: 0 }}>WordToon</h2>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/create" style={linkStyle}>Create Comic</Link>
        <Link to="/mycomics" style={linkStyle}>My Comics</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  marginLeft: "1rem",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold"
};
