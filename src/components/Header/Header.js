import React, { Component } from 'react';
import { Icon } from '..';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  //*For reference: 
  // handleChange() {
  //   this.setState((state) => {
  //     if (state.showHeader)
  //       return { showHeader: false };
  //     else
  //       return { showHeader: true };
  //   })
  // }

  render() {
    return (
      <nav id='nav-c'>
        <div id='nav-items'>
          <ul id='nav-btns'>
            <li className='n-btn-c' id='n-m-c'>
              <button id='menu-n-btn' className='n-btn' disabled={true}><Icon type="menu"/></button>
            </li>
            <li className='n-btn-c' id='n-r-c'>
              <button id='new-game-n-btn' className='n-btn' onClick={this.props.newGame}><Icon type="repeat"/></button>
            </li>
            <li className='n-btn-c' id='n-h-c'>
              <button id='help-n-btn' className='n-btn' onClick={this.props.helpDialog}><Icon type="help"/></button>
            </li>
          </ul>
        </div>
          {/* 
          * For reference:
          <label id='theme-switch'>
          <ReactSwitch onChange={this.handleChange.bind(this)}
            checked={this.state.showDrawer}
            onColor={'#FFF'} offColor={'#a9a9a9'} onHandleColor={'#add8e6'} offHandleColor={'#808080'}
            checkedIcon={<Icon type='menu'/>} uncheckedIcon={<Icon type='menu'/>}/>
        </label> */}
      </nav>
    );
  }
}