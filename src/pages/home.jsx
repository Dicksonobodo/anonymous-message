// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <div className="hero-section">
        <h1>Anonymous Message Board</h1>
        <p className="lead">Share your thoughts, ideas, and feedback anonymously</p>

        <div className="features">
          <div className="feature-card">
            <h3>🔒 Completely Anonymous</h3>
            <p>Your identity is protected. Send messages without revealing who you are.</p>
          </div>
          <div className="feature-card">
            <h3>💬 Easy to Use</h3>
            <p>Simply sign in, write your message, and send. It's that simple.</p>
          </div>
          <div className="feature-card">
            <h3>✨ Secure</h3>
            <p>All messages are stored securely in our database.</p>
          </div>
        </div>

        <div className="cta-section">
          {currentUser ? (
            <>
              <p>Welcome back! Ready to send a message?</p>
              <Link to="/send" className="btn btn-primary btn-large">
                Send a Message
              </Link>
            </>
          ) : (
            <>
              <p>Get started by creating an account or logging in</p>
              <div className="button-group">
                <Link to="/register" className="btn btn-primary btn-large">
                  Create Account
                </Link>
                <Link to="/login" className="btn btn-secondary btn-large">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
