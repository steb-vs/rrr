import React, { useState } from "react";
import pieces from "../constants/pieces";
import GameButton from "./GameButton";

const piecesTitles = Object.keys(pieces);

const Menu = () => {
  const [activeSection, setActiveSection] = useState(null);
  // const [selectedIndex, setSelectedIndex] = useState(null);
  // const [buttons, setButtons] = useState(Object.keys(pieces));

  function handleClick(index, clear) {
    console.log();

    if (index === activeSection || clear) {
      setActiveSection(null);
      console.log("Clear active section ");
    } else {
      console.log("New active section ", index);
      setActiveSection(index);
    }
    // const category = Object.keys(pieces)[index];
    // console.log({ category });
    // setActiveSection()
    // setSelectedIndex(index);
    // setButtons(Object.keys(pieces[category]));
    // setMainButtons(!mainButtons);
  }

  return (
    <>
      {piecesTitles.map((title, i) => {
        if (i === activeSection)
          return (
            <div
              onClick={() => handleClick(i)}
              style={{
                gridArea: title,
                border: "2px solid black"
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
