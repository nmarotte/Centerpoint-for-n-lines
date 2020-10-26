var canvas;
var canvasDiv;

var firstPointOfLineSegment;
var allLines = new DrawableArray();
var allPoints = new DrawableArray();
var allShapes = new DrawableArray();
var corners = [null, null, null, null];
var borders = [null, null, null, null];
var tmpPreviewLine;

var q = new Point(null,null);
var hLine = new MyLine(null, null);

var isNextClickLastLineSegmentPoint = false;
var finishLine = false;

function addNewIntersectionPoints() {
	//Check the last added line with every other line
	for (var i = 0; i < allLines.length-1; i++) {
		allPoints.push(allLines[allLines.length-1].intersects(allLines[i]))
	}
}


// Each button will modify what happens when we click, and then reset once their task is over

function canvasClickedForLine() {
	if (! finishLine) { // First point of the line
		firstPointOfLineSegment = getMousePoint();
	} else { // Second point of the line
		createAndPushLine(firstPointOfLineSegment, getMousePoint());
		addNewIntersectionPoints();
	}
	finishLine = ! finishLine; //if true the line is now finished so false, if false next click has to be true
}

function canvasClickedForHalfplane() {
	if (! finishLine) { // First point of the half plane separator
		firstPointOfLineSegment = getMousePoint();
	} else { // Second point of the half plane separator
		setHLine(new MyLine(firstPointOfLineSegment, getMousePoint()))
		resetClickedFunction();
	}
	finishLine = ! finishLine; //if true the line is now finished so false, if false next click has to be true
}

function canvasClickedForQPoint() {
	setQPoint(getMousePoint());
	resetClickedFunction();
}

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
	canvas.mouseClicked(canvasClickedForLine)
	resetStroke();
}

function draw() {
	background(125);
	if (finishLine) {
  		drawPreviewLine();
		drawPreviewIntersectionPoints();
  	}
	allLines.draw(); //draw all allLines in the DrawableArray
	allPoints.drawWithColor(q, hLine); //draw all intersections
  	
	q.draw();
	strokeWeight(3);
	hLine.draw();
	resetStroke();
}

function resetStroke() {
	stroke(0,0,0, 255);
	strokeWeight(1);
	fill(0,0,0,255)
}

function drawPreviewIntersectionPoints() {
	//This function highlight the intersecting allLines in red and the parallel lines in green
	for (var i = 0; i < allLines.length; i++) {
		var intersectionPoint = tmpPreviewLine.intersects(allLines[i]);
		if (intersectionPoint !== null) {
			intersectionPoint.drawWithColor(q, hLine)
		}
	}
}


function drawPreviewLine() {
	//draw a line from the clicked point to the mouse position
	tmpPreviewLine = new MyLine(firstPointOfLineSegment, getMousePoint());
	stroke(70,70,70)
	tmpPreviewLine.draw()
	resetStroke();
}

function windowResized() {
	resizeCanvas(canvasDiv.offsetWidth,windowHeight)
	//resetting the line borders in case there was one parallel that need a new endpoint on the right
	createBorders()
	for (var i = 0; i < allLines.length; i++) {
		allLines[i] = new MyLine(allLines[i].topPoint, allLines[i].botPoint);
	}
	setHLine(new MyLine(hLine.topPoint, hLine.botPoint));
}

function getTurn(a, b, c) {
  var determinant =
    a.x * (b.y - c.y) - a.y * (b.x - c.x) + (b.x * c.y - c.x * b.y);
  if (determinant < 0) return -1;
  if (determinant === 0) return 0;
  if (determinant > 0) return 1;
}
