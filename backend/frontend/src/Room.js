import React, { Component } from 'react';

class Room extends Component {

  constructor(props) {
    super(props);
    var room = this.props.location.state.roomName;
    if (room==null){
      this.state = { socket: this.props.socket, roomName: '' };
    } else {
      this.state = { socket: this.props.socket, roomName: room, players: this.props.players };
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.socket.on('new player', players => {
      this.setState({players: players});
    })

    this.props.socket.on('start game', (spy) => {
      this.props.history.push({
        pathname: '/game',
        state: {spy: spy, players: this.state.players}
      })
    })
  }

  handleClick(){
    this.props.socket.emit('start game');
  }

  render() {
    return (
      <div className="Room">
        <h1> Welcome to {this.state.roomName} </h1>
        <p> Players: {this.state.players} </p>
        <button onClick={this.handleClick}> Start Game </button>
      </div>
    )
  }
}

export default Room;
