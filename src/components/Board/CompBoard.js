import React, { Component, createContext } from "react";
import { Board } from "..";
import shipsGenerator from "../shipsGenerator/shipsGenerator";
import { ShipsContext } from "../../App/App";
import { compShips } from "../../App/App";
import consoleHelper from "../../consoleHelper";

export default class CompBoard extends Component {
	componentDidUpdate() {
		consoleHelper(`CompShips: ${compShips}`);
	}

	render() {
		return(
			<div id="c-board" className="board">
				<header className="board-h">computer</header>
				<ShipsContext.Provider value={compShips}>
					<Board type='CPU'/>
				</ShipsContext.Provider>
			</div>
		);
	}
}