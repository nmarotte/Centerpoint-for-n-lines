function setQPoint(point) {
	q = point;
}

function setHLine(line) {
	hLine = line;
}

function getMousePoint() {
	return new Point(mouseX, mouseY);
}

function createAndPushLine(pointA, pointB) {
	allLines.push(new MyLine(pointA, pointB));
}

function resetClickedFunction() {
	canvas.mouseClicked(canvasClickedForLine);
}