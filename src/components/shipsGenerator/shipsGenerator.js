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
        //Here's were I left off.
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
    //For reference:     

    // for (let rotation = 0; rotation < 4; rotation++) {

    //   for (let sqrsBuilt = 0; sqrsBuilt < length; sqrsBuilt++) {
    //     let coordinate;
    //     if (rotation === 0)
    //       coordinate = `${cHeaders[xStart]}${yStart + sqrsBuilt}`;
    //     else if (rotation === 1)
    //       coordinate = `${cHeaders[xStart + sqrsBuilt]}${yStart}`;
    //     else if (rotation === 2)
    //       coordinate = `${cHeaders[xStart]}${yStart - sqrsBuilt}`;
    //     else if (rotation === 3)
    //       coordinate = `${cHeaders[xStart - sqrsBuilt]}${yStart}`;
    //     else {
    //       console.error('Invalid rotation in ship location check loop in getRandomShipLocal');
    //     }

    //     if (invCoordinates.find(coor => coordinate === coor) === undefined) {
    //       sqrsLeft--;
    //       continue;
    //     }
    //     else
    //       break;
    //   }

      // if (sqrsLeft === 0) {
      //   foundValidLoc = true;
      //   direction = rotation;
      //   break;
      // }
  // for (let i = 0; i < length; i++) {
  //   let coordinate;
  //   if (direction === 0)
  //     coordinate = `${cHeaders[xStart]}${yStart + i}`;
  //   else if (direction === 1)
  //     coordinate = `${cHeaders[xStart + i]}${yStart}`;
  //   else if (direction === 2)
  //     coordinate = `${cHeaders[xStart]}${yStart - i}`;
  //   else if (direction === 3)
  //     coordinate = `${cHeaders[xStart - i]}${yStart}`;
  //   else {
  //     console.error('Invalid rotation in ship building loop in getRandomShipLocal');
  //   }
  //   ship.push(coordinate);
  // }