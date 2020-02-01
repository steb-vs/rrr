import React from "react";
import pieces from "../constants/pieces";

const GameButton = ({ title, index, handleClick, activeSection }) => {
  const isActive = index === activeSection;
  return (
    <div
      style={{
        gridArea: Object.keys(pieces)[index],
        border: "2px solid black"
      }}
      onClick={() => handleClick(index)}
    >
      {!isActive && activeSection !== null
        ? JSON.stringify(pieces[title], null, 2)
        : JSON.stringify(title, null, 2)}
    </div>
  );
};

export default GameButton;
