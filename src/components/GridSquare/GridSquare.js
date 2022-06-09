import React, { Component } from "react";
import { Icon } from "..";

export default class GridSquare extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<td key={this.props.attacked} className="g-squr">
				<button id={this.props.id} 
				className={`g-btn ${this.props.attacked && this.props.shipHere ? 'att-ship' : this.props.attacked ? 'att-no-ship': 'no-att'} ${this.props.humanPlayer ? 'u' : 'c'}`} 
				onClick={this.props.onAttack.bind(this)}
				disabled={this.props.disabled ? true : this.props.humanPlayer ? true : this.props.attacked}>
					<Icon type='locate'/>
				</button>
			</td>
		);
	}
}