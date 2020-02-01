import React from "react";
import Canvas from "../components/Canvas";
import Menu from "../components/Menu";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Game: {
    display: "grid",
    width: "100vw",
    height: "50vh",
    gridTemplateRows: "50% 50% 50% 50%",
    gridTemplateAreas: `
    'viewer viewer'
    'viewer viewer'
    'colors brands'
    'shapes sizes'`
  }
});

const Game = () => {
  const classes = useStyles();
  return (
    <div className={classes.Game}>
      <Canvas />
      <Menu />
    </div>
  );
};

export default Game;
