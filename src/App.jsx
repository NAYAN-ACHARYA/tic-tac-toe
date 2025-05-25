import React, { useState, useRef } from "react";
import CategorySelector from "./components/CategorySelector";
import EmojiGrid from "./components/EmojiGrid";
import WinnerBanner from "./components/WinnerBanner";
import Round from "./components/Round";
import NextRoundPrompt from "./components/NextRoundPrompt";
import Slideshow from "./slide.jsx";
import bgm from "/images/got.mp3";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./App.css";
import ScorePanel from "./components/ScorePanel";
import CurrentTurn from "./components/CurrentTurn.jsx";

const categories = {
  Animals: ["🐶", "🐱", "🐵", "🐰", "🐸", "🐼", "🦁", "🐯"],
  Food: ["🍕", "🍟", "🍔", "🍩", "🍣", "🍎", "🍪", "🍇"],
  Sports: ["⚽️", "🏀", "🏈", "🎾", "🏓", "🏸", "🥊", "⛳️"],
  Space: ["🚀", "🛸", "🛰️", "🌌", "👨‍🚀", "🌠", "🪐", "🔭"],
  Fantasy: ["🧙‍♂️", "🐉", "🧝‍♀️", "🧚‍♂️", "🪄", "🦄", "👑", "🧞‍♂️"],
  Halloween: ["🎃", "👻", "🧛‍♂️", "🧟", "🕸️", "🧙‍♀️", "🕷️", "☠️"],
  Nature: ["🌳", "🌲", "🍁", "🌸", "🌞", "🌧️", "🔥", "❄️"],
};

const getRandomEmoji = (category) => {
  const options = categories[category];
  return options[Math.floor(Math.random() * options.length)];
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [players, setPlayers] = useState([
    { name: "", category: null, emojis: [], selectedEmoji: null },
    { name: "", category: null, emojis: [], selectedEmoji: null },
  ]);
  const [startingPlayer, setStartingPlayer] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [emojiPositions, setEmojiPositions] = useState({ 0: [], 1: [] });
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ 0: 0, 1: 0 });
  const [showNextRoundPrompt, setShowNextRoundPrompt] = useState(false);

  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        audio.play();
      } else {
        audio.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleCategorySelect = (playerIndex, category) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].category = category;
    updatedPlayers[playerIndex].selectedEmoji = getRandomEmoji(category);
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    if (
      players[0].category &&
      players[1].category &&
      players[0].name &&
      players[1].name
    ) {
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
      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }));
      setShowNextRoundPrompt(true);
    } else {
      setCurrentPlayer((currentPlayer + 1) % 2);
    }
  };

  const handleNextRound = () => {
    setGrid(Array(9).fill(null));
    setEmojiPositions({ 0: [], 1: [] });
    setWinner(null);
    setShowNextRoundPrompt(false);
    const nextStartingPlayer = (startingPlayer + 1) % 2;
    setStartingPlayer(nextStartingPlayer);
    setCurrentPlayer(nextStartingPlayer);
  };

  return (
    <>
      <Slideshow />

      <audio ref={audioRef} src={bgm} autoPlay loop />
      <button onClick={toggleMusic} className="volume-button">
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      <div className="p-4 max-w-xl mx-auto text-center">
        {!gameStarted ? (
          <>
            <h1 className="cartoon-heading">Emoji Tic Tac Toe</h1>

            <div className="player-selectors-row">
              {[0, 1].map((playerIndex) => (
                <CategorySelector
                  key={playerIndex}
                  playerIndex={playerIndex}
                  category={players[playerIndex].category}
                  selectedEmoji={players[playerIndex].selectedEmoji}
                  playerName={players[playerIndex].name}
                  onNameChange={(index, name) => {
                    const updatedPlayers = [...players];
                    updatedPlayers[index].name = name;
                    setPlayers(updatedPlayers);
                  }}
                  onSelect={handleCategorySelect}
                />
              ))}
            </div>

            <div className="start-button-container">
              <button
                className="start-game-button"
                disabled={
                  !players[0].category ||
                  !players[1].category ||
                  !players[0].name ||
                  !players[1].name
                }
                onClick={handleStartGame}
              >
                Start Game
              </button>
            </div>
          </>
        ) : (
          <div className="game-container">
            <WinnerBanner
              winner={winner !== null ? players[winner].name : null}
            />

            <div style={{ height: "20px" }} />

            <div className="game-row">
              <ScorePanel players={players} scores={scores} />
              <div style={{ width: "16px" }} />
              <EmojiGrid grid={grid} onCellClick={handleCellClick} />
              <div style={{ width: "16px" }} />
              <div className="game-controls">
                {winner === null ? (
                  <CurrentTurn
                    players={players}
                    currentPlayer={currentPlayer}
                  />
                ) : (
                  showNextRoundPrompt && (
                    <NextRoundPrompt
                      winner={players[winner].name}
                      onNextRound={handleNextRound}
                    />
                  )
                )}
              </div>
            </div>

            <div style={{ height: "30px" }} />

            <Round
              setGameStarted={setGameStarted}
              setGrid={setGrid}
              setCurrentPlayer={setCurrentPlayer}
              setWinner={setWinner}
              setEmojiPositions={setEmojiPositions}
            />
          </div>
        )}
      </div>
    </>
  );
}
