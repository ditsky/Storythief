import React, { Component } from 'react';

class VotingForm extends Component {

  render() {
    return (
      <input type="radio" value={this.props.player}> {this.props.player} </input>
    )
  }
}

export default VotingForm;
