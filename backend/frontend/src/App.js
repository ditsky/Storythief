import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from'./Home';
import Room from'./Room';
import Story from './Story';
import Voting from './Voting';

import socketIOClient from 'socket.io-client';
class App extends Component {

  state = {socket: socketIOClient('https://storythief.herokuapp.com/')}

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  socket={this.state.socket}
                />
              )}
            />
            <Route
              path="/room"
              render={props => <Room {...props} socket={this.state.socket} room={this.state.socket.room} players={new Array()} />}
            />
            <Route
              path="/game"
                render={props => <Story {...props} socket={this.state.socket} user={this.state.socket.user} />}
            />
            <Route
              path="/voting"
                render={props => <Voting {...props} socket={this.state.socket} user={this.state.socket.user} />}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
