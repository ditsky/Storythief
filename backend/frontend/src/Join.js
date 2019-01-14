import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './App.css';

class Join extends Component {
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
      <div>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
        <h1>Join a room:</h1>
        <header className="Home-header">
          <Form className="form-signin" onSubmit={this.handleSubmit} >
          <Label>
            Room name:
            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleRoomChange}
            />
          </Label>
          <br>
          </br>
          <Label>
             Username:
            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleUserChange}
            />
          </Label>
          <br>
          </br>
          <Button className="btn btn-primary" color="danger" type="submit" value="Submit"> Submit </Button>
        </Form>
        </header>
      </div>
    )
  }
}

export default Join;
