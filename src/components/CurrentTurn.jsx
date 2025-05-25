import React from "react";
import "./CurrentTurn.css";

const CurrentTurn = ({ players, currentPlayer }) => {
  return (
    <div className="current-turn-wrapper">
      <div className="current-turn">
        Current Turn: {players[currentPlayer]?.name || "Player"}
      </div>
    </div>
  );
};

export default CurrentTurn;
