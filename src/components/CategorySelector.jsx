import React from "react";
import "./CategorySelector.css";

const CategorySelector = ({
  playerIndex,
  category,
  selectedEmoji,
  onSelect,
  playerName,
  onNameChange,
  onEmojiSelect,
}) => {
  const categories = {
    Animals: ["🐶", "🐱", "🐵", "🐰", "🐸", "🐼", "🦁", "🐯"],
    Food: ["🍕", "🍟", "🍔", "🍩", "🍣", "🍎", "🍪", "🍇"],
    Sports: ["⚽️", "🏀", "🏈", "🎾", "🏓", "🏸", "🥊", "⛳️"],
    Space: ["🚀", "🛸", "🛰️", "🌌", "👨‍🚀", "🌠", "🪐", "🔭"],
    Fantasy: ["🧙‍♂️", "🐉", "🧝‍♀️", "🧚‍♂️", "🪄", "🦄", "👑", "🧞‍♂️"],
    Halloween: ["🎃", "👻", "🧛‍♂️", "🧟", "🕸️", "🧙‍♀️", "🕷️", "☠️"],
    Nature: ["🌳", "🌲", "🍁", "🌸", "🌞", "🌧️", "🔥", "❄️"],
  };

  return (
    <div className="category-selector">
      <h2 className="player-heading">Player {playerIndex + 1}</h2>

      <input
        type="text"
        placeholder={`Enter name for Player ${playerIndex + 1}`}
        value={playerName}
        onChange={(e) => onNameChange(playerIndex, e.target.value)}
        className="name-input mb-2 px-2 py-1 border rounded"
      />

      <p className="mb-1">Choose a category:</p>
      <div className="button-group">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(playerIndex, cat)}
            className={`category-button ${category === cat ? "selected" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {category && (
        <>
          <p className="mt-2">Pick your emoji:</p>
          <div className="emoji-grid">
            {categories[category].map((emoji) => (
              <button
                key={emoji}
                onClick={() => onEmojiSelect(playerIndex, emoji)}
                className={`emoji-button ${
                  selectedEmoji === emoji ? "selected-emoji-btn" : ""
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="selected-emoji mt-2">
        Selected Emoji: {selectedEmoji || "❓"}
      </div>
    </div>
  );
};

export default CategorySelector;
