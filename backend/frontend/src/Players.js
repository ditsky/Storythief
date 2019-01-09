import React, { Component } from 'react';

class Players extends Component {

  constructor(props) {
    super(props);
    this.state = {players: this.props.players};
  }
  
  render() {
    return (
      <div>
        <p> Current Players: </p>
        <p> {this.state.players} </p>
      </div>
    )
  }

}

export default Players;
