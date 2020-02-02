import React, { useEffect, useRef, useContext } from "react";
import * as PIXI from "pixi.js";
import { GameContext } from "../../contexts/GameProvider";
import drawPiece from "./drawPiece";
import createBackground from "./starBackground";
// import "./crtOverlay.scss";

export let pixiApp;
let currentShapeName = "";

const Canvas = () => {
  const { currentPiece, postPiece } = useContext(GameContext);
  const canvasWrapperRef = useRef(null);

  useEffect(() => {
    if (canvasWrapperRef.current) {
      const canvas = document.getElementById("canvas");
      const { clientHeight } = canvasWrapperRef.current;
      pixiApp = new PIXI.Application({
        autoResize: true,
        width: window.innerWidth,
        height: clientHeight,
        resolution: devicePixelRatio,
        // backgroundColor: 0x10bb99,
        view: canvas
      });
      createBackground(pixiApp);

      pixiApp.ticker.add(function(delta) {
        // console.log(delta);
      });

      const handleResize = () => {
        const canvasWrapper = document.getElementById("canvasWrapper");
        pixiApp.renderer.resize(window.innerWidth, canvasWrapper.clientHeight);
      };
      window.onresize = handleResize;
    }
  }, []);

  useEffect(() => {
    if (pixiApp) {
      if (currentPiece.shape !== currentShapeName) {
        drawPiece(currentPiece, pixiApp, true);
        currentShapeName = currentPiece.shape;
      } else {
        drawPiece(currentPiece, pixiApp);
      }
    }
  }, [currentPiece]);
  return (
    <div
      id="canvasWrapper"
      ref={canvasWrapperRef}
      style={{ gridArea: "viewer", border: "2px solid black" }}
    >
      <canvas id="canvas"></canvas>
      {/*<input type="checkbox" id="switch" checked></input>*/}
      {/*<div className="overlay">AV-1</div>*/}
    </div>
  );
};

export default Canvas;
