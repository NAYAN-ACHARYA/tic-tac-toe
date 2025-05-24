import React from "react";
const Round=({setGameStarted,setGrid,setCurrentPlayer,setWinner,setEmojiPositions})=>{
    const handleResetGame=()=>{
        setGrid(Array(9).fill(null)); // Reset the grid
        setGameStarted(false); // Reset the game state
        setCurrentPlayer(0); // Reset the current player
        setWinner(null); // Reset the winner
        setEmojiPositions({ 0: [], 1: [] }); // Reset emoji positions
    }
    const handleResetRound=()=>{
        setGrid(Array(9).fill(null)); // Reset the grid for the current round
        setCurrentPlayer(0); // Reset the current player for the new round
        setWinner(null); // Reset the winner for the new round
        setEmojiPositions({ 0: [], 1: [] }); // Reset emoji positions for the new round
    }
    return (
        <div className="round">
        <h2>Round Component</h2>
        <button className="round-button" onClick={handleResetRound}>Reset current round</button>
        <button className="round-button" onClick={handleResetGame}>exit to homepage</button>
        </div>
    );
}
export default Round;