/* eslint-disable react/no-unused-state */
import React, { Component } from "react";

export const GameContext = React.createContext();

class GameProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "pouet"
    };
  }

  render() {
    const { children } = this.props;
    return (
      <GameContext.Provider value={this.state}>{children}</GameContext.Provider>
    );
  }
}

export default GameProvider;
