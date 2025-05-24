import React from "react";
import "./EmojiGrid.css";

const EmojiGrid = ({ grid, onCellClick }) => {
  return (
    <div className="grid">
      {grid.map((cell, index) => (
        <div
          key={index}
          className="cell"
          onClick={() => onCellClick(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default EmojiGrid;
