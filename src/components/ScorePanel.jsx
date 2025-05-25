import React from "react";
import "./ScorePanel.css";

const ScorePanel = ({ players, scores }) => {
  return (
    <div className="score-panel">
      <h2>
        {players[0]?.name || "Player 1"} Score: {scores[0]} <br />
        {players[1]?.name || "Player 2"} Score: {scores[1]}
      </h2>
    </div>
  );
};

export default ScorePanel;
