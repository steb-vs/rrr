function onDragEnd() {
  this.dragging = false;
  this.data = null;
  console.log("onDragEnd");
}

function onDragMove(event) {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
    console.log("onDragMove", event);
  }
}

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.dragging = true;

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
