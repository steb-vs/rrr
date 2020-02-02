import * as PIXI from "pixi.js";
import { makeInteractive } from "./makeInteractive";
let builtSprite;
let builtBrand;
const reqShapeImg = require.context("../../assets/shapes", true, /\.png$/);
const reqBrandsShapesImg = require.context(
  "../../assets/brands-shapes",
  true,
  /\.png$/
);

const basePieceSizeRatio = 0.3;

const textures = {
  circle: PIXI.Texture.from(reqShapeImg("./circle.png")),
  cylinder: PIXI.Texture.from(reqShapeImg("./cylinder.png")),
  square: PIXI.Texture.from(reqShapeImg("./square.png"))
};

const drawPiece = (pieceProperties, pixiApp, clear) => {
  if (pieceProperties.shape === "" && !pieceProperties.shape) return;
  const canvasWidth = pixiApp.screen.width;
  const canvasHeight = pixiApp.screen.height;
  const maxSpace = Math.min(canvasWidth, canvasHeight);
  const pieceSize = pieceProperties.size * (maxSpace * basePieceSizeRatio);

  if (!builtSprite) {
    builtSprite = PIXI.Sprite.from(textures[pieceProperties.shape]);
    builtSprite.anchor.set(0.5);
    builtSprite.interactive = true;
    builtSprite.buttonMode = true;

    builtSprite.x = canvasWidth / 2;
    builtSprite.y = canvasHeight / 2;

    makeInteractive(builtSprite);

    pixiApp.stage.addChild(builtSprite);
  } else {
    builtSprite.texture = textures[pieceProperties.shape];
  }

  // Add brand
  if (pieceProperties.brand !== "" && builtSprite && !builtBrand) {
    console.log(
      "brand path",
      `./${pieceProperties.brand}-${pieceProperties.shape}.png`
    );
    builtBrand = PIXI.Sprite.from(
      PIXI.Texture.from(
        reqBrandsShapesImg(
          `./${pieceProperties.brand}-${pieceProperties.shape}.png`
        )
      )
    );
    builtBrand.anchor.set(0.5);
    builtBrand.x = builtSprite.x;
    builtBrand.y = builtSprite.y;
    builtBrand.zOrder = 1;
    pixiApp.stage.addChild(builtBrand);
  } else if (builtBrand) {
    builtBrand.texture = PIXI.Texture.from(
      reqBrandsShapesImg(
        `./${pieceProperties.brand}-${pieceProperties.shape}.png`
      )
    );
  }

  if (pieceProperties.color !== "" && !!pieceProperties.color) {
    builtSprite.tint = pieceProperties.color.replace("#", "0x");
  }

  if (pieceProperties.size !== "" && !!pieceProperties.size) {
    builtSprite.width = pieceSize;
    builtSprite.height = pieceSize;
  }

  if (pieceProperties.size !== "" && !!pieceProperties.size && builtBrand) {
    builtBrand.width = pieceSize;
    builtBrand.height = pieceSize;
  }
  console.log("builtSprite", builtSprite);
};

export default drawPiece;
