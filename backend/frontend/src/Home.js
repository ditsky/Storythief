import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { socket: this.props.socket, roomName: '', userName: '' };

    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.state.socket.emit('join', this.state.roomName, this.state.userName);
    event.preventDefault();
    this.props.history.push({
      pathname: '/room',
      state: { roomName: this.state.roomName, userName: this.state.userName }
    })

  }

  handleRoomChange(event) {
    this.setState({ roomName: event.target.value });
  }

  handleUserChange(event) {
    this.setState({ userName: event.target.value });
  }

  render() {
    return (
      <div className="Home">
        <h2> StoryThief </h2>
        <p> Join a Room: </p>
        <header className="Home-header">
          <form onSubmit={this.handleSubmit} >
          <label>
            Room name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleRoomChange}
            />
          </label>
          <br>
          </br>
          <label>
             username:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleUserChange}
            />
          </label>
          <br>
          </br>
          <Button className="btn btn-primary" color="danger" type="submit" value="Submit"> Submit </Button>
        </form>
        </header>
      </div>
    );
  }
}

export default Home;
