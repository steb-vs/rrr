import React, { useContext, useEffect, useState } from "react";
import pieces from "../constants/pieces";
import { GameContext } from "../contexts/GameProvider";

const GameButton = ({
  title,
  index,
  handleClick: updateIndex,
  activeSection
}) => {
  const { updateCurrentPiece } = useContext(GameContext);
  const [value, setValue] = useState({ selectedValue: "", keyCategory: "" });
  const isActive = index === activeSection;

  useEffect(() => {
    if (!isActive && activeSection !== null) {
      console.log({ activeSection });

      const activeCategory = Object.keys(pieces)[activeSection];
      //   console.log({ activeCategory });

      const selectedValue = Object.values(pieces[activeCategory])[index];
      //   console.log({ selectedValue });

      const keyCategory = activeCategory.slice(0, -1);
      //   console.log({ keyCategory });

      setValue({ selectedValue, keyCategory });
    }
  }, [activeSection]);

  function handleClick(index) {
    if (!isActive && activeSection !== null) {
      updateCurrentPiece(value.keyCategory, value.selectedValue);
      updateIndex(null, true);
    } else updateIndex(index);
  }

  return (
    <div
      style={{
        gridArea: Object.keys(pieces)[index],
        border: "2px solid black"
      }}
      onClick={() => handleClick(index)}
    >
      {!isActive && activeSection !== null
        ? value.selectedValue
        : JSON.stringify(title, null, 2)}
    </div>
  );
};

export default GameButton;
