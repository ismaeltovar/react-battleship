import { cHeaders } from "../components/headers/headers";
import { userShips } from "../App/App";
import consoleHelper from "../consoleHelper";

function Coordinate(coor, shipHere, shipAttProcess, shipDirectionAtt, shipNumAtt, shipStartCoor, shipLength, shipDirection) {
  this.coor = coor;
  this.shipHere = shipHere;
  this.shipAttProcess = shipAttProcess;
  this.shipDirectionAtt = shipDirectionAtt;
  this.shipNumAtt = shipNumAtt;
  this.shipStartCoor = shipStartCoor;
  this.shipLength = shipLength;
  this.shipDirection = shipDirection;
}

export default function cpuAttack(sqrsAttacked, prevCoor) {
  /** Ship Direction key: 
   * -1 = Ship not possible/already determined in that direction
   * 0 = Unknown if ship is in that direction
   * 1 = Ship is located in that direction
  */

  let coor = '';
  let shipHere = false;
  let shipAttProcess = false;
  let shipDirectionAtt = 0;
  let shipNumAtt = 0;
  let shipLength = 0;
  let shipStartCoor = '';
  let shipDirection = {};

  if (prevCoor === undefined || prevCoor.shipAttProcess === false) {
    
    coor = findRandomCoordinate(sqrsAttacked);

    userShips.forEach(ship => {
      if (ship.find(coord => coord === coor) !== undefined) {
        shipHere = true;
        shipAttProcess = true;
        shipNumAtt++;
        shipDirectionAtt++;
        shipLength = ship.length;
        shipStartCoor = coor;
      }
    })

    consoleHelper('Checking possible directions...');
    if (shipAttProcess === true) {
      let hIndex = cHeaders.findIndex(h => h === coor.charAt(0));

      let upPossible = parseInt(coor.charAt(1)) - 1 < 0 ? false : true;
      let rightPossible = hIndex + 1 > 9 ? false : true;
      let downPossible = parseInt(coor.charAt(1)) + 1 > 9 ? false : true;
      let leftPossible = hIndex - 1 < 0 ? false : true;

      sqrsAttacked.forEach(sqr => {
        let coorColumn = cHeaders.findIndex(h => h === coor.charAt(0));
        let coorRow = parseInt(coor.charAt(1));
        let sqColumn = cHeaders.findIndex(h => h === sqr.charAt(0));
        let sqRow = parseInt(sqr.charAt(1));
        if (coorRow - 1 === sqRow && coorColumn === sqColumn && upPossible)
          upPossible = false;
        if (coorColumn + 1 === sqColumn && coorRow === sqRow && rightPossible)
          rightPossible = false;
        if (coorRow + 1 === sqRow && coorColumn === sqColumn && downPossible)
          downPossible = false;
        if (coorColumn - 1 === sqRow && coorRow === sqRow && leftPossible)
          leftPossible = false;
      });

      //ship possibly up
      if (!upPossible)
        shipDirection.up = -1;
      else
        shipDirection.up = 0;
      //ship possibly right
      if (!rightPossible)
        shipDirection.right = -1;
      else
        shipDirection.right = 0;
      //ship possibly down
      if (!downPossible)
        shipDirection.down = -1;
      else
        shipDirection.down = 0;
      //ship possibly left
      if (!leftPossible)
        shipDirection.left = -1;
      else
        shipDirection.left = 0;
    }

  } else if (prevCoor.shipAttProcess) {

    let hIndex = cHeaders.findIndex(h => h === prevCoor.shipStartCoor.charAt(0));
    consoleHelper(`Header index: ${hIndex}`);
    shipHere = prevCoor.shipHere;
    shipAttProcess = prevCoor.shipAttProcess;
    shipDirectionAtt = prevCoor.shipDirectionAtt;
    shipNumAtt = prevCoor.shipNumAtt;
    shipLength = prevCoor.shipLength;
    shipStartCoor = prevCoor.shipStartCoor;
    shipDirection = prevCoor.shipDirection;

    if (prevCoor.shipDirection.up >= 0) {

      let column = prevCoor.shipStartCoor.charAt(0);
      let row = parseInt(prevCoor.shipStartCoor.charAt(1)) - prevCoor.shipDirectionAtt;
      coor = `${column}${row}`;
      shipDirectionAtt++;
      consoleHelper(coor);

      let coorIsShip = false;
      userShips.forEach((coors) => {
        if (coors.find(coord => coord === coor) !== undefined)
          coorIsShip = true;
      });

      //see if there is coordinate already attacked in the direction
      let nextCoor = `${cHeaders[column]}${row - 1}`;
      let sqrAttInDirection = sqrsAttacked.find((sqr) => sqr === nextCoor) === undefined ? false : true;

      if (coorIsShip)
        shipNumAtt++;
      else
        shipHere = false;

      if (!coorIsShip || sqrAttInDirection || row === 0) {
        shipDirection.up = -1;
        shipDirectionAtt = 1;
      } else {
        shipDirection.up = 1;
        shipDirection.right = -1;
        shipDirection.left = -1;
      }

    } else if (prevCoor.shipDirection.right >= 0) {
      
      let column = hIndex + prevCoor.shipDirectionAtt;
      let row = parseInt(prevCoor.shipStartCoor.charAt(1));
      coor = `${cHeaders[column]}${row}`;
      shipDirectionAtt++;

      let coorIsShip = false;
      userShips.forEach((coors) => {
        if (coors.find(coord => coord === coor) !== undefined)
          coorIsShip = true;
      });

      //see if there is coordinate already attacked in the direction
      let nextCoor = `${cHeaders[column + 1]}${row}`;
      let sqrAttInDirection = sqrsAttacked.find((sqr) => sqr === nextCoor) === undefined ? false : true;

      if (coorIsShip)
        shipNumAtt++;
      else
        shipHere = false;

      if (!coorIsShip || sqrAttInDirection || column === 9) {
        shipDirection.right = -1;
        shipDirectionAtt = 1;
      } else {
        shipDirection.right = 1;
        shipDirection.up = -1;
        shipDirection.down = -1;
      }

    } else if (prevCoor.shipDirection.down >= 0) {

      let column = prevCoor.shipStartCoor.charAt(0);
      let row = parseInt(prevCoor.shipStartCoor.charAt(1)) + prevCoor.shipDirectionAtt;
      coor = `${column}${row}`;
      shipDirectionAtt++;

      let coorIsShip = false;
      userShips.forEach((coors) => {
        if (coors.find(coord => coord === coor) !== undefined)
          coorIsShip = true;
      });

      //see if there is coordinate already attacked in the direction
      let nextCoor = `${cHeaders[column]}${row + 1}`;
      let sqrAttInDirection = sqrsAttacked.find((sqr) => sqr === nextCoor) === undefined ? false : true;

      if (coorIsShip)
        shipNumAtt++;
      else
        shipHere = false;

      if (!coorIsShip || sqrAttInDirection || row === 9) {
        shipDirection.down = -1;
        shipDirectionAtt = 1;
      } else {
        shipDirection.down = 1;
        shipDirection.right = -1;
        shipDirection.left = -1;
      }

    } else if (prevCoor.shipDirection.left >= 0) {

      let column = hIndex - prevCoor.shipDirectionAtt;
      let row = parseInt(prevCoor.shipStartCoor.charAt(1))
      coor = `${cHeaders[column]}${row}`;
      shipDirectionAtt++;

      let coorIsShip = false;
      userShips.forEach((coors) => {
        if (coors.find(coord => coord === coor) !== undefined)
          coorIsShip = true;
      });

      //see if there is coordinate already attacked in the direction
      let nextCoor = `${cHeaders[column - 1]}${row}`;
      let sqrAttInDirection = sqrsAttacked.find((sqr) => sqr === nextCoor) === undefined ? false : true;

      if (coorIsShip)
        shipNumAtt++;
      else
        shipHere = false;

      if (!coorIsShip || sqrAttInDirection || column === 0) {
        shipDirection.left = -1;
        shipDirectionAtt = 1;
      } else {
        shipDirection.left = 1;
        shipDirection.up = -1;
        shipDirection.down = -1;
      }

    } else if (shipNumAtt < shipLength) {
      console.error('Error: Bug likely in the cpuAttack logic.');
    } else if (shipNumAtt > shipLength) {
      console.error('Error: Bug likely in the shipsGenerator logic.');
    }

    if (shipNumAtt === shipLength) {
      shipAttProcess = false;
    }

  }

  return new Coordinate(coor, shipHere, shipAttProcess, shipDirectionAtt, shipNumAtt, shipStartCoor, shipLength, shipDirection);
}

function findRandomCoordinate(sqrsAttacked) {
  let foundValidCoor = false;
  let coor = '';

  while(!foundValidCoor) {
    let yCoor = Math.floor(Math.random() * 10);
    let xCoor = Math.floor(Math.random() * 10);
    coor = `${cHeaders[xCoor]}${yCoor}`;
    if (sqrsAttacked.find(coord => coord === coor) === undefined)
      foundValidCoor = true;
  }

  return coor;
}