import React from "react";
import pieces from "../constants/pieces";

const GameButton = ({ type }) => {
  return (
    <div
      style={{
        backgroundImage: `../assets/${type}.png`
      }}
    >
      {JSON.stringify(type, null, 2)}
    </div>
  );
};

export default GameButton;
