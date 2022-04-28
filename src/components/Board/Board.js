import React, { Component } from "react";
import { GridSquare } from "..";

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.type = this.props.type;
		this.CHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
		this.RHeaders = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	}

	render() {
		return(
				<table className="grid">
					<caption>{this.type}</caption>
					<tbody>
						<tr className="g-row">
							<th className="c-header"></th>
							{this.CHeaders.map(cVal => (
								<th className="c-header">{cVal}</th>
								))}
						</tr>
						{this.RHeaders.map((rVal) => (
							<tr className="g-row">
								<td className="r-header">{rVal}</td>
								{this.CHeaders.map(cVal => (
									<GridSquare id={`${rVal}${cVal}`} humanPlayer={this.type === 'USER'? true : false}/>
									))}
							</tr>
						))}
					</tbody>
				</table>
		);
	}
}