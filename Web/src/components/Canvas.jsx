import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [app, setApp] = useState(null);
  // useEffect(() => {
  //   if (canvasRef.current) {
  //     setApp(
  //       new Application({
  //         width: 800,
  //         height: 600,
  //         backgroundColor: 0x10bb99,
  //         view: canvasRef.current
  //       })
  //     );
  //   }
  // });
  return (
    <div style={{ gridArea: "viewer", border: "2px solid black" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
