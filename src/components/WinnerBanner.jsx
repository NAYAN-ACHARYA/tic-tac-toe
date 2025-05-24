import React from "react";
import "./WinnerBanner.css"; // Import the CSS file

const WinnerBanner = ({ winner }) => {
  return winner !== null ? (
    <h2 className="winner-banner">🎉  {winner} Wins! this round🎉</h2>
  ) : null;
};

export default WinnerBanner;
