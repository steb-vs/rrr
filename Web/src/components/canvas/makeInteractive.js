let startDragX, startDragY, lastDragTime;
const speedMutiplier = 3;

function onDragEnd() {
  this.dragging = false;
  this.data = null;
  const deltaT = performance.now() - lastDragTime;

  this.vy = ((this.y - startDragY) / deltaT) * speedMutiplier;
  this.vx = ((this.x - startDragX) / deltaT) * speedMutiplier;
  // console.log("onDragEnd", deltaT, dy, dx);
}

function onDragMove(event) {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
    if (this.y + this.height / 2 >= window.canvasHeight) {
      this.dragging = false;
    }
    if (this.y - this.height / 2 < 0) {
      this.dragging = false;
    }

    console.log("onDragMove", event);
  }
}

function onDragStart(event) {
  this.vy = 0;
  this.vx = 0;
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.dragging = true;
  startDragX = this.x;
  startDragY = this.y;
  lastDragTime = performance.now();

  console.log("onDragStart", event);
}

export const makeInteractive = sprite => {
  sprite
    // events for drag start
    .on("mousedown", onDragStart)
    .on("touchstart", onDragStart)
    // events for drag end
    .on("mouseup", onDragEnd)
    .on("mouseupoutside", onDragEnd)
    .on("touchend", onDragEnd)
    .on("touchendoutside", onDragEnd)
    // events for drag move
    .on("mousemove", onDragMove)
    .on("touchmove", onDragMove);
};
