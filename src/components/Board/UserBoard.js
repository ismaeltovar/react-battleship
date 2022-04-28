import React, { Component } from "react";
import { Board } from "..";

export default class UserBoard extends Component {
  constructor(props) {
		super(props);
	}

	render() {
		return(
				<Board type='USER'/>
		);
	}
}