/** Generates random location for ships
 * 0n = not attacked && no ship
 * 0s = not attacked && ship
 * 1n = attacked && no ship
 * 1s = attacked && ship
 */

import consoleHelper from "../../consoleHelper";
import { cHeaders } from "../headers/headers";

export default function shipsGenerator(boardType) {
  if (boardType === 'USER')
    consoleHelper('Generating Ships for USER');
  else 
    consoleHelper('Generating Ships for CPU');
  let lostShips = [2, 3, 3, 4, 5];
  let ships = [];
  let invalidCoordinates = [];

  lostShips.forEach((length) => {
    consoleHelper('Initializing ship');
    let newShip = getRandomShipLocal(length, invalidCoordinates);
    invalidCoordinates = [...invalidCoordinates, ...newShip];
    ships.push(newShip);
  });

  return ships;
}

function getRandomShipLocal(length, invCoordinates) {
  let foundValidLoc = false;
  let ship = [];
  let xStart;
  let yStart;
  let direction;
  let loopNum; //For debugging purposes

  while(!foundValidLoc) {
    if (loopNum > 1500)
      console.error('Too many loops in getRandomShipLocal. Please refresh the page.');
    consoleHelper('Finding valid location');
    loopNum++;
    xStart = Math.floor(Math.random() * (10 - length - 1));
    yStart = Math.floor(Math.random() * (10 - length - 1));
    
    let sqrsLeft = length;
      /** Clock-wise rotation for following loop
       * 0 = up
       * 1 = right
       * 2 = down
       * 3 = left
        */
    for (let rotation = 0; rotation < 4; rotation++) {

      for (let sqrsBuilt = 0; sqrsBuilt < length; sqrsBuilt++) {
        let coordinate;
        if (rotation === 0)
          coordinate = `${cHeaders[xStart]}${yStart + sqrsBuilt}`;
        else if (rotation === 1)
          coordinate = `${cHeaders[xStart + sqrsBuilt]}${yStart}`;
        else if (rotation === 2)
          coordinate = `${cHeaders[xStart]}${yStart - sqrsBuilt}`;
        else if (rotation === 3)
          coordinate = `${cHeaders[xStart - sqrsBuilt]}${yStart}`;
        else {
          console.error('Invalid rotation in ship location check loop in getRandomShipLocal');
        }

        if (invCoordinates.find(coor => coordinate === coor) === undefined) {
          sqrsLeft--;
          continue;
        }
        else
          break;
      }

      if (sqrsLeft === 0) {
        foundValidLoc = true;
        direction = rotation;
        break;
      }
    }
  }

  for (let i = 0; i < length; i++) {
    let coordinate;
    if (direction === 0)
      coordinate = `${cHeaders[xStart]}${yStart + i}`;
    else if (direction === 1)
      coordinate = `${cHeaders[xStart + i]}${yStart}`;
    else if (direction === 2)
      coordinate = `${cHeaders[xStart]}${yStart - i}`;
    else if (direction === 3)
      coordinate = `${cHeaders[xStart - i]}${yStart}`;
    else {
      console.error('Invalid rotation in ship building loop in getRandomShipLocal');
    }
    ship.push(coordinate);
  }
  
  consoleHelper('Ship constructed: ' + ship.toString());
  return ship; 
}