/* eslint-disable react/no-unused-state */
import React, { Component } from "react";

export const GameContext = React.createContext();

const apiUrl = "http://192.168.16.61:2020/piece";

const initialCurrentPiece = {
  direction: {
    x: 0.5,
    y: 0.5
  },
  velocity: 15.983,
  brand: "",
  color: "",
  shape: "",
  size: 1
};

class GameProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPiece: initialCurrentPiece,
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
    let rdmXDir = Math.floor(Math.random() * 2);
    let rdmX = Math.random() * 0.5;
    rdmXDir === 1 ? (rdmX *= 1) : (rdmX *= -1);
    let size;
    switch (currentPiece.size) {
      case 0.6: {
        size = "small";
        break;
      }
      case 1: {
        size = "medium";
        break;
      }
      case 1.4: {
        size = "large";
        break;
      }
      default: {
        size = "medium";
        break;
      }
    }
    let color;
    switch (currentPiece.color) {
      case "#fa2323": {
        color = "red";
        break;
      }
      case "#0011c9": {
        color = "blue";
        break;
      }
      case "#07c900": {
        color = "green";
        break;
      }
      default: {
        color = null;
        break;
      }
    }
    const formattedPiece = {
      // direction: currentPiece.direction,
      // velocity: currentPiece.velocity,
      direction: {
        x: rdmX,
        y: Math.random() * 1
      },
      velocity: Math.random() * 1,
      properties: {
        brand: currentPiece.brand === "" ? null : currentPiece.brand,
        color,
        shape: currentPiece.shape === "square" ? "cube" : currentPiece.shape,
        size
      }
    };
    console.log({ formattedPiece });
    fetch(apiUrl, {
      method: "post",
      body: JSON.stringify(formattedPiece)
    });
    // .then(res => res.json())
    // .then(data => console.log({ data }));
    this.setState({ currentPiece: initialCurrentPiece });
  };

  render() {
    const { children } = this.props;
    return (
      <GameContext.Provider value={this.state}>{children}</GameContext.Provider>
    );
  }
}

export default GameProvider;
