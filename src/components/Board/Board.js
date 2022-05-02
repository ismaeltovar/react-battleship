import React, { Component } from "react";
import { GridSquare } from "..";
import { cHeaders, rHeaders } from "../headers/headers";

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.type = this.props.type;
		this.cHeaders = cHeaders;
		this.rHeaders = rHeaders;
	}

	render() {
		return(
				<table className="grid">
					<caption>{this.type}</caption>
					<tbody>
						<tr className="g-row">
							<th className="c-header"></th>
							{this.cHeaders.map(cVal => (
								<th key={cVal} className="c-header">{cVal}</th>
								))}
						</tr>
						{this.rHeaders.map((rVal) => (
							<GridRow key={rVal} rowVal={rVal} bType={this.type} cHeaders={this.cHeaders}/>
						))}
					</tbody>
				</table>
		);
	}
}

class GridRow extends Component {
	constructor(props) {
		super(props);
		this.rowVal = this.props.rowVal;
		this.bType = this.props.bType;
		this.cHeaders = this.props.cHeaders;
	}

	render() {
		return(
			<tr className="g-row">
				<td className="r-header">{this.rowVal}</td>
				{this.cHeaders.map((cVal) => {
					const coordinate = `${cVal}${this.rowVal}`;
					return <GridSquare key={coordinate} id={coordinate} humanPlayer={this.bType === 'USER'? true : false}/>;
				})}
			</tr>
		);
	}
}