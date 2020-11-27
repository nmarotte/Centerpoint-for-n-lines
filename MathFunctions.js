function calculate_slope(pointA, pointB) {
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

function intersection_with_x_axis(point, slope) {
    let x = point.x - point.y / slope
    let y = 0;
    return new Point(x,y)
}

function intersection_with_y_axis(point, slope) {
    let x = 0;
    let y = point.y - point.x * slope;
    return new Point(x,y)
}

function intersection_with_lower_border(point, slope) {
    let x = point.x + (canvas.height - point.y) / slope;
    let y = canvas.height
    return new Point(x,y);
}

function get_turn(a, b, c) {
    let determinant =
        a.x * (b.y - c.y) - a.y * (b.x - c.x) + (b.x * c.y - c.x * b.y);
    if (determinant < 0) return -1;
    if (determinant > 0) return 1;
    return 0
}