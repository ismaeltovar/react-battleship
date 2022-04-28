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
		this.getSquareCol = this.getSquareCol.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(e) {		
		this.setState({attacked: true});
	}

	getSquareCol() {
		if (!this.attacked)
			return 'gray';
		else if (this.attackInfo.id = this.id) {
			this.setState({attacked: true});
		}
	}

	render() {
		return(
			<td className="g-squr">
				<button className={`g-btn ${this.state.attacked && this.shipHere ? 'red' : this.state.attacked ? 'dark-gray': 'light-gray'}`} 
				onClick={this.clickHandler} 
				disabled={this.humanPlayer ? true : this.state.disabled}></button>
			</td>
		);
	}
}