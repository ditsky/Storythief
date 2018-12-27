import React, { Component } from 'react';

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
          <label>
             username:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleUserChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </header>
      </div>
    );
  }
}

export default Home;
