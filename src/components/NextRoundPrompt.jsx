// src/components/NextRoundPrompt.jsx
import React from "react";

export default function NextRoundPrompt({ winner, onNextRound }) {
  return (
    <div className="mb-4">
      <p className="mb-2">Player {winner + 1} wins this round!</p>
      <button
        onClick={onNextRound}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Next Round
      </button>
    </div>
  );
}
