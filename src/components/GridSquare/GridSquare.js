import React, { Component } from "react";

export default class GridSquare extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attacked: false,
			disabled: false
		}
		this.attacked = this.props.attacked;
		//this.attackInfo = this.props.attackInfo;
		this.id = this.props.id;
		this.humanPlayer = this.props.humanPlayer;
		this.shipHere = this.props.shipHere;
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(e) {		
		this.setState({attacked: true, disabled: true});
	}

	render() {
		return(
			<td className="g-squr">
				<button className={`g-btn ${this.state.attacked && this.shipHere ? 'att-ship' : this.state.attacked ? 'att-no-ship': 'no-att'}`} 
				onClick={this.clickHandler} 
				disabled={this.humanPlayer ? true : this.state.disabled}></button>
			</td>
		);
	}
}