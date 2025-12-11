// pages/Send.jsx
import React, { useState } from "react";
import { db } from "../firebase/db";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";

export default function Send() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const messagesCollection = collection(db, "messages");
      await addDoc(messagesCollection, {
        text: message.trim(),
        timestamp: serverTimestamp(),
      });
      setSuccess("Message sent successfully!");
      setMessage("");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.error("Error sending message:", err);
      // Show specific Firebase error messages
      if (err.code === 'permission-denied') {
        setError("Permission denied. Please check Firestore security rules.");
      } else if (err.code === 'not-authenticated') {
        setError("You must be logged in to send messages.");
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="send-message-box">
        <h1>Send Anonymous Message</h1>
        <p className="subtitle">Share your thoughts anonymously. Only the admin can see your message.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSend}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows="6"
            className="message-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
