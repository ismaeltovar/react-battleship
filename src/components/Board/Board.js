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
				<table className="grid">
					<caption>{this.type}</caption>
					<tbody>
						<tr className="g-row">
							<th className="c-header"></th>
							{cHeaders.map(cVal => (
								<th key={cVal} className="c-header">{cVal}</th>
								))}
						</tr>
						{rHeaders.map((rVal) => (
							<GridRow key={rVal} rowVal={rVal} bType={this.props.type}/>
						))}
					</tbody>
				</table>
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
				{({userWin, compWin, compFoundShip, userSqurAttacked, compSqurAttacked, attacked}) => {
				consoleHelper(`GridSqur: User SQ att: ${userSqurAttacked}`);
				consoleHelper(`GridSqur: Comp SQ att: ${compSqurAttacked}`);
				return <ShipsContext.Consumer> 
					{/** ShipsContext is likely culprit for non-render problems b/c 
					 * value in Provider is not being updated, thus, Consumers don't re-render
					*/}
				{ships => {
					let shipsCoor = [];

					ships.forEach(ship => {
						shipsCoor.push(...ship);
					});

					return (
					<tr className="g-row">
						<td className="r-header">{this.props.rowVal}</td>
						{cHeaders.map((cVal) => {
							const coordinate = `${cVal}${this.props.rowVal}`;
							return <GridSquare key={`${coordinate}-${this.props.bType === 'USER' ? 'U' : 'C'}`} id={coordinate}
							attacked={
								this.props.bType === 'USER'
								?	(userSqurAttacked.find(coor => coor === coordinate) === undefined ? false : true)
								: (compSqurAttacked.find(coor => coor === coordinate) === undefined ?  false: true)
							}
							humanPlayer={
								this.props.bType === 'USER'? true : false
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