let lat = document.getElementById("lat");
let lon = document.getElementById("lon");
let canvas = document.getElementById("canvas");
let dateTime = document.getElementById("date");
let mode = document.getElementById("selectMode");
let setTime = document.getElementById("setTime");
let riseTime = document.getElementById("riseTime");
let currentTime = document.getElementById("currentTime");
let squareSize = document.getElementById("squareSize");

let ctx = canvas.getContext("2d");
let sun = new Image();
let moon = new Image();

sun.crossOrigin = "Anonymous";
sun.src = "./assets/images/sun.png"; //TODO: moon phases
moon.crossOrigin = "Anonymous";
moon.src = "./assets/images/moon.png";

let sunPos = new Point(Math.PI/2, canvas.width/2);
let moonPos = new Point(Math.PI*3/2, canvas.width/2);


function updatePositions() {
  if (mode.checked) {
    let timezone = tzlookup(lat.value, lon.value);
    let date = dateTime.value ? moment.tz(dateTime.value, timezone) : moment().tz(timezone);

    let sunBase = SunCalc.getPosition(date, lat.value, lon.value);
    let moonBase = SunCalc.getMoonPosition(date, lat.value, lon.value);

    sunPos.moveToRec(Math.sin(Math.PI+sunBase.azimuth), Math.sin(sunBase.altitude));
    moonPos.moveToRec(Math.sin(Math.PI+moonBase.azimuth), Math.sin(moonBase.altitude));
  } else {
    let baseDate = "2020-12-12T";
    let diff = (moment(baseDate+setTime.value)-moment(baseDate+riseTime.value))/1000;
    let passedTime = (moment(baseDate+currentTime.value)-moment(baseDate+riseTime.value))/1000
    let angle = passedTime*Math.PI/diff;

    sunPos.moveToAngle(angle);
    moonPos.moveToAngle(sunPos.angle+Math.PI);
  }
}

function updateGraphs() {
  clearGraph();

  ctx.drawImage(sun, canvas.width/2-sun.width/2-sunPos.x, canvas.height+sun.height/2-sunPos.y);
  ctx.drawImage(moon, canvas.width/2-moon.width/2-moonPos.x, canvas.height+moon.height/2-moonPos.y);
}

let lastState = mode.checked;

function formUpdate() {
  let realDiv = document.getElementById("real");
  let fictionalDiv = document.getElementById("fictional");

  if (mode.checked) {
    realDiv.style = "display: block;";
    fictionalDiv.style = "display: none;";
  } else {
    realDiv.style = "display: none;";
    fictionalDiv.style = "display: block;";
  }

  updatePositions();
  updateGraphs();
}

function defaults() {
  lat.defaultValue = 0;
  lon.defaultValue = 0;
  riseTime.defaultValue = "06:00";
  setTime.defaultValue = "18:00";
  currentTime.defaultValue = "12:00";
  squareSize.defaultValue = 10;
  dateTime.value = moment().format("YYYY-MM-DD[T]HH:mm:ss");
}

function clearGraph() {
  //Clear the screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Fill the screen with the current sky color
  ctx.fillStyle = skyColor(dateTime.value);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Put the square:tm: at the center
  ctx.fillStyle = "black";
  ctx.fillRect(canvas.width/2-squareSize.value, canvas.height-squareSize.value, squareSize.value*2, squareSize.value*2);
}

function setup() {
  defaults();
  updatePositions();
  updateGraphs();
}

//Default positions and values
setup();
