import React, { useState } from "react";
import CategorySelector from "./components/CategorySelector";
import EmojiGrid from "./components/EmojiGrid";
import WinnerBanner from "./components/WinnerBanner";

const categories = {
  Animals: ["🐶", "🐱", "🐵", "🐰"],
  Food: ["🍕", "🍟", "🍔", "🍩"],
  Sports: ["⚽️", "🏀", "🏈", "🎾"],
};

const getRandomEmoji = (category) => {
  const options = categories[category];
  return options[Math.floor(Math.random() * options.length)];
};

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function EmojiTicTacToe() {
  const [players, setPlayers] = useState([
    { category: null, emojis: [], selectedEmoji: null },
    { category: null, emojis: [], selectedEmoji: null },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [emojiPositions, setEmojiPositions] = useState({ 0: [], 1: [] });
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleCategorySelect = (playerIndex, category) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].category = category;
    updatedPlayers[playerIndex].selectedEmoji = getRandomEmoji(category);
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    if (players[0].category && players[1].category) {
      setGameStarted(true);
    }
  };

  const checkWinner = (updatedGrid, emoji) => {
    return winningCombinations.some((combo) =>
      combo.every((i) => updatedGrid[i] === emoji)
    );
  };

  const handleCellClick = (index) => {
    if (!gameStarted || grid[index] || winner !== null) return;

    const playerEmoji = players[currentPlayer].selectedEmoji;
    const playerPositions = [...emojiPositions[currentPlayer]];

    if (playerPositions.length === 3 && playerPositions[0] === index) return;

    const updatedGrid = [...grid];

    if (playerPositions.length === 3) {
      const oldestIndex = playerPositions.shift();
      updatedGrid[oldestIndex] = null;
    }

    updatedGrid[index] = playerEmoji;
    playerPositions.push(index);

    setGrid(updatedGrid);
    setEmojiPositions({ ...emojiPositions, [currentPlayer]: playerPositions });

    if (checkWinner(updatedGrid, playerEmoji)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer((currentPlayer + 1) % 2);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      {!gameStarted ? (
        <>
          <h1 className="text-2xl mb-4">Emoji Tic Tac Toe</h1>
          {[0, 1].map((playerIndex) => (
            <CategorySelector
              key={playerIndex}
              playerIndex={playerIndex}
              category={players[playerIndex].category}
              selectedEmoji={players[playerIndex].selectedEmoji}
              onSelect={handleCategorySelect}
            />
          ))}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={!players[0].category || !players[1].category}
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </>
      ) : (
        <>
          <WinnerBanner winner={winner} />
          {winner === null && (
            <h2 className="mb-4">Current Turn: Player {currentPlayer + 1}</h2>
          )}
          <EmojiGrid grid={grid} onCellClick={handleCellClick} />
        </>
      )}
    </div>
  );
}
