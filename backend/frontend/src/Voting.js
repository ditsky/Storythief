import React, { Component } from 'react';
import VotingForm from './VotingForm';
import { Button } from 'reactstrap';

class Voting extends Component {

  constructor(props){
    super(props);
    this.state = {players: this.props.location.state.players.split(","), selectedOption: "v1", spy: this.props.location.state.spy, v1: 0, v2: 0, v3: 0, votes: 0, voted: false}
    this.renderForm = this.renderForm.bind(this);
    this.vote = this.vote.bind(this);
    this.change = this.change.bind(this);
  }

  componentDidMount(){
    this.props.socket.on('vote', (option) => {
      if (option == "v1")
        this.setState({v1: this.state.v1 + 1, votes: this.state.votes+1});
      if (option == "v2")
        this.setState({v2: this.state.v2 + 1, votes: this.state.votes+1});
      if (option == "v3")
        this.setState({v3: this.state.v3 + 1, votes: this.state.votes+1});
    })
  }


  change(changeEvent) {
    this.setState({selectedOption: changeEvent.target.value});
  }

  vote(event){
    event.preventDefault();
    this.setState({voted: true});
    this.props.socket.emit('vote', this.state.selectedOption);
  }

  renderForm = (players,spy,v1,v2,v3) => {
    let form = null;
    if (!spy && !this.state.voted){
      form =   <form onSubmit={this.vote}>
          <label>
            Select the spy:
            <br>
            </br>
            <input type="radio" name={players[0]} value="v1" checked={this.state.selectedOption === 'v1'}  onChange={this.change}/> {players[0]} {v1}
            <br>
            </br>
            <input type="radio" name={players[1]} value="v2" checked={this.state.selectedOption === 'v2'}  onChange={this.change} /> {players[1]} {v2}
            <br>
            </br>
            <input type="radio" name={players[2]} value="v3" checked={this.state.selectedOption === 'v3'}  onChange={this.change} /> {players[2]} {v3}
            <br>
            </br>
          </label>
          <br>
          </br>
          <input type="submit" />
        </form>
    } else {
      form =   <form onSubmit={this.vote}>
          <label>
            Select the spy:
            <br>
            </br>
            {players[0]} {v1}
            <br>
            </br>
            {players[1]} {v2}
            <br>
            </br>
            {players[2]} {v3}
            <br>
            </br>
          </label>
          <br>
          </br>
        </form>
    }
    return form;
  }

  renderMessage = (votes,spy) => {
    let message = null;
    if (votes == 2) {
      if (spy) {

      }
    }
  }

  render() {
    let form = this.renderForm(this.state.players, this.props.location.state.spy, this.state.v1, this.state.v2, this.state.v3);
    return (
      <div>
        <h1> Voting Page </h1>
        <div>
          {form}
        </div>
        <br>
        </br>
        <h1> Story: </h1>
        <p> {this.props.location.state.story} </p>
      </div>
    )
  }
}

export default Voting;
