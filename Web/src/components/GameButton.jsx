import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import pieces from "../constants/pieces";
// import config from "../constants/config";
import { GameContext } from "../contexts/GameProvider";

const reqBrandlogo = require.context("../assets/brands", true, /\.png$/);
const reqSizeImg = require.context("../assets/sizes", true, /\.png$/);
const reqShapeImg = require.context("../assets/shapes", true, /\.png$/);
const reqCategoryImg = require.context("../assets/categories", true, /\.png$/);

const useStyles = createUseStyles({
  buttonWrapper: {
    backgroundColor: "black"
  }
});

const GameButton = ({
  title,
  index,
  handleClick: updateIndex,
  activeSection
}) => {
  const { updateCurrentPiece, currentPiece } = useContext(GameContext);
  const [value, setValue] = useState({ selectableValue: "", keyCategory: "" });
  const classes = useStyles();

  const isActive = index === activeSection;

  useEffect(() => {
    if (!isActive && activeSection !== null) {
      const activeCategory = Object.keys(pieces)[activeSection];

      const selectableValue = Object.values(pieces[activeCategory])[
        index > activeSection ? index - 1 : index
      ];

      const keyCategory = activeCategory.slice(0, -1);

      setValue({ selectableValue, keyCategory });
    } else {
      setValue({ selectableValue: null, keyCategory: null });
    }
  }, [activeSection]);

  function handleClick(index) {
    if (!isActive && activeSection !== null) {
      updateCurrentPiece(value.keyCategory, value.selectableValue);
      updateIndex(null, true);
    } else {
      updateIndex(index);
    }
  }

  const renderContent = () => {
    if (
      // activeSection === config.pieces.brands &&
      !isActive &&
      value.selectableValue
    ) {
      const activeCategory = Object.keys(pieces)[activeSection];
      let backgroundImage = null;
      switch (activeCategory) {
        case "brands":
          backgroundImage = `url(${reqBrandlogo(
            `./${value.selectableValue}.png`
          )})`;
          break;
        case "shapes":
          backgroundImage = `url(${reqShapeImg(
            `./${value.selectableValue}.png`
          )})`;
          break;
        case "sizes":
          let size;
          switch (value.selectableValue) {
            case 0.6: {
              size = "small";
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
          backgroundImage = `url(${reqSizeImg(`./${size}.png`)})`;
          break;
        case "colors": {
          return (
            <div
              style={{
                backgroundColor: value.selectableValue,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "norepeat",
                height: "100%",
                width: "100%",
                boxShadow:
                  currentPiece[value.keyCategory] === value.selectableValue
                    ? "inset 0 0 20px #000000"
                    : "none"
              }}
            ></div>
          );
        }
        default: {
          break;
        }
      }
      return (
        <div
          style={{
            backgroundImage,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "norepeat",
            height: "100%",
            width: "100%",
            boxShadow:
              currentPiece[value.keyCategory] === value.selectableValue
                ? "inset 0 0 20px #000000"
                : "none"
          }}
        ></div>
      );
    } else {
      return value.selectableValue;
    }
  };

  return (
    <div
      className={classes.buttonWrapper}
      style={{
        gridArea: Object.keys(pieces)[index],
        border: "2px solid black",
        cursor: "pointer"
      }}
      onClick={() => handleClick(index)}
    >
      {!isActive && activeSection !== null ? (
        renderContent()
      ) : (
        <div
          style={{
            backgroundImage: `url(${reqCategoryImg(`./${title}.png`)})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "norepeat",
            height: "100%",
            width: "100%"
          }}
        ></div>
      )}
    </div>
  );
};

export default GameButton;
