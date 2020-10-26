class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		if (this.isInHalfPlane()) {
			this.color = [0,255,0,255];
		} else {
			this.color = [255,0,0,255];
		}
	}

	isInHalfPlane() {
		//if they show the same turn, they are in the same side of the line
		if (hLine === null || qPoint === null) {return true} //no half plane, so we show
		return (getTurn(qPoint, hLine.topPoint, hLine.botPoint) === getTurn(this, hLine.topPoint, hLine.botPoint))
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
		setStroke(kwArgs);
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