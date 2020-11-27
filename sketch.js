let canvas;

let intersection_points = [];
let lines = [];

let last_click = null;
let q = null;
let q_turn = -1;
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

function find_best_h() {
    intersection_points[0].color = "blue";
    let bestCounter = Infinity; let bestH = null;
    let anti = null;

    for (let i = intersection_points.length-1; i >= 0; i--) {
        const point_of_h = intersection_points[i];
        let counter = 0; let anti_counter = 0;

        h = new Line(q, intersection_points[i], 2);
        for (let j = lines.length-1; j >= 0; j--) {
            const line_to_test = lines[j];
            if (are_in_region(q,point_of_h, line_to_test.points, -1)) {
                counter += 1
            }
        }
        for (let j = lines.length-1; j >= 0; j--) {
            const line_to_test = lines[j];
            if (are_in_region(q,point_of_h, line_to_test.points, 1)) {
                anti_counter += 1
            }
        }
        if (anti_counter < bestCounter) {
            bestCounter = anti_counter; bestH = h; anti=true;
        }
        if (counter < bestCounter) {
            bestCounter = counter; bestH = h; anti=false;
        }
    }
    h = bestH;
    console.log(bestCounter, anti, q_turn)
    refresh_all_colors();
    // The recount makes sure that
    if (!anti) {
        q_turn = - q_turn;
    }
    refresh_all_colors();
}

function count_nb_green_lines() {
    let counter = 0;
    lines.forEach(line => {if (line.color === "green") { counter += 1;}});
    return counter
}