import React, { useContext, useEffect, useState } from "react";
import pieces from "../constants/pieces";
import config from "../constants/config";
import { GameContext } from "../contexts/GameProvider";

const reqBrandlogo = require.context("../assets/brands", true, /\.png$/);

const GameButton = ({
  title,
  index,
  handleClick: updateIndex,
  activeSection
}) => {
  const { updateCurrentPiece } = useContext(GameContext);
  const [value, setValue] = useState({ selectableValue: "", keyCategory: "" });

  const isActive = index === activeSection;

  useEffect(() => {
    if (!isActive && activeSection !== null) {
      const activeCategory = Object.keys(pieces)[activeSection];

      const selectableValue = Object.values(pieces[activeCategory])[
        index > activeSection ? index - 1 : index
      ];

      const keyCategory = activeCategory.slice(0, -1);

      setValue({ selectableValue, keyCategory });
    }
  }, [activeSection]);

  function handleClick(index) {
    if (!isActive && activeSection !== null) {
      updateCurrentPiece(value.keyCategory, value.selectableValue);
      updateIndex(null, true);
    } else updateIndex(index);
  }

  const renderContent = () => {
    if (
      activeSection === config.pieces.brands &&
      !isActive &&
      value.selectableValue
    ) {
      return (
        <div
          style={{
            backgroundImage: `url(${reqBrandlogo(
              `./${value.selectableValue}.png`
            )})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "norepeat",
            height: "100%",
            width: "100%"
          }}
        ></div>
      );
    }
  };

  return (
    <div
      style={{
        gridArea: Object.keys(pieces)[index],
        border: "2px solid black"
      }}
      onClick={() => handleClick(index)}
    >
      {!isActive && activeSection !== null
        ? renderContent()
        : JSON.stringify(title, null, 2)}
    </div>
  );
};

export default GameButton;
