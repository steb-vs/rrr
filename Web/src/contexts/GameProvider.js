/* eslint-disable react/no-unused-state */
import React, { Component } from "react";

export const GameContext = React.createContext();

class GameProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPiece: {
        direction: {
          x: 0.5,
          y: 0.5
        },
        velocity: 15.983,
        brand: "",
        color: "",
        shape: "",
        size: -1
      },
      updateCurrentPiece: this.updateCurrentPiece
    };
  }

  updateCurrentPiece = (key, value) => {
    this.setState(
      prevState => {
        return {
          currentPiece: {
            ...prevState.currentPiece,
            [key]: value
          }
        };
      },
      () => {
        console.log(this.state.currentPiece);
      }
    );
  };

  render() {
    const { children } = this.props;
    return (
      <GameContext.Provider value={this.state}>{children}</GameContext.Provider>
    );
  }
}

export default GameProvider;
