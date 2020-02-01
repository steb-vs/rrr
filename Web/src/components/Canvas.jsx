import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

const Canvas = () => {
  const canvasWrapperRef = useRef(null);
  const [app, setApp] = useState(null);
  useEffect(() => {
    if (canvasWrapperRef.current) {
      const canvas = document.getElementById("canvas");
      const { clientHeight } = canvasWrapperRef.current;

      const pixiApp = new PIXI.Application({
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
      setApp(pixiApp);
    }
  }, []);
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
