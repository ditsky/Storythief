import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
        <div className="jumbotron">
          <h1 className="h3 mb-3 font-weight-normal">Join a room:</h1>
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
      </div>
    );
  }
}

export default Home;
