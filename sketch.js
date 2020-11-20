let canvas;
let canvasDiv;

let lastClickPoint;
let allLines = [];
let allPoints = [];
let allShapes = [];
let corners = [null, null, null, null];
let borders = [null, null, null, null];
let tmpPreviewLine;
let tmpIntersectionPoints = [];

let hLine = null;
let qPoint = null;

let epsilon = 0.0005

function createBorders() {
	corners = [new Point(0,0), new Point(canvasDiv.offsetWidth, 0),
		new Point(canvasDiv.offsetWidth, windowHeight), new Point(0, windowHeight)];
	borders = [new LineSegment(corners[0], corners[1]), new LineSegment(corners[1], corners[2]),
		new LineSegment(corners[2], corners[3]), new LineSegment(corners[3], corners[0])]
}

function setup() {
	canvasDiv = document.getElementById("canvasContainer");
	createBorders();

	canvas = createCanvas(canvasDiv.offsetWidth,windowHeight);
	canvas.parent("canvasContainer");

	//Adding on click function
	canvas.mouseClicked(canvasClickedStartLine)
	resetStroke();
}

function draw() {
	background(125);

	if (tmpPreviewLine != null) tmpPreviewLine.draw({colorValue:[75,75,75,255], weightValue:isNextLineHalfPlane?3:1});
	if (hLine !== null) hLine.draw({weightValue:3})
	if (qPoint !== null) qPoint.draw();

	tmpIntersectionPoints.forEach(point => point.draw()); //draw all temp intersections
	allLines.forEach(line => line.draw()); //draw all allLines in the DrawableArray
	allPoints.forEach(point => point.draw()); //draw all intersections
}


function windowResized() {
	resizeCanvas(canvasDiv.offsetWidth,windowHeight)
	//resetting the line borders in case there was one parallel that need a new endpoint on the right
	createBorders()
	for (let i = 0; i < allLines.length; i++) {
		allLines[i] = new MyLine(allLines[i].topPoint, allLines[i].botPoint);
	}
}

function getTurn(a, b, c) {
	let determinant =
		a.x * (b.y - c.y) - a.y * (b.x - c.x) + (b.x * c.y - c.x * b.y);
	if (determinant < 0-epsilon) return -1;
	if (determinant > 0+epsilon) return 1;
	return 0
}
