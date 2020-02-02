import React, { useState } from "react";
import pieces from "../constants/pieces";
import GameButton from "./GameButton";

const piecesTitles = Object.keys(pieces);

const Menu = () => {
  const [activeSection, setActiveSection] = useState(null);

  function handleClick(index, clear) {
    if (index === activeSection || clear) {
      setActiveSection(null);
      console.log("Clear active section ");
    } else {
      console.log("New active section ", index);
      setActiveSection(index);
    }
  }

  console.log({ piecesTitles });

  return (
    <>
      {piecesTitles.map((title, i) => {
        if (i === activeSection)
          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              style={{
                gridArea: title,
                border: "2px solid black",
                cursor: "pointer"
              }}
            >
              BACK
            </div>
          );
        return (
          <GameButton
            key={i}
            index={i}
            title={title}
            handleClick={handleClick}
            activeSection={activeSection}
          />
        );
      })}
    </>
  );
};

export default Menu;
