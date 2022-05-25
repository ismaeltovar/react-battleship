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

  this.setState((state) => ({
    compSqurAttacked: [...state.compSqurAttacked, coordinate]
  }));

  let usrWon = isWinner(this.state.compSqurAttacked, false);

  if (usrWon) {
    this.setState({userWin: true});
    consoleHelper("Winner: User");
  } else {

    let cpuAttCoor = cpuAttack(this.state.userSqurAttacked, this.state.previousSqurAtt);


    this.setState((state) => ({
      userSqurAttacked: [...state.userSqurAttacked, cpuAttCoor.coor],
      previousSqurAtt: cpuAttCoor
    }));
    // else if (cpuAttCoor[1] === undefined && this.state.compFoundShip !== [])
    //   this.setState((state) => ({
    //     userSqurAttacked: [...state.userSqurAttacked, cpuAttCoor.coor],
    //     previousSqurAtt: cpuAttCoor
    //   }));
    // else
    //   this.setState((state) => ({
    //     userSqurAttacked: [...state.userSqurAttacked, cpuAttCoor.coor],
    //     previousSqurAtt: cpuAttCoor
    //   }));

    // consoleHelper(`User SQ att: ${this.state.userSqurAttacked}`);
    consoleHelper(`Coordinate: ${JSON.stringify(cpuAttCoor)}`);

    let compWon = isWinner(this.state.userSqurAttacked, true);
    if (compWon) {
      this.setState({compWin: true});
      consoleHelper("Winner: CPU");
    }
  }
  
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