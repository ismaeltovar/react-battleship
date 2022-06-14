import React, { Component, createContext } from 'react';
import { shipsGenerator, Board, Drawer} from '../components';
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
      consoleHelper(`Comp Coordinate Att: ${JSON.stringify(cpuAttCoor)}`);
      
      if (compWon) {
        consoleHelper("Winner: CPU");
        return {compSqurAttacked: updatedCompSqAtt, userSqurAttacked: updatedUserSqAtt, previousSqurAtt: cpuAttCoor, compWin: true};
      } else {
        return {compSqurAttacked: updatedCompSqAtt, userSqurAttacked: updatedUserSqAtt, previousSqurAtt: cpuAttCoor};
      }
    }
  });
  }

  newGame() {
    consoleHelper('Generating New Game...');
    userShips = shipsGenerator('USER');
    compShips = shipsGenerator('CPU');

    this.setState({
      userWin: false,
      compWin: false,
      previousSqurAtt: undefined,
      userSqurAttacked: [],
      compSqurAttacked: [],
      closeDrawer: true});
  }

  helpDialog() {
    let helpMsg = `Help: 
    \n* A dialog will appear whenever you or the computer sink enough ships to win *
    \n- The app automatically generates ships and their locations for both the player and the computer.
    \n- The user always goes first. To start the game, attack one of the computer's squares by clicking on a square in the board under "Computer". 
    \n- If your device allows, you will be able to hover over the squares that are available for you to attack on the Computer's board.
    \n- If you want to start a new game, click on the "New Game" button in the header to the left of the screen.
    \n*** If the app freezes or malfunctions, refresh the page. If the error persists, contact the developer or open an issue at https://github.com/ismaeltovar/react-battleship/issues ***`;
    alert(helpMsg);
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
      <Drawer newGame={this.newGame.bind(this)} helpDialog={this.helpDialog.bind(this)}/>
      <main id='boards'>
        <AttackContext.Provider value={this.state}>
          <ShipsContext.Provider value={userShips}>
            <Board type='user'/>
          </ShipsContext.Provider>
          <ShipsContext.Provider value={compShips}>
            <Board type='computer'/>
          </ShipsContext.Provider>
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