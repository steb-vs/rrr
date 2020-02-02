import React, { useEffect, useRef, useContext } from "react";
import * as PIXI from "pixi.js";
import { GameContext } from "../../contexts/GameProvider";
const reqShapeImg = require.context("../../assets/shapes", true, /\.png$/);

export let pixiApp;
let shape = null;

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
        backgroundColor: 0x10bb99,
        view: canvas
      });

      const handleResize = () => {
        const canvasWrapper = document.getElementById("canvasWrapper");
        pixiApp.renderer.resize(window.innerWidth, canvasWrapper.clientHeight);
      };
      window.onresize = handleResize;
    }
  }, []);

  useEffect(() => {
    if (currentPiece.shape !== "" && !shape) {
      console.log("CREATE SHAPE ", currentPiece.shape);
      // const shape = new PIXI.Graphics();
      // shape.beginFill(0xde3249);
      // shape.drawRect(50, 50, 100, 100);
      // shape.endFill();
      // shape.interactive = true;
      // shape.buttonMode = true;
      shape = PIXI.Sprite.from(reqShapeImg(`./${currentPiece.shape}.png`));
      shape.x = 50;
      shape.y = 50;
      shape.interactive = true;
      shape.buttonMode = true;
      shape.on("pointerdown", onClick);
      pixiApp.stage.addChild(shape);

      function onClick() {
        pixiApp.stage.removeChild(shape);
        shape = null;
        postPiece();
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
    </div>
  );
};

export default Canvas;
