// import css
import './static/reset.css';
import './static/style.css';

// import modules (events optional)
import { events } from './assets/Events';
import Player from './assets/Player';
import * as BoardUI from './assets-ui/boardUI';
import * as MessageUI from './assets-ui/messageUI';

// ---------- GAME LOOP ---------- //
const player = new Player();
const computer = new Player();

events.emit('init board placement', player);

// custom event binding
events.on('place ship', (data) => {
  player.placeShip(data.orientation, data.coordArr, data.boat);
  events.emit('change placement message', data.nextBoat);
  events.emit('init board placement', player);
});

events.on('place final ship', (data) => {
  player.placeShip(data.orientation, data.coordArr, data.boat);
  computer.randomPlaceShips();
  events.emit('ready fire message');

  events.emit('render attack board', [player, computer]);
});

events.on('player sends attack', (coord) => {
  const result = player.attack(computer, coord);
  if (result[0] === 'hit') {
    if (computer.playerBoard.checkAllSunk()) {
      events.emit('player won', [player, computer]);
    } else {
      events.emit('player hit status message', result[1]);
      events.emit('render attack board', [player, computer]);
    }
  } else {
    events.emit('player miss', [player, computer]);

    setTimeout(() => {
      computer.randomAttack(player);
      if (player.playerBoard.checkAllSunk()) {
        events.emit('computer won', [player, computer]);
      } else {
        events.emit('computer shot message');
        events.emit('render attack board', [player, computer]);
      }
    }, 500);
  }
});
