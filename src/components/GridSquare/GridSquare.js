import React, { Component } from "react";
import consoleHelper from "../../consoleHelper";

export default class GridSquare extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attacked: false,
		}
	}

	render() {
		return(
			<td key={this.props.attacked} className="g-squr">
				<button id={this.props.id} className={`g-btn ${this.props.attacked && this.props.shipHere ? 'att-ship' : this.props.attacked ? 'att-no-ship': 'no-att'}`} 
				onClick={this.props.onAttack.bind(this)}
				disabled={this.props.humanPlayer ? true : this.props.attacked}></button>
			</td>
		);
	}
}