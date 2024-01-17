import { events } from '../assets/Events';

// state
const state = {
  player: {
    currentBoard: undefined,
    remainingShips: [
      ['battleship', 4],
      ['destroyer', 3],
      ['submarine', 3],
      ['patrol', 2],
    ],
    currentShip: ['carrier', 5],
    currentOrientation: 'v',
    squaresToRender: [],
  },

  computer: {
    currentBoard: undefined,
  },
};

// cache to dom
const playerFrame = document.querySelector('.player-frame');
const computerFrame = document.querySelector('.computer-frame');

// default event binding
window.addEventListener('keydown', orientationSwitch);

export function orientationSwitch(e) {
  if (e.key === 'v' || e.key === 'V') {
    state.player.currentOrientation = 'v';
    resetValidate();
  }
  if (e.key === 'h' || e.key === 'H') {
    state.player.currentOrientation = 'h';
    resetValidate();
  }
}

// custom event binding
events.on('init board placement', (player) => {
  state.player.currentBoard = player.playerBoard.board;
  renderBoard(playerFrame, player, placementCallback);
});

events.on('render attack board', (players) => {
  state.player.currentBoard = players[0].playerBoard.board;
  state.computer.currentBoard = players[1].playerBoard.board;

  renderBoard(playerFrame, players[0], disabledCallback);
  renderBoard(computerFrame, players[1], attackCallback);
});

events.on('player miss', (players) => {
  state.player.currentBoard = players[0].playerBoard.board;
  state.computer.currentBoard = players[1].playerBoard.board;

  renderBoard(playerFrame, players[0], disabledCallback);
  renderBoard(computerFrame, players[1], disabledCallback);
});

events.on('player won', (players) => {
  state.player.currentBoard = players[0].playerBoard.board;
  state.computer.currentBoard = players[1].playerBoard.board;

  renderBoard(playerFrame, players[0], disabledCallback);
  renderBoard(computerFrame, players[1], disabledCallback);
});

events.on('computer won', (players) => {
  state.player.currentBoard = players[0].playerBoard.board;
  state.computer.currentBoard = players[1].playerBoard.board;

  renderBoard(playerFrame, players[0], disabledCallback);
  renderBoard(computerFrame, players[1], disabledCallback);
});

// methods
export default function renderBoard(frame, player, listenerCallback) {
  frame.removeChild(frame.firstElementChild);

  const newBoard = document.createElement('div');
  newBoard.classList.add('board');
  newBoard.classList.add('grid');

  for (let i = 0; i < player.playerBoard.board.length; i += 1) {
    for (let j = 0; j < player.playerBoard.board.length; j += 1) {
      const newSquare = document.createElement('div');
      newSquare.setAttribute('data-index', `${i}${j}`);

      // changes depending on placement or attack phase
      listenerCallback(newSquare);

      // colour in placed squares
      if (frame === playerFrame) {
        if (player.playerBoard.board[i][j] !== '') {
          newSquare.classList.add('ship');
        }
      }

      // colour in hit and missed squares
      if (player.playerBoard.board[i][j] === 'x') {
        newSquare.classList.add('hit');
      }
      if (player.playerBoard.board[i][j] === 'o') {
        newSquare.classList.add('miss');
      }

      newBoard.appendChild(newSquare);
    }
  }

  frame.appendChild(newBoard);
}

// callback for board render in placement phase
function placementCallback(newSquare) {
  newSquare.addEventListener('mouseover', validatePlacement);
  newSquare.addEventListener('mouseout', removeCosmetics);
  newSquare.addEventListener('click', placeShip);
}

function validatePlacement(e) {
  const targetCoords = !Array.isArray(e)
    ? e.target
        .getAttribute('data-index')
        .split('')
        .map((str) => Number(str))
    : e;
  let validity = 'valid';

  if (state.player.currentOrientation === 'v') {
    if (targetCoords[0] + state.player.currentShip[1] > 10) {
      validity = 'invalid';
    }
    const col = targetCoords[1];
    for (
      let row = targetCoords[0];
      row < targetCoords[0] + state.player.currentShip[1] && row < 10;
      row += 1
    ) {
      state.player.squaresToRender.push([row, col]);
      if (state.player.currentBoard[row][col] !== '') {
        validity = 'invalid';
      }
    }
  }

  if (state.player.currentOrientation === 'h') {
    if (targetCoords[1] + state.player.currentShip[1] > 10) {
      validity = 'invalid';
    }
    const row = targetCoords[0];
    for (
      let col = targetCoords[1];
      col < targetCoords[1] + state.player.currentShip[1] && col < 10;
      col += 1
    ) {
      state.player.squaresToRender.push([row, col]);
      if (state.player.currentBoard[row][col] !== '') {
        validity = 'invalid';
      }
    }
  }

  renderValidity(validity);
}

function renderValidity(validity) {
  state.player.squaresToRender.forEach((coord) => {
    const square = document.querySelector(
      `[data-index='${coord[0]}${coord[1]}']`,
    );
    square.classList.add(validity);
  });
}

function removeCosmetics() {
  state.player.squaresToRender.forEach((coord) => {
    const square = document.querySelector(
      `[data-index='${coord[0]}${coord[1]}']`,
    );
    square.classList.remove('invalid');
    square.classList.remove('valid');
  });

  state.player.squaresToRender = [];
}

function resetValidate() {
  if (state.player.squaresToRender.length > 0) {
    const initCoord = state.player.squaresToRender[0];
    removeCosmetics();
    validatePlacement(initCoord);
  }
}

function placeShip(e) {
  if (e.target.getAttribute('class') === 'valid') {
    const placeCoord = e.target
      .getAttribute('data-index')
      .split('')
      .map((str) => Number(str));

    if (state.player.remainingShips.length > 0) {
      events.emit('place ship', {
        orientation: state.player.currentOrientation,
        coordArr: placeCoord,
        boat: state.player.currentShip[0],
        nextBoat: state.player.remainingShips[0][0],
      });

      state.player.currentShip = state.player.remainingShips.shift();
    } else if (state.player.remainingShips.length === 0) {
      events.emit('place final ship', {
        orientation: state.player.currentOrientation,
        coordArr: placeCoord,
        boat: state.player.currentShip[0],
      });

      window.removeEventListener('keydown', orientationSwitch);
    }
  }
}

// callback for player board render in attack phase
function disabledCallback(newSquare) {
  newSquare.style.cursor = 'auto';
}

// callback for computer board render in attack phase
function attackCallback(newSquare) {
  newSquare.addEventListener('mouseover', validateAttack);
  newSquare.addEventListener('mouseout', removeAttackCosmetics);
  newSquare.addEventListener('click', renderAttack);
}

function validateAttack(e) {
  const [row, col] = e.target
    .getAttribute('data-index')
    .split('')
    .map((str) => Number(str));

  if (
    state.computer.currentBoard[row][col] !== 'x' &&
    state.computer.currentBoard[row][col] !== 'o'
  ) {
    e.target.classList.add('available');
  }
}

function removeAttackCosmetics(e) {
  e.target.classList.remove('available');
}

function renderAttack(e) {
  if (e.target.getAttribute('class') === 'available') {
    const targetCoord = e.target
      .getAttribute('data-index')
      .split('')
      .map((str) => Number(str));

    events.emit('player sends attack', targetCoord);
  }
}
