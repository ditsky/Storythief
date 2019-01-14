import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './App.css';

class Home extends Component {

  render() {
    return (
      <div className="Home">
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <h1 className="lg"> StoryThief </h1>
        <br>
        </br>
        <div className="width jumbotron bg-light">

            <p className="center"> StoryThief is a deception game where all players are attempting to
            discover who is the spy, and the spy needs to try to avoid getting caught!
            Everyone needs to take turns adding to the story based on the given prompt.
            If you are the spy, you will not recieve the prompt, and have to try and blend
            in without it! </p>

        </div>

        <Button href="/join" color="danger" size="lg"> Play Now</Button>
        <br>
        </br>
        <br>
        </br>
      </div>
    );
  }
}

export default Home;
