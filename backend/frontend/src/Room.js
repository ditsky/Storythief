import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Room extends Component {

  constructor(props) {
    super(props);
    var room = this.props.location.state.roomName;
    if (room==null){
      this.state = { socket: this.props.socket, roomName: '' };
    } else {
      this.state = { socket: this.props.socket, roomName: room, players: this.props.players, size: 0};
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.socket.on('new player', players => {
      var list = players.split(",");
      this.setState({players: players, size: list.length-1});
    })

    this.props.socket.on('start game', (spy) => {
      this.props.history.push({
        pathname: '/game',
        state: {spy: spy, players: this.state.players, size: this.state.size}
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
        <Button color="danger" onClick={this.handleClick}> Start Game </Button>
      </div>
    )
  }
}

export default Room;
