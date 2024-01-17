import { events } from '../assets/Events';

// cache to dom
const messages = document.querySelector('.messages');

// custom event binding
events.on('change placement message', placementMessage);
events.on('ready fire message', readyFireMessage);
events.on('player hit status message', playerHitMessage);
events.on('player miss', playerMissMessage);
events.on('computer shot message', computerShotMessage);
events.on('player won', playerWinMessage);
events.on('computer won', computerWinMessage);

// methods
export default function placementMessage(boat) {
  messages.innerHTML = `
    <h2>Now place your ${boat.toUpperCase()}</h2>
    <p>(toggle 'v' for vertical and 'h' for horizontal)</p>
    `;
}

export function readyFireMessage() {
  messages.innerHTML = `
    <h2>🔫 Fire when ready... 🔫</h2>
    `;
}

export function playerHitMessage(status) {
  const boat = getBoat(status.boat);
  const sunkStatus = status.isSunk ? 'sunk' : 'hit';
  messages.innerHTML = `
    <h2>💥 You ${sunkStatus} the enemy's ${boat}! 💥</h2>
    <p>Fire again when ready...</p>
    `;
}

function getBoat(symbol) {
  if (symbol === 'C') {
    return 'CARRIER';
  }
  if (symbol === 'B') {
    return 'BATTLESHIP';
  }
  if (symbol === 'D') {
    return 'DESTROYER';
  }
  if (symbol === 'S') {
    return 'SUBMARINE';
  }
  if (symbol === 'P') {
    return 'PATROL';
  }
}

export function playerMissMessage() {
  messages.innerHTML = `
    <h2>You shot and missed!</h2>
    <p>Opponent is sending a volley...</p>
    `;
}

export function computerShotMessage() {
  messages.innerHTML = `
    <h2>Your opponent has fired their shots!</h2>
    <p>🔫 Fire when ready... 🔫</p>
    `;
}

export function playerWinMessage() {
  messages.innerHTML = `
    <h2>👑 Congrats, you sunk all the enemy ships and won the battle! 👑</h2>
    <p>Refresh the browser to play again.</p>
    `;
}

export function computerWinMessage() {
  messages.innerHTML = `
    <h2>💀 Your opponent sunk all your ships, you lost the battle! 💀</h2>
    <p>Refresh the browser to play again.</p>
    `;
}
