class Inanimate extends PIXI.Sprite{
  constructor(x,y, tex, scaleX, scaleY,scene){
    super(tex);
    this.x=x;
    this.y =y;
    this.scale.x = scaleX;
    this.scale.y = scaleY
    scene.addChild(this);
  }
}


class Layering extends PIXI.Sprite{
  constructor(x,y, tex, scene, scaleX, scaleY){
    super(tex);
    this.x =x;
    this.y =y;
    this.visible = false;
    this.scale.x = scaleX;
    this.scale.y =scaleY;
    //this.buttonMode = true;
    scene.addChild(this);
  }

  setVisible(){
    this.visible = true;
  }
  setInvisible(){
    this.visible = false;
  }
}

let isInteractive= false;
let originX;
let originY;
class Clothes extends PIXI.Sprite{
  constructor(x, y, anchorX, anchorY, tex,scene, scaleX, scaleY){
    super(tex);
    this.originalPosition = {x,y};
    this.x = x;
    this.y =y;
    this.anchor.set(anchorX, anchorY);
    this.scale.x = scaleX;
    this.scale.y = scaleY;
    this.interactive = true;

    // Add event listeners
    this.on('mousedown', this.onDragStart.bind(this))
      .on('touchstart', this.onDragStart.bind(this))
      .on('mouseup', this.onDragEnd.bind(this))
      .on('mouseupoutside', this.onDragEnd.bind(this))
      .on('touchend', this.onDragEnd.bind(this))
      .on('touchendoutside', this.onDragEnd.bind(this))
      .on('mousemove', this.onDragMove.bind(this))
      .on('touchmove', this.onDragMove.bind(this));
    scene.addChild(this);
  }

 originalPoint(){
    this.x= this.originalPosition.x;
    this.y = this.originalPosition.y;
    //console.log("x: "+ originX+ "y: "+ originY);
  }

  originalY(){
    //this.y= this.originalY;
  }
  onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
  }

  onDragEnd() {
    if (this.dragging) {
      delete this.data;
      this.dragging = false;
    }
  }

  onDragMove() {
    if (this.dragging) {
      const newPos = this.data.getLocalPosition(this.parent);
      this.x = newPos.x;
      this.y = newPos.y;
    }
  }
}

