import * as PIXI from "pixi.js";

export default function pixi() {
  const app = new PIXI.Application({
    width: 854,
    height: 480,
    resolution: window.devicePixelRatio || 1,
    backgroundColor: 0x1099bb,
    antialias: true
  });
  document.body.appendChild(app.view);

  class Square {
    constructor(width, height, x, y, color) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.color = color;
    }
  }

  const buttons = [
    new Square(50, 50, 100, 100, 0xde3249),
    new Square(50, 50, 200, 100, 0xae1111)
  ];

  for (const button of buttons) {
    const { width, height, x, y, color } = button;
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawRect(x, y, width, height);
    graphics.endFill();
    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics
      .on("mousedown", () => onButtonDown(button))
      .on("touchstart", () => onButtonDown(button));
    app.stage.addChild(graphics);
  }

  function onButtonDown(button) {
    console.log("on button down");
    console.log({ button });
    const { width, height, x, y, color } = button;
    createShape(
      width,
      height,
      Math.floor(Math.random() * app.screen.width),
      Math.floor(Math.random() * app.screen.height),
      color
    );
  }

  function createShape(width, height, x, y, color) {
    const shape = new PIXI.Graphics();
    shape.beginFill(color);
    shape.drawRect(x, y, width, height);
    shape.endFill();

    shape.interactive = true;
    shape.buttonMode = true;

    shape
      .on("pointerdown", onDragStart)
      .on("pointerup", onDragEnd)
      .on("pointerupoutside", onDragEnd)
      .on("pointermove", onDragMove);

    shape.x = x;
    shape.y = y;

    app.stage.addChild(shape);
  }

  function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
  }

  function onDragMove(event) {
    if (this.dragging) {
      //   console.log({ event });
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }
  //   app.ticker.add(function(delta) {
  //     console.log(delta);
  //   });
}
