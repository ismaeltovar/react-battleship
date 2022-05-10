import React, { Component, createContext } from "react";
import { Board } from "..";
import shipsGenerator from "../shipsGenerator/shipsGenerator";
import { ShipsContext } from "../../App/App";
import { userShips } from "../../App/App";
import consoleHelper from "../../consoleHelper";

export default class UserBoard extends Component {

	componentDidUpdate() {
		consoleHelper(`UserShips: ${userShips}`);
	}

	render() {
		return(
			<ShipsContext.Provider value={userShips}>
				<Board type='USER'/>
			</ShipsContext.Provider>
		);
	}
}