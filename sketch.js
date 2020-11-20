let canvas;
let points = [];
let lines = [];

function setup() {
    canvas = createCanvas(document.getElementById("canvasContainer").offsetWidth, windowHeight)
    canvas.parent("canvasContainer");

    background(200)

}

function draw() {
    lines.forEach(line => line.display());
    points.forEach(point => point.display());
}

function resetStroke() {
    stroke("black")
    strokeWeight(1)
}