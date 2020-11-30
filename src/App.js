import React from "react";

import './App.css';

import 'fontsource-roboto';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Home from "./pages/home/Home";
import Worlds from "./pages/worlds/Worlds";
import Game from "./pages/game/Game";

class App extends React.Component{
  render() {
    return (
      <div className="primary">
        <div className="container">
          <Router>
            <Switch>
              <Route path="/worlds/01/game">
                <Game game={this.props.game} scene={this.props.scene}/>
              </Route>
              <Route path="/worlds">
                <Worlds/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
