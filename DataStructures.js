class Point {
    constructor(x,y) {
        this.x = x; this.y = y;
    }
    display() {
        ellipse(this.x, this.y, POINT_RADIUS, POINT_RADIUS);
    }
}

class Line {
    constructor(a, b) {
        this.a = a; this.b = b;
        this.slope = calculateSlope(this.a, this.b);
        this.extendLine();
    }
    display() {
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
    extendLine(){
        this.a = intersectionWithXAxis(this.a, this.slope);

        this.b.x = this.b.x + this.b.y / this.slope;
        this.b.y = canvas.height
        console.log(this.a.x)
    }
}