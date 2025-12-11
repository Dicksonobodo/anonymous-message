// components/MessageCard.jsx
import React from "react";

export default function MessageCard({ message }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "5px 0", borderRadius: "5px" }}>
      <p>{message.text}</p>
      <small>{message.timestamp?.toDate ? message.timestamp.toDate().toLocaleString() : "No timestamp"}</small>
    </div>
  );
}
