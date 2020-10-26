// Each button will modify what happens when we click, and then reset once their task is over

function canvasClickedStartLine() {
    lastClickPoint = getMousePoint();
    //We clicked for the first point so we also enable the preview
    canvas.mouseMoved(refreshTmpPreviewLine);
    canvas.mouseClicked(canvasClickedFinishLine) //Bounces back and (1)

    if (isNextLineHalfPlane) { //We are trying to draw the previewline for the separator

    }
}

function canvasClickedFinishLine() {
    if (isNextLineHalfPlane) {
        isNextLineHalfPlane = ! isNextLineHalfPlane;
        hLine = new MyLine(lastClickPoint, getMousePoint());
        refreshIntersectionPoints();
    } else {
        addLine(lastClickPoint, getMousePoint());
    }
    //We clicked for the last point so we also disable the preview
    tmpPreviewLine = null;
    tmpIntersectionPoints = [];
    canvas.mouseMoved(function () {});
    canvas.mouseClicked(canvasClickedStartLine) // (2) forth

}


function canvasClickedForQPoint() {
    qPoint = getMousePoint();
    refreshIntersectionPoints();
    resetClickedFunction();
}

function resetClickedFunction() {
    canvas.mouseClicked(canvasClickedStartLine);
}

function refreshTmpPreviewLine() {
    tmpPreviewLine = new MyLine(lastClickPoint, getMousePoint());
    tmpIntersectionPoints = [];
    for (let i = 0; i < allLines.length; i++) {
        tmpIntersectionPoints.push(tmpPreviewLine.intersects(allLines[i]))
    }
}