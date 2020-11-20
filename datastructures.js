class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.refreshColor();

	}

	refreshColor(line = hLine) {
		if (this.isInHalfPlane(line)) {
			this.color = "green";
		} else {
			this.color = "red";
		}
	}

	isInHalfPlane(line = hLine) {
		//if they show the same turn, they are in the same side of the line
		if (line === null || qPoint === null) {return true} //no half plane, so it's in
		let qTurn = getTurn(qPoint, line.a, line.b)
		// If the point q is on the line, we consider it on the left
		if (qTurn === 0 ) {
			qTurn = 1;
		}
		let pointTurn = getTurn(this, line.a, line.b);
		// If the point is on the line, we consider it on the left
		if (pointTurn === 0 ) {
			pointTurn = 1;
		}
		return (qTurn === pointTurn)
	}

	isUninitialized() {
		return (this.x === null || this.y === null);
	}

	draw(kwArgs) {
		if (this !== qPoint) {
			stroke(this.color)
			fill(this.color)
		}
		setStroke(kwArgs);
		ellipse(this.x, this.y, 6);
		resetStroke();
	}
}

class LineSegment {
	constructor(pointA, pointB) {
		this.a = pointA;
		this.b = pointB;
		this.points = [];
		this.color = "black"; //black
	}

	addNewPoint(point) {
		//This method will set the colour to red if the point is not inside half plane
		//or will keep the colour green if it doesn't change the line property
		this.points.push(point);
		this.refreshColor();


	}

	temporarilyChangeColor(point) {
		if (!point.isInHalfPlane()) {
			this.color = "red"; //RED
		}
	}

	refreshColor(separator=hLine) {
		for (let i = 0; i < this.points.length; i++) {
			if (!this.points[i].isInHalfPlane(separator)) {
				this.color = "red"; //RED
				return;
			}
		}
		this.color = "green"; //GREEN
	}

	intersects(other) {
		if (this.isUninitialized()) {return new Point(null, null)}
		// Calculating using determinant, translated to from math to javascript from source : https://mathworld.wolfram.com/Line-LineIntersection.html
		const x1 = this.a.x;const y1 = this.a.y;const x2 = this.b.x;const y2 = this.b.y;

		const x3 = other.a.x;const y3 = other.a.y;const x4 = other.b.x;const y4 = other.b.y;

		const xPoint = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4)) /
			((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));

		const yPoint = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4)) /
			((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));


		//Since the division by 0 is allowed in Javascript, if two lines are parralel, the point will have Infinite as x and y
		return new Point(xPoint, yPoint)
	}
	isUninitialized() {
		return (this.a === null || this.a.x === null || this.a.y === null ||
			this.b === null || this.b.x === null ||this.b.y === null)
	}
	draw(kwArgs) { //This method will draw (p5js) the shape using keyword args to change the color or stroke for example
		if (this.isUninitialized()) {return;}
		setStroke({colorValue:this.color, fillValue:this.color}); //use the line color
		setStroke(kwArgs);//overwrite if necessary
		line(this.a.x, this.a.y, this.b.x, this.b.y)
		resetStroke();
	}
}

class MyLine extends LineSegment {
	constructor(pointA, pointB) {
		super(pointA, pointB);
		this.a = this.intersects(borders[0]); //the top point is the intersection of this line and the top border
		this.b = this.intersects(borders[2]); //the bot point is the intersection of this line and the bot border
		if (this.a.x === Infinity || this.b.x === Infinity) {
			//Parallel to both borders so we have to make them intersect left and right border
			this.a = new Point(0, pointA.y); // the top point is the most left possible point at y = mouseY
			this.b = new Point(borders[1].a.x, pointB.y); // the bot point is the right most point at y = mouseY
		}
	}
}

class Polygon {
	constructor(points) {
		this.vertices = [...points]
	}
	draw() {
		beginShape();
		for (let i = 0; i < this.vertices.length; i++) {
			vertex(this.vertices[i].x, this.vertices[i].y)
		}
		endShape();
	}

}