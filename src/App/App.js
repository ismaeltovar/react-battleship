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

  let usrWon = isWinner(this.state.compSqurAttacked);

  if (usrWon) {
    this.setState({userWin: true});
    consoleHelper("Winner: User");
  } else {
    let cpuSqrAtt = cpuAttack(this.state.userSqurAttacked);
    this.setState((state) => ({
      userSqurAttacked: [...state.userSqurAttacked, cpuSqrAtt]
    }));
    // consoleHelper(`User SQ att: ${this.state.userSqurAttacked}`);
    consoleHelper(`Comp SQ att: ${this.state.compSqurAttacked}`);

    let compWon = isWinner(this.state.userSqurAttacked);
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
  alert(`${winner === 'U' ? "You Won!": "The Computer Wins!"}`);
}