function skyColor(date) {
  //TODO
  return "blue";
}

function moonPhase(date) {
  //TODO
}

function copyToClipboard(canvas) {
  canvas.toBlob((blob) => {
    let item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
    alert("Copied image to clipboard");
  });
}

function enforceMinMax(el){
  if(el.value != ""){
    if(parseInt(el.value) < parseInt(el.min)){
      el.value = el.min;
    }
    if(parseInt(el.value) > parseInt(el.max)){
      el.value = el.max;
    }
  }
}

class Point {
  constructor(offset, mod) {
    this.angle = 0+offset;
    this.mod = mod;

    this.updateRec();
  }
  moveToAngle(angle) {
    this.angle = angle;

    this.updateRec();
    return {
      x: this.x,
      y: this.y
    }
  }
  moveToRec(a, b) {
    this.x = this.mod*a;
    this.y = this.mod*b;

    this.updateAng();
    return {
      mod: this.mod,
      angle: this.angle
    }
  }
  updateAng() {
    this.angle = Math.atan2(this.x, this.y);
  }
  updateRec() {
    this.x = this.mod*Math.cos(this.angle);
    this.y = this.mod*Math.sin(this.angle);
  }
}
