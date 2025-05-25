// src/components/NextRoundPrompt.jsx
import React from "react";
import "./NextRoundPrompt.css";

export default function NextRoundPrompt({ winner, onNextRound }) {
  return (
    <div className="next-round-wrapper">
      <div className="next-round-container spooky-theme">
        <p className="winner-message">{winner} wins this round!</p>
        <button className="next-round-button" onClick={onNextRound}>
          Next Round
        </button>
      </div>
    </div>
  );
}
