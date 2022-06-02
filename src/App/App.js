import React, { Component, createContext } from 'react';
import { CompBoard, shipsGenerator, UserBoard } from '../components';
import isWinner from '../components/isWinner/isWinner';
import consoleHelper from '../consoleHelper';
import cpuAttack from '../cpuAttack/cpuAttack';
import '../sass/styles.js';

export const ShipsContext = createContext();
export const AttackContext = createContext();
export let userShips = [];
export let compShips = [];

class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    userWin: false,
    compWin: false,
    previousSqurAtt: undefined,
    userSqurAttacked: [],
    compSqurAttacked: [],
    attacked: this.attacked,
  }
}

attacked = (e) => {
  e.preventDefault();
  const coordinate = e.target.id;
  const board = e.target;
  consoleHelper(`Target: ${board}\tCoordinate: ${coordinate}`);

  this.setState((state) => {
   let updatedCompSqAtt = [...state.compSqurAttacked, coordinate];
    let usrWon = isWinner(updatedCompSqAtt, false);

    if (usrWon) {
      consoleHelper("Winner: User");
      return {compSqurAttacked: updatedCompSqAtt, userWin: true};
    } else {
      let cpuAttCoor = cpuAttack(this.state.userSqurAttacked, this.state.previousSqurAtt);
      let updatedUserSqAtt = [...state.userSqurAttacked, cpuAttCoor.coor];
      let compWon =  isWinner(this.state.userSqurAttacked, true);
      consoleHelper(`Coordinate: ${JSON.stringify(cpuAttCoor)}`);
      
      if (compWon) {
        consoleHelper("Winner: CPU");
        return {compSqurAttacked: updatedCompSqAtt, userSqurAttacked: updatedUserSqAtt, previousSqurAtt: cpuAttCoor, compWin: true};
      } else {
        return {compSqurAttacked: updatedCompSqAtt, userSqurAttacked: updatedUserSqAtt, previousSqurAtt: cpuAttCoor};
      }
    }
  });
  }

componentDidMount() {
  userShips = shipsGenerator('USER');
  compShips = shipsGenerator('CPU');
}

componentDidUpdate() {
  consoleHelper('App update');
  consoleHelper(`Comp SQ att: ${this.state.compSqurAttacked}`);
  if (this.state.userWin)
    WinnerDialog("U");
  else if (this.state.compWin)
    WinnerDialog("C");
  else if (this.state.userWin && this.state.compWin)
    WinnerDialog("");
}

render() {
  return (
    <div className="App">
      <main id='boards'>
        <AttackContext.Provider value={this.state}>
          <UserBoard/>
          <CompBoard/>
        </AttackContext.Provider>
      </main>
    </div>
  );
  }
}

export default App;

function WinnerDialog(winner) {
  alert(`${winner === 'U' ? "You Won!": winner === 'C' ? "The Computer Wins!" : "It's a Draw!"}`);
}