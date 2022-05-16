import { userShips, compShips } from "../../App/App";

//Return true if all of the ships have been sunk for the user/computer, depending on the parameter

export default function isWinner(sqrsAttacked, isUserSqrs) {
  let unsunkShip = false;
  let ships = isUserSqrs ? userShips : compShips;

  ships.forEach(coor => {
    if (sqrsAttacked.find(attCoor => attCoor === coor) === undefined)
      unsunkShip = true;
  });

  return !unsunkShip;
}