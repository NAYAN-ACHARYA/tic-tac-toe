import React from "react";
import "./WinnerBanner.css"; // Import the CSS file

const WinnerBanner = ({ winner }) => {
  return winner !== null ? (
    <div className="winner-banner">🎉 {winner} Wins this round! 🎉</div>
  ) : null;
};


export default WinnerBanner;
