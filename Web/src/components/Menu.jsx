import React from "react";
import pieces from "../constants/pieces";
import GameButton from "./GameButton";

const Menu = () => {
  const buttons = Object.keys(pieces);
  console.log(buttons);
  return (
    <>
      {buttons.map((piece, i) => (
        <div style={{ gridArea: piece, border: "2px solid black" }}>
          <GameButton key={i} piece={piece} />
        </div>
      ))}
    </>
  );
};

export default Menu;
