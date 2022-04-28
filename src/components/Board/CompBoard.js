import React, { Component } from "react";
import { Board } from "..";

export default class CompBoard extends Component {
  constructor(props) {
		super(props);
	}

	render() {
		return(
				<Board type='CPU'/>
		);
	}
}