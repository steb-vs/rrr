import React, { useState } from "react";
import { createUseStyles } from "react-jss";

import pieces from "../constants/pieces";
import GameButton from "./GameButton";
import backIcon from "../assets/back.png";

const piecesTitles = Object.keys(pieces);

const useStyles = createUseStyles({
  buttonWrapper: {
    backgroundColor: "blue"
  }
});

const Menu = () => {
  const [activeSection, setActiveSection] = useState(null);

  const classes = useStyles();

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
              className={classes.buttonWrapper}
              style={{
                gridArea: title,
                border: "2px solid black",
                cursor: "pointer"
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${backIcon})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "norepeat",
                  height: "100%",
                  width: "100%"
                }}
              ></div>
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
