import React from "react";
import "./CategorySelector.css"; // Import the styles

const CategorySelector = ({ playerIndex, category, selectedEmoji, onSelect }) => {
  const categories = {
    Animals: ["🐶", "🐱", "🐵", "🐰"],
    Food: ["🍕", "🍟", "🍔", "🍩"],
    Sports: ["⚽️", "🏀", "🏈", "🎾"],
  };

  return (
    <div className="category-selector">
      <h2 className="player-heading">Player {playerIndex + 1} - Choose Category</h2>
      <div className="button-group">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(playerIndex, cat)}
            className="category-button"
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="selected-emoji">
        Selected Emoji: {selectedEmoji || "❓"}
      </div>
    </div>
  );
};

export default CategorySelector;
