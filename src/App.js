import React, { Component } from 'react';
import './scss/style.min.css';
import Game from "./Game/Game.js";


class App extends Component {
  render() {
    return (
      <div>
          <Game />
      </div>
    );
  }
}

export default App;
