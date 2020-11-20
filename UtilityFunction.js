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

function calculateValueOfHline() {
	let result = 0
	for (let i = 0; i < allLines.length; i++) {
		if (allLines[i].color === "green") {
			result += 1
		}
	}
	return result
}

function findBestHLine() {
	allPoints.sort((a,b) => a.x-b.x)
	let best = 0
	let bestHLine = null;
	// find for left to right and then right to left
	for (let i = 0; i < allPoints.length; i++) {
		hLine = new MyLine(qPoint, allPoints[i]);
		refreshIntersectionPoints()
		let current = calculateValueOfHline()
		if (current > best) {
			best = current
			bestHLine = hLine;
		}
	}
	for (let i = allPoints.length-1; i < 0; i--) {
		hLine = new MyLine(qPoint, allPoints[i]);
		refreshIntersectionPoints()
		let current = calculateValueOfHline()
		if (current > best) {
			best = current
			bestHLine = hLine;
		}
	}
	hLine = bestHLine;
	refreshIntersectionPoints()
	console.log("finished")
	console.log(best)
	console.log(hLine)

}