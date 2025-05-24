import React from "react";
import "./WinnerBanner.css"; // Import the CSS file

const WinnerBanner = ({ winner }) => {
  return winner !== null ? (
    <h2 className="winner-banner">🎉 Player {winner + 1} Wins! 🎉</h2>
  ) : null;
};

export default WinnerBanner;
