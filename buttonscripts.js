var isSegmentMode = false;
var isNextClickQ = false;
var isNextLineHalfPlane = false;

function nextClickIsQ() {
	canvas.mouseClicked(canvasClickedForQPoint);
}

function switchSegmentMode() {
	isSegmentMode = ! isSegmentMode;
}

function nextLineIsHalfPlane() {
	hLine = null;
	isNextLineHalfPlane = true;
}