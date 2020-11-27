let canvas;

let intersection_points = [];
let lines = [];

let last_click = null;
let q = null;
let h = null;

function setup() {
    canvas = createCanvas(document.getElementById("canvasContainer").offsetWidth, windowHeight)
    canvas.parent("canvasContainer");
    canvas.mouseClicked(click_line);

    background(200)

}

function draw() {
    background(200);

    q?.display();
    h?.display();

    lines.forEach(line => line.display());
    intersection_points.forEach(point => point.display());
    preview_line?.display(); // does nothing if preview_line is null
    preview_intersection_points?.forEach(point => point.display());
}

function reset_stroke() {
    stroke("black")
    strokeWeight(1)
}

function add_line(line) {
    let intersections = line.get_all_intersections();
    line.recolor(intersections);


    lines.push(line);
    intersection_points.push(...intersections);
}

function refresh_all_colors() {
    intersection_points.forEach(point => point.recolor());
    lines.forEach(line => line.recolor()) ;
}