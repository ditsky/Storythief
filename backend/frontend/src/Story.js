import React, { Component } from 'react';
import Players from './Players';

class Story extends Component {

  constructor(props) {
    super(props);
    var user = this.props.socket.id;
    var spy = this.props.location.state.spy;
    this.state = {story: "Once upon a time...", value: "", spy: user === spy, turn: 0, gameTurn: 0, players: this.props.location.state.size, totalTurns: 0};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.socket.on('post story', (story,gameTurn) => {
      console.log(story)
      this.setState({story: story, gameTurn: gameTurn, totalTurns: this.state.totalTurns + 1});
      if (this.state.totalTurns > 14){
        this.props.history.push({
          pathname: '/voting',
          state: { spyID: this.props.location.state.spy, userID: this.props.socket.id, spy: this.state.spy, story: this.state.story, players:this.props.location.state.players}
        })
      }
    })

    this.props.socket.on('set turn', turn => {
      console.log('setting turn: ' + turn)
      this.setState({turn: turn});
    })
  }

  handleChange(event) {
   this.setState({value: event.target.value});
   this.setState({story: this.state.story});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.socket.emit('post story', this.state.story + " " + this.state.value, (this.state.turn + 1) % (this.state.players));
  }

  renderPhrase = (spy) => {
    let phrase = null;
    if (!spy){
      phrase = <p> Phrase: "Andy Goes to the circus!" </p>;
    } else {
      phrase = <p> You are the spy! Try and blend in! </p>;
    }
    return phrase;
  }

  renderForm = (turn, gameTurn) => {
    let form = null;
    if (turn == gameTurn) {
      form =
      <form onSubmit={this.handleSubmit}>
        <input type = "text" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
    }
    return form;
  }

  render() {
    let phrase = null;
    phrase = this.renderPhrase(this.state.spy);
    let form = this.renderForm(this.state.turn, this.state.gameTurn);
    return (
      <div>
        <h1 className="display-4">Game Page</h1>
        {form}
          <div>
            <br>
            </br>
            {phrase}
            <h1 className="display-4">Current Story</h1>
            <div className="jumbotron">
              <ul id="storyarea"> {this.state.story} </ul>
            </div>
            <div>
              <Players players={this.props.location.state.players}> </Players>
            </div>
          </div>
      </div>
    )
  }
}

export default Story;
