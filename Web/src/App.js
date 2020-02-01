import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import socketIOClient from "socket.io-client";
import GameProvider from "./contexts/GameProvider";

const endpoint = "http://127.0.0.1:5000";

function App() {
  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("test", data => console.log({ data }));
  }, []);

  return (
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
}

export default App;
