import React from "react";
import pieces from "../constants/pieces";
import GameButton from "./GameButton";

const Menu = () => {
  const buttons = Object.keys(pieces);
  console.log(buttons);
  return (
    <div>
      {buttons.map((piece, i) => (
        <GameButton key={i} piece={piece} />
      ))}
    </div>
  );
};

export default Menu;
