// Each button will modify what happens when we click, and then reset once their task is over

function canvasClickedStartLine() {
    lastClickPoint = getMousePoint();
    //We clicked for the first point so we also enable the preview
    canvas.mouseClicked(canvasClickedFinishLine) //Bounces back and (1)

    if (isNextLineHalfPlane) { //We are trying to draw the preview line for the separator
        canvas.mouseMoved(refreshTmpSeparatorLine);
    } else {
        canvas.mouseMoved(refreshTmpPreviewLine);
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

function refreshTmpPreviewLine() { //Called each time the mouse is moved when finishing the line
    tmpPreviewLine = new MyLine(lastClickPoint, getMousePoint());
    tmpIntersectionPoints = [];
    for (let i = 0; i < allLines.length; i++) {
        tmpIntersectionPoints.push(tmpPreviewLine.intersects(allLines[i]))
    }
}

function refreshTmpSeparatorLine() { //Called each time the mouse is moved when finishing the SEPARATOR line
    tmpPreviewLine = new MyLine(lastClickPoint, getMousePoint());
    //This is a particular preview, since we will change the color of the points according to their position
    tmpIntersectionPoints = [];
    for (let i = 0; i < allPoints.length; i++) {
        allPoints[i].refreshColor(tmpPreviewLine);
    }
    for (let i = 0; i < allLines.length; i++) {
        allLines[i].refreshColor(tmpPreviewLine);
    }


}