import React, { Component } from 'react';
import ReactSwitch from 'react-switch';
import { IoMenu } from "react-icons/io5";

function Icon() {
  return (
    <div className='icon-c'>
      <IoMenu />
    </div>
  );
}

export default class Drawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDrawer: false
    }
  }

  handleChange() {
    this.setState((state) => {
      if (state.showDrawer)
        return { showDrawer: false };
      else
        return { showDrawer: true };
    })
  }

  render() {
    return (
      <div id='drawer-c'>
        <label id='drw-switch'>
          <ReactSwitch onChange={this.handleChange.bind(this)}
            checked={this.state.showDrawer}
            onColor={'#FFF'} offColor={'#a9a9a9'} onHandleColor={'#add8e6'} offHandleColor={'#808080'}
            checkedIcon={<Icon/>} uncheckedIcon={<Icon/>}/>
        </label>
        {this.state.showDrawer &&
          <div id='drawer'>
            <nav id='d-items'>
              <button id='new-game-d-btn' className='d-btn' onClick={this.props.newGame}>New Game</button>
            </nav>
          </div>}
      </div>
    );
  }
}