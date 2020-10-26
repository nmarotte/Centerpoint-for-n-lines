function getMousePoint() {
	return new Point(mouseX, mouseY);
}

function addLine(pointA, pointB) {
	allLines.push(new MyLine(pointA, pointB));
	addNewIntersectionPoints();
}


function addNewIntersectionPoints() {
	//Check the last added line with every other line
	let lastLine = allLines[allLines.length-1];
	for (let i = 0; i < allLines.length-1; i++) {
		let point = lastLine.intersects(allLines[i]);
		allPoints.push(point);
		lastLine.addNewPoint(point);
		allLines[i].addNewPoint(point);

	}
}

function refreshIntersectionPoints() {
	allPoints = [];
	for (let i = 0; i < allLines.length-1; i++) {
		for (let j = i+1; j < allLines.length; j++) {
			let point = allLines[i].intersects(allLines[j]);
			allPoints.push(point);
			allLines[i].refreshColor();
			allLines[j].refreshColor();
		}
	}
}

function resetStroke() {
	stroke(0,0,0, 255);
	strokeWeight(1);
	fill(0,0,0,255)
}

function setStroke({weightValue, colorValue, fillValue} = {}) {
	if (weightValue !== undefined) {
		strokeWeight(weightValue);
	}
	if (colorValue !== undefined) {
		stroke(colorValue);
	}
	if (fillValue !== undefined) {
		fill(fillValue);
	}
}