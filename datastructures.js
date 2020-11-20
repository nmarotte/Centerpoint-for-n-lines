class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.refreshColor();

	}

	refreshColor(line = hLine) {
		if (this.isInHalfPlane(line)) {
			this.color = [0,255,0,255];
		} else {
			this.color = [255,0,0,255];
		}
	}

	isInHalfPlane(line = hLine) {
		//if they show the same turn, they are in the same side of the line
		if (line === null || qPoint === null) {return true} //no half plane, so we show
		return (getTurn(qPoint, line.topPoint, line.botPoint) === getTurn(this, line.topPoint, line.botPoint))
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
		this.topPoint = pointA;
		this.botPoint = pointB;
		this.points = [];
		this.color = [0,0,0,255]; //black
	}

	addNewPoint(point) {
		//This method will set the colour to red if the point is not inside half plane
		//or will keep the colour green if it doesn't change the line property
		this.points.push(point);
		this.refreshColor();


	}

	temporarilyChangeColor(point) {
		if (!point.isInHalfPlane()) {
			this.color = [255,0,0,255]; //RED
		}
	}

	refreshColor(separator=hLine) {
		for (let i = 0; i < this.points.length; i++) {
			if (!this.points[i].isInHalfPlane(separator)) {
				this.color = [255,0,0,255]; //RED
				return;
			}
		}
		this.color = [0,255,0,255]; //GREEN
	}

	intersects(other) {
		if (this.isUninitialized()) {return new Point(null, null)}
		// Calculating using determinant, translated to from math to javascript from source : https://mathworld.wolfram.com/Line-LineIntersection.html
		const x1 = this.topPoint.x;const y1 = this.topPoint.y;const x2 = this.botPoint.x;const y2 = this.botPoint.y;

		const x3 = other.topPoint.x;const y3 = other.topPoint.y;const x4 = other.botPoint.x;const y4 = other.botPoint.y;

		const xPoint = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4)) /
			((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));

		const yPoint = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4)) /
			((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));


		//Since the division by 0 is allowed in Javascript, if two lines are parralel, the point will have Infinite as x and y
		return new Point(xPoint, yPoint)
	}
	isUninitialized() {
		return (this.topPoint === null || this.topPoint.x === null || this.topPoint.y === null ||
			this.botPoint === null || this.botPoint.x === null ||this.botPoint.y === null)
	}
	draw(kwArgs) { //This method will draw (p5js) the shape using keyword args to change the color or stroke for example
		if (this.isUninitialized()) {return;}
		setStroke({colorValue:this.color, fillValue:this.color}); //use the line color
		setStroke(kwArgs);//overwrite if necessary
		line(this.topPoint.x, this.topPoint.y, this.botPoint.x, this.botPoint.y)
		resetStroke();
	}
}

class MyLine extends LineSegment {
	constructor(pointA, pointB) {
		super(pointA, pointB);
		this.topPoint = this.intersects(borders[0]); //the top point is the intersection of this line and the top border
		this.botPoint = this.intersects(borders[2]); //the bot point is the intersection of this line and the bot border
		if (this.topPoint.x === Infinity || this.botPoint.x === Infinity) {
			//Parallel to both borders so we have to make them intersect left and right border
			this.topPoint = new Point(0, pointA.y); // the top point is the most left possible point at y = mouseY
			this.botPoint = new Point(borders[1].topPoint.x, pointB.y); // the bot point is the right most point at y = mouseY
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