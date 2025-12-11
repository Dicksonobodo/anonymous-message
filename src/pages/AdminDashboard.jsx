import React, { useEffect, useState } from "react";
import { db } from "../firebase/db";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Loader from "../components/Loader";

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firestore query: order by timestamp descending
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));

    // real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setLoading(false);
    });

    // clean up listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <div style={{ 
        maxWidth: "800px", 
        width: "100%", 
        background: "white", 
        borderRadius: "16px", 
        padding: "2.5rem", 
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" 
      }}>
        <h1 style={{ 
          color: "#1f2937", 
          marginBottom: "1rem", 
          fontSize: "2rem" 
        }}>
          👨‍💼 Admin Dashboard
        </h1>
        <p style={{ 
          color: "#6b7280", 
          marginBottom: "2rem", 
          fontSize: "0.95rem" 
        }}>
          All anonymous messages sent by users
        </p>

        {messages.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "3rem",
            color: "#6b7280"
          }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              No messages yet
            </p>
            <p style={{ fontSize: "0.9rem" }}>
              Messages will appear here once users start sending them
            </p>
          </div>
        ) : (
          <div>
            <p style={{ 
              marginBottom: "1.5rem", 
              color: "#6b7280", 
              fontSize: "0.9rem" 
            }}>
              Total messages: <strong>{messages.length}</strong>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  style={{
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                    <span style={{ 
                      display: "inline-block",
                      background: "#e0e7ff",
                      color: "#4f46e5",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}>
                      Message #{messages.length - index}
                    </span>
                    <small style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                      {msg.timestamp?.toDate
                        ? msg.timestamp.toDate().toLocaleString("en-US", { 
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : "No timestamp"}
                    </small>
                  </div>
                  <p style={{
                    color: "#1f2937",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    margin: 0,
                    wordBreak: "break-word"
                  }}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
