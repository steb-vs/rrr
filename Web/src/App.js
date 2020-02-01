import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
// import Pixi from "./components/pixi";
import socketIOClient from "socket.io-client";

const endpoint = "http://127.0.0.1:5000";

function App() {
  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("test", data => console.log({ data }));
  }, []);
  // Pixi();

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Router exact path="/game">
          <Game />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
