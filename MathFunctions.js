function calculateSlope(pointA, pointB) {
    let slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);
    if (slope === 0) {
        slope = EPSILON_ZERO;
    }
    else if (slope === Infinity) {
        slope = EPSILON_INFINITY*canvas.height
    }
    else if (slope === -Infinity) {
        slope = -EPSILON_INFINITY*canvas.height
    }
    return slope;
}

function intersectionWithXAxis(point, slope) {
    let x = point.x - point.y / slope
    let y = 0;
    return new Point(x,y)
}

function intersectionWithYAxis(point, slope) {
    let x = 0;
    let y = point.y - point.x * slope;
    return new Point(x,y)
}