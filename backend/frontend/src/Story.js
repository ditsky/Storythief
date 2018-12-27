import React, { Component } from 'react';

class Story extends Component {

  constructor(props) {
    super(props);
    var user = this.props.socket.id;
    var spy = this.props.location.state.spy;
    if (user === spy){
      this.state = {story: "Once upon a time...", value: "", spy: "true"};
    } else {
      this.state = {story: "Once upon a time...", value: "", spy: "false"};
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.socket.on('post story', story => {
      console.log(story)
      this.setState({story: story});
    })
  }

  handleChange(event) {
   this.setState({value: event.target.value});
   this.setState({story: this.state.story});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.socket.emit('post story', this.state.story + " " + this.state.value);
  }

  render() {
    return (
      <div>
        <h1 className="display-4">Game Page</h1>
        <form onSubmit={this.handleSubmit}>
          <input type = "text" value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
          <div className="jumbotron">
            <br>
            </br>
            <p> Phrase: "Andy Goes to the circus!" </p>
            <p> Are you the spy?? : {this.state.spy} </p>
            <h1 className="display-4">Current Story</h1>
            <ul id="storyarea"> {this.state.story} </ul>
          </div>
      </div>
    )
  }
}

export default Story;
