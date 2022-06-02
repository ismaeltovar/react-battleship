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
  let lostShips = [
    {length: 2, name: 'destroyer', coordinates: undefined}, 
    {length: 3, name: 'submarine', coordinates: undefined}, 
    {length: 3, name: 'cruiser', coordinates: undefined}, 
    {length: 4, name: 'battleship', coordinates: undefined}, 
    {length: 5, name: 'carrier', coordinates: undefined}
  ];
  let ships = [];
  let invalidCoordinates = [];

  lostShips.forEach((ship) => {
    consoleHelper('Initializing ship');
    let newShip = getRandomShipLocal(ship.length, invalidCoordinates);
    invalidCoordinates = [...invalidCoordinates, ...newShip];
    ship.coordinates = newShip;
    ships.push(ship);
  });

  return ships;
}

function getRandomShipLocal(length, invCoordinates) {
  let foundValidLoc = false;
  let ship = [];
  let loopNum = 0; //For debugging purposes
  
  /** Clock-wise rotation for following loop
   * 0 = up
   * 1 = right
   * 2 = down
   * 3 = left
   */
  
  while(!foundValidLoc) {
    if (loopNum > 1500)
      console.error('Too many loops in getRandomShipLocal. Please refresh the page.');
    consoleHelper('Finding valid location');
    loopNum++;
    let directions = [0, 1, 2, 3];
    let directionIndex = undefined;
    let columnStart = Math.floor(Math.random() * 10);
    let rowStart = Math.floor(Math.random() * 10);

    let coordinate = `${cHeaders[columnStart]}${rowStart}`;
    if (invCoordinates.find(coord => coord === coordinate) !== undefined)
      break;
    
    let sqrsNeeded = length - 1;

    if (rowStart - sqrsNeeded < 0) {
      directions = directions.filter((value) => {
        return value !== 0;
      });
    }
    if (columnStart + sqrsNeeded > 9) {
      directions = directions.filter((value) => {
        return value !== 1;
      });
    }
    if (rowStart + sqrsNeeded > 9) {
      directions = directions.filter((value) => {
        return value !== 2;
      });
    }
    if (columnStart - sqrsNeeded < 0) {
      directions = directions.filter((value) => {
        return value !== 3;
      });
    }

    
    invCoordinates.forEach(coor => {
      let columnCoor = cHeaders.findIndex(h => h === coor.charAt(0));
      let rowCoor = parseInt(coor.charAt(1));
      if (rowCoor >= rowStart - length && rowCoor <= rowStart + 1 && columnCoor === columnStart && directions.find(el => el === 0) !== undefined)
        directions = directions.filter((value) => {
          return value !== 0;
        });
      else if (columnCoor <= columnStart + length && columnCoor >= columnStart - 1 && rowCoor === rowStart && directions.find(el => el === 1) !== undefined)
        directions = directions.filter((value) => {
          return value !== 1;
        });
      else if (rowCoor <= rowStart + length && rowCoor >= rowStart - 1 && columnCoor === columnStart && directions.find(el => el === 2) !== undefined)
        directions = directions.filter((value) => {
          return value !== 2;
        });
      else if (columnCoor >= columnStart - length && columnCoor <= columnStart + 1 && rowCoor === rowStart && directions.find(el => el === 3) !== undefined)
        directions = directions.filter((value) => {
          return value !== 3;
        });
    });

    consoleHelper(`Directions: ${directions.toString()}`);
    
    if (directions.length === 0)
      break;
    else 
      foundValidLoc = true;
    consoleHelper(`FoundValidLoc: ${foundValidLoc}`);

    directionIndex = directions[Math.floor(Math.random() * directions.length)];
      
    ship.push(`${cHeaders[columnStart]}${rowStart}`);
    consoleHelper(`Start coordinate: ${ship[0]}`);

    for (let i = 1; i < length; i++) {
      if (directionIndex === 0)
        rowStart--;
      else if (directionIndex === 1)
        columnStart++;
      else if (directionIndex === 2)
        rowStart++;
      else if (directionIndex === 3)
        columnStart--;
      ship.push(`${cHeaders[columnStart]}${rowStart}`);
    }
  }

  consoleHelper('Ship constructed: ' + ship.toString());
  return ship;
}