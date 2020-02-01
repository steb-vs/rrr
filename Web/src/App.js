import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameProvider from "./contexts/GameProvider";

const App = () => (
  <GameProvider>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Router exact path="/game">
          <Game />
        </Router>
      </Switch>
    </Router>
  </GameProvider>
);

export default App;
