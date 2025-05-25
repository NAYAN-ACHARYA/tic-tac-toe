// src/components/HelpModal.jsx
import React from "react";
import "./HelpModal.css"; // Optional: if you want to keep styles separate

export default function HelpModal({ onClose }) {
  return (
    <div className="help-modal">
      <div className="help-content">
        <button className="close-button" onClick={onClose}>
          ❌
        </button>
        <h2>How to Play</h2>
        <ul>
          <li>Enter your name and pick a category + emoji.</li>
          <li>Take turns placing your emoji on the board.</li>
          <li>Each player can only have 3 emojis at a time.</li>
          <li>Get 3 in a row to win (horizontal, vertical, or diagonal).</li>
          <li>Click "Next Round" to continue playing!</li>
        </ul>
      </div>
    </div>
  );
}
