import * as PIXI from "pixi.js";
let builtShape;
const reqShapeImg = require.context("../../assets/shapes", true, /\.png$/);

const drawPiece = (pieceProperties, pixiApp) => {
  if (pieceProperties.shape)
    if (pieceProperties.shape !== "" && !builtShape) {
      // const builtShape = new PIXI.Graphics();
      // builtShape.beginFill(0xde3249);
      // builtShape.drawRect(50, 50, 100, 100);
      // builtShape.endFill();
      // builtShape.interactive = true;
      // builtShape.buttonMode = true;
      builtShape = PIXI.Sprite.from(
        reqShapeImg(`./${pieceProperties.shape}.png`)
      );
      builtShape.x = 100;
      builtShape.y = 100;
      builtShape.width = pieceProperties.size * 200;
      builtShape.height = pieceProperties.size * 200;
      if (pieceProperties.color)
        builtShape.tint = pieceProperties.color.replace("#", "0x");
      builtShape.anchor.set(0.5); // ?
      builtShape.interactive = true;
      builtShape.buttonMode = true;
      builtShape.on("pointerdown", onClick);
      pixiApp.stage.addChild(builtShape);

      function onClick() {
        pixiApp.stage.removeChild(builtShape);
        builtShape = null;
        // postPiece();
      }
    }
  if (pieceProperties.color !== "" && builtShape) {
    builtShape.tint = pieceProperties.color.replace("#", "0x");
  }
  if (builtShape && builtShape.width * 200 !== pieceProperties.size) {
    builtShape.width = pieceProperties.size * 200;
    builtShape.height = pieceProperties.size * 200;
  }
};

export default drawPiece;
