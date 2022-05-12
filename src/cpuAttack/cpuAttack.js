import { cHeaders } from "../components/headers/headers";

export default function cpuAttack(sqrsAttacked) {
  /** Performance optimization idea:
   * Randomly locate a point to attack. 
   * If already attacked there, then keep going to the right on the grid using a loop
   * until you find a square that has not been attacked. 
   * @return - square that CPU decides to attack. 
  */
  let coordinate;
  let foundValidCoor = false;

  while(!foundValidCoor) {
    let yCoor = Math.floor(Math.random() * 10);
    let xCoor = Math.floor(Math.random() * 10);
    coordinate = `${cHeaders[xCoor]}${yCoor}`;
    if (sqrsAttacked.find(coor => coor === coordinate) === undefined)
      foundValidCoor = true;
  }

  return coordinate;
}