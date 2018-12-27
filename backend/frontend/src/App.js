import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from'./Home';
import Room from'./Room';
import Story from './Story';

import socketIOClient from 'socket.io-client';
class App extends Component {

  state = {socket: socketIOClient('http://localhost:8081')}

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
                render={props => <Story {...props} socket={this.state.socket} />}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
