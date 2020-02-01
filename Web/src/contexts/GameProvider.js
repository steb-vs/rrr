/* eslint-disable react/no-unused-state */
import React, { Component } from "react";

export const GameContext = React.createContext();

const apiUrl = "http://192.168.16.61:2020";

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
      updateCurrentPiece: this.updateCurrentPiece,
      postPiece: this.postPiece
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

  postPiece = () => {
    const { currentPiece } = this.state;
    const formattedPiece = {
      direction: currentPiece.direction,
      velocity: currentPiece.velocity,
      properties: {
        brand: currentPiece.brand,
        color: currentPiece.color,
        shape: currentPiece.shape,
        size: currentPiece.size
      }
    };
    fetch(apiUrl, {
      method: "post",
      body: JSON.stringify(formattedPiece) // stringify ?
    })
      .then(res => res.json())
      .then(data => console.log({ data }));
  };

  render() {
    const { children } = this.props;
    return (
      <GameContext.Provider value={this.state}>{children}</GameContext.Provider>
    );
  }
}

export default GameProvider;
