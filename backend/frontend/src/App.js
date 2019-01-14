import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from'./Home';
import Room from'./Room';
import Story from './Story';
import Voting from './Voting';
import Join from './Join';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

import socketIOClient from 'socket.io-client';
class App extends Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      socket: socketIOClient('https://storythief.herokuapp.com/'),
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }


  render() {
    return (
      <div className="App">
      <Navbar className="bg-light" color="faded" light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <NavbarBrand href="/" className="mr-auto">StoryThief</NavbarBrand>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/ditsky/storythief">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
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
              path="/join"
              render={props => <Join {...props} socket={this.state.socket}/>}
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
