import React, { Component, useContext } from "react";
import { GridSquare } from "..";
import { cHeaders, rHeaders } from "../headers/headers";
import { AttackContext, ShipsContext } from "../../App/App";
import consoleHelper from "../../consoleHelper";

export default class Board extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id={`${this.props.type === 'user' ? 'u' : 'c'}-board`} className="board">
				<header className="board-h">{this.props.type}</header>
				<table>
					<caption>{this.type}</caption>
					<tbody className="grid">
						<tr className="g-row">
							{/* <th className="c-header g-header"></th> */}
							{cHeaders.map(cVal => (
								<th key={cVal} className="c-header g-header">{cVal}</th>
								))}
						</tr>
						{rHeaders.map((rVal) => (
							<GridRow key={rVal} rowVal={rVal} bType={this.props.type}/>
							))}
					</tbody>
				</table>
			</div>
		);
	}
}

class GridRow extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<AttackContext.Consumer>
				{({userWin, compWin, previousSqurAtt, userSqurAttacked, compSqurAttacked, attacked}) => {
				consoleHelper(`GridSqur: User SQ att: ${userSqurAttacked}`);
				consoleHelper(`GridSqur: Comp SQ att: ${compSqurAttacked}`);
				return <ShipsContext.Consumer> 
				{ships => {
					let shipsCoor = [];

					ships.forEach(ship => {
						shipsCoor.push(...ship.coordinates);
					});

					return (
					<tr className="g-row">
						<td className="r-header g-header">{this.props.rowVal}</td>
						{cHeaders.map((cVal) => {
							const coordinate = `${cVal}${this.props.rowVal}`;
							return <GridSquare key={`${coordinate}-${this.props.bType === 'user' ? 'u' : 'c'}`} id={coordinate}
							attacked={
								this.props.bType === 'user'
								?	(userSqurAttacked.find(coor => coor === coordinate) === undefined ? false : true)
								: (compSqurAttacked.find(coor => coor === coordinate) === undefined ?  false: true)
							}
							humanPlayer={
								this.props.bType === 'user'? true : false
							} 
							shipHere={
								shipsCoor.find((coor) => coor === coordinate) !== undefined ? true : false
							}
							onAttack={attacked}
							disabled={userWin || compWin ? true : false}
							/>;
						})}
					</tr>
				)}}
				</ShipsContext.Consumer>
	}}
			</AttackContext.Consumer>
		);
	}
}