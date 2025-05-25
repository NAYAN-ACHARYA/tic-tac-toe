# Emoji Tic Tac Toe

**Live Demo:** [https://your-live-demo-link.com](https://your-live-demo-link.com)

## Tech Stack  
This game is built with **React** to provide a smooth and interactive experience for players.

## Emoji Categories  
Players can pick emojis from these fun categories:

- **Animals:** 🐶 🐱 🐵 🐰 🐸 🐼 🦁 🐯  
- **Food:** 🍕 🍟 🍔 🍩 🍣 🍎 🍪 🍇  
- **Sports:** ⚽️ 🏀 🏈 🎾 🏓 🏸 🥊 ⛳️  
- **Space:** 🚀 🛸 🛰️ 🌌 👨‍🚀 🌠 🪐 🔭  
- **Fantasy:** 🧙‍♂️ 🐉 🧝‍♀️ 🧚‍♂️ 🪄 🦄 👑 🧞‍♂️  
- **Halloween:** 🎃 👻 🧛‍♂️ 🧟 🕸️ 🧙‍♀️ 🕷️ ☠️  
- **Nature:** 🌳 🌲 🍁 🌸 🌞 🌧️ 🔥 ❄️  

## How the Vanishing Emoji Feature Works

To keep the game balanced and fun, each player can only have **three emojis** on the board at the same time. Here’s how it’s done:

- The app keeps track of where each player's emojis are on the grid using a simple state object, like this:

  ```js
  const [emojiPositions, setEmojiPositions] = useState({ 0: [], 1: [] });
  ```

  This stores the positions of the emojis for both players (player 0 and player 1).

- When a player tries to place a new emoji and they already have three emojis on the board, the game automatically removes their **oldest** emoji before adding the new one.

- The removal is handled with this logic:

  ```js
  if (playerPositions.length === 3) {
    const oldestIndex = playerPositions.shift();  // Remove the first (oldest) emoji position
    updatedGrid[oldestIndex] = null;              // Clear that emoji from the grid
  }
  ```

- After that, the new emoji is placed on the chosen cell, and the position is added to the player’s list.

This way, the board never gets overcrowded, and players need to think strategically about their moves because their earliest emoji will vanish as soon as they place a fourth.

This mechanic keeps the game fresh and adds an interesting twist to the classic tic-tac-toe.

## Additional Features  
- Background music and celebration sounds bring energy and excitement to the game.  
- Smooth animations with a spooky and stylish vibe make the experience even more engaging.  

## What I’d Improve with More Time  
- Add online multiplayer so friends can play remotely.  
- Build a replay or undo feature to let players review or fix moves.  
- Expand emoji categories and allow players to customize their themes.  
- Improve mobile responsiveness and accessibility to reach more players.
