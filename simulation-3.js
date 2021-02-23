/* ----- Variables ------- */
var x = 5;
var xError = 1;
var m = 2;
var mError = 1;
var b = 2;
var bError = 1;

var numSteps = 100;
var stepSize = 20/numSteps;
var xCoords = [];
var yCoords = [];

/* ------ Projectile Path Methods ------- */

/**
 * Calculates y = mx^b
 * @param {number} x - the x coordinate to calculate from
 * @return {number} The y coordinate of the point.
 */
function powerLaw(x) {
    return m*Math.pow(x, b);
}

/**
 * Calculates the error on y from variable m
 * @return {number}
 */
function errorFromM() {
    let partial = Math.pow(x, b);
    return Math.abs(partial*mError);
}

/**
 * Calculates the error on y from x.
 * @return {number}
 */
function errorFromX() {
    let partial = b*m*Math.pow(x, b-1);
    return Math.abs(partial*xError);
}

/**
 * Calculates the error on y from variable b.
 * @return {number}
 */
function errorFromB() {
    let partial = m*Math.pow(x, b)*Math.log(Math.abs(x));
    return Math.abs(partial*bError);
}

/**
 * Calculates the total error on y.
 * @return {number}
 */
function totalError() {
    let del_x = errorFromX();
    let del_m = errorFromM();
    let del_b = errorFromB();
    return Math.sqrt(del_x*del_x + del_m*del_m + del_b*del_b);
}


/* -------------- Initial Graph Setup ---------------- */

var trace0;
updateTrace0();

var xErrorBarsVisible = false;
var currentY; // Stores the current y coordinate of the measurement point.
var trace1;
updateTrace1();

var mErrorLinesVisible = false;
var mUpperBound, mLowerBound;
updateMErrorLines();

var bErrorLinesVisible = false;
var bUpperBound, bLowerBound;
updateBErrorLines();

var yErrorLinesVisible = false;
var yUpperBound, yLowerBound;
updateYErrorLines();

var xErrorLinesVisible = false;
var leftBound, rightBound;
updateXErrorLines();

var y_xErrorLinesVisible = false;
var y_xUpperBound, y_xLowerBound;
updateY_xErrorLines();

var y_mErrorLinesVisible = false;
var y_mUpperBound, y_mLowerBound;
updateY_mErrorLines();

var y_bErrorLinesVisible = false;
var y_bUpperBound, y_bLowerBound;
updateY_bErrorLines();

var data = [
    trace0,
    trace1
];

var layout = {
    showlegend: true,
    legend: {
        x: 0,
        xanchor: 'left',
        y: 1,
        bgcolor: 'rgba(0,0,0,0)'
    },
    margin: {
        l: 30,
        r: 20,
        t: 20,
        b: 20
    },
    xaxis: {
        range: [-10, 10],
        autorange: false
    }
};

graph = document.getElementById('graph');
Plotly.newPlot(graph, data, layout);

/* ------------Update Graph On Input-------------- */


/* ---------oninput functions---------- */

var xSlider = document.getElementById('xSlider');
xSlider.oninput = function() {
    x = 20*(xSlider.value/100) - 10;

    updateTrace1();
    updateMErrorLines();
    updateBErrorLines();
    updateYErrorLines();
    updateXErrorLines();
    updateY_xErrorLines();
    updateY_mErrorLines();
    updateY_bErrorLines();

    refreshGraph();
}

var xErrorSlider = document.getElementById('xErrorSlider');
xErrorSlider.oninput = function() {
    xError = 2*(xErrorSlider.value/100);

    updateTrace1();
    updateMErrorLines();
    updateBErrorLines();
    updateYErrorLines();
    updateXErrorLines();
    updateY_xErrorLines();
    updateY_mErrorLines();
    updateY_bErrorLines();

    refreshGraph();
}

var mSlider = document.getElementById('mSlider');
mSlider.oninput = function() {
    m = 4*(mSlider.value/100);

    updateTrace0();
    updateTrace1();
    updateMErrorLines();
    updateBErrorLines();
    updateYErrorLines();
    updateXErrorLines();
    updateY_xErrorLines();
    updateY_mErrorLines();
    updateY_bErrorLines();

    refreshGraph();
}

var mErrorSlider = document.getElementById('mErrorSlider');
mErrorSlider.oninput = function() {
    mError = 2*(mErrorSlider.value/100);

    updateTrace1();
    updateMErrorLines();
    updateBErrorLines();
    updateYErrorLines();
    updateXErrorLines();
    updateY_xErrorLines();
    updateY_mErrorLines();
    updateY_bErrorLines();

    refreshGraph();
}

var bSlider = document.getElementById('bSlider');
bSlider.oninput = function() {
    b = 4*(bSlider.value/100);

    updateTrace0();
    updateTrace1();
    updateMErrorLines();
    updateBErrorLines();
    updateYErrorLines();
    updateXErrorLines();
    updateY_xErrorLines();
    updateY_mErrorLines();
    updateY_bErrorLines();

    refreshGraph();
}

var bErrorSlider = document.getElementById('bErrorSlider');
bErrorSlider.oninput = function() {
    bError = 2*(bErrorSlider.value/100);

    updateTrace1();
    updateMErrorLines();
    updateBErrorLines();
    updateYErrorLines();
    updateXErrorLines();
    updateY_xErrorLines();
    updateY_mErrorLines();
    updateY_bErrorLines();

    refreshGraph();
}

var xErrorBars = document.getElementById('xErrorBars');
xErrorBars.oninput = function() {
    xErrorBarsVisible = xErrorBars.checked;

    updateTrace1();
    refreshGraph();
}

var mErrorLines = document.getElementById('mErrorLines');
mErrorLines.oninput = function() {
    mErrorLinesVisible = mErrorLines.checked;

    updateMErrorLines();
    refreshGraph();
}

var bErrorLines = document.getElementById('bErrorLines');
bErrorLines.oninput = function() {
    bErrorLinesVisible = bErrorLines.checked;

    updateBErrorLines();
    refreshGraph();
}

var yErrorLines = document.getElementById('yErrorLines');
yErrorLines.oninput = function() {
    yErrorLinesVisible = yErrorLines.checked;

    updateYErrorLines();
    refreshGraph();
}

var xErrorLines = document.getElementById('xErrorLines');
xErrorLines.oninput = function() {
    xErrorLinesVisible = xErrorLines.checked;

    updateXErrorLines();
    refreshGraph();
}

var y_xErrorLines = document.getElementById('y_xErrorLines');
y_xErrorLines.oninput = function() {
    y_xErrorLinesVisible = y_xErrorLines.checked;

    updateY_xErrorLines();
    refreshGraph();
}

var y_mErrorLines = document.getElementById('y_mErrorLines');
y_mErrorLines.oninput = function() {
    y_mErrorLinesVisible = y_mErrorLines.checked;

    updateY_mErrorLines();
    refreshGraph();
}

var y_bErrorLines = document.getElementById('y_bErrorLines');
y_bErrorLines.oninput = function() {
    y_bErrorLinesVisible = y_bErrorLines.checked;

    updateY_bErrorLines();
    refreshGraph();
}

/* ---------trace update functions--------- */

function updateTrace0() {
    xCoords = [];
    yCoords = [];

    for (let i = 0; i <= numSteps; i++) {
        xCoords[i] = i*stepSize - 10;
        yCoords[i] = powerLaw(xCoords[i]);
    }

    trace0 = {
        x: xCoords,
        y: yCoords,
        mode: 'lines'
    };
}

function updateTrace1() {
    currentY = powerLaw(x);
    trace1 = {
        x: [x],
        y: [currentY],
        mode: 'scatter',
        error_y: {
            type: 'constant',
            value: totalError()
        },
        error_x: {
            type: 'constant',
            value: xError,
            visible: xErrorBarsVisible
        }
    };
}

function updateMErrorLines() {
    let xCoords = [];
    let yCoordsUp = [];
    let yCoordsLow = [];

    for (let i = 0; i <= numSteps; i++) {
        xCoords[i] = i*stepSize - 10;
        yCoordsUp[i] = (m+mError)*Math.pow(xCoords[i], b);
        yCoordsLow[i] = (m-mError)*Math.pow(xCoords[i], b);
    }

    mUpperBound = {
        x: xCoords,
        y: yCoordsUp,
        mode: 'lines',
        line: {
            width: 2,
            color: 'rgb(51, 204, 204)'
        },
        visible: mErrorLinesVisible,
        name: 'm error'
    };

    mLowerBound = {
        x: xCoords,
        y: yCoordsLow,
        mode: 'lines',
        line: {
            width: 2,
            color: 'rgb(51, 204, 204)'
        },
        visible: mErrorLinesVisible,
        name: 'm error',
        showlegend: false
    };
}

function updateBErrorLines() {
    let xCoords = [];
    let yCoordsUp = [];
    let yCoordsLow = [];

    for (let i = 0; i <= numSteps; i++) {
        xCoords[i] = i*stepSize - 10;
        yCoordsUp[i] = m*Math.pow(xCoords[i], b+bError);
        yCoordsLow[i] = m*Math.pow(xCoords[i], b-bError);
    }

    bUpperBound = {
        x: xCoords,
        y: yCoordsUp,
        mode: 'lines',
        line: {
            width: 2,
            color: 'rgb(255, 0, 0)'
        },
        visible: bErrorLinesVisible,
        name: 'b error'
    };

    bLowerBound = {
        x: xCoords,
        y: yCoordsLow,
        mode: 'lines',
        line: {
            width: 2,
            color: 'rgb(255, 0, 0)'
        },
        visible: bErrorLinesVisible,
        name: 'b error',
        showlegend: false
    };
}

function updateYErrorLines() {
    let err = totalError();
    yUpperBound = {
        x: [-10, 10],
        y: [currentY+err, currentY+err],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(0, 153, 51)'
        },
        visible: yErrorLinesVisible,
        name: 'y error'
    };

    yLowerBound = {
        x: [-10, 10],
        y: [currentY-err, currentY-err],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(0, 153, 51)'
        },
        visible: yErrorLinesVisible,
        showlegend: false
    }
}

function updateXErrorLines() {
    let maxY = powerLaw(10);
    let minY = (b == 3) ? powerLaw(-10) : 0;
    let bottom = (currentY-totalError() < minY) ? currentY-totalError() : minY;
    let top = (maxY > currentY+totalError()) ? maxY : currentY+totalError();
    leftBound = {
        x: [x-xError, x-xError],
        y: [bottom, top],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(204, 0, 0)'
        },
        visible: xErrorLinesVisible,
        name: 'x error'
    };

    rightBound = {
        x: [x+xError, x+xError],
        y: [bottom, top],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(204, 0, 0)'
        },
        visible: xErrorLinesVisible,
        showlegend: false
    };
}

function updateY_xErrorLines() {
    let y_xError = errorFromX();
    y_xUpperBound = {
        x: [-10, 10],
        y: [currentY+y_xError, currentY+y_xError],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(204, 0, 0)'
        },
        visible: y_xErrorLinesVisible,
        name: 'y_x error'
    };

    y_xLowerBound = {
        x: [-10, 10],
        y: [currentY-y_xError, currentY-y_xError],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(204, 0, 0)'
        },
        visible: y_xErrorLinesVisible,
        showlegend: false
    };
}

function updateY_mErrorLines() {
    let y_mError = errorFromM();
    y_mUpperBound = {
        x: [-10, 10],
        y: [currentY+y_mError, currentY+y_mError],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(51, 204, 204)'
        },
        visible: y_mErrorLinesVisible,
        name: 'y_m error'
    };

    y_mLowerBound = {
        x: [-10, 10],
        y: [currentY-y_mError, currentY-y_mError],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(51, 204, 204)'
        },
        visible: y_mErrorLinesVisible,
        showlegend: false
    };
}

function updateY_bErrorLines() {
    let y_bError = errorFromB();
    y_bUpperBound = {
        x: [-10, 10],
        y: [currentY+y_bError, currentY+y_bError],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(255, 0, 0)'
        },
        visible: y_bErrorLinesVisible,
        name: 'y_b error'
    };

    y_bLowerBound = {
        x: [-10, 10],
        y: [currentY-y_bError, currentY-y_bError],
        mode: 'lines',
        line: {
            dash: 'dot',
            width: 2,
            color: 'rgb(255, 0, 0)'
        },
        visible: y_bErrorLinesVisible,
        showlegend: false
    };
}

function refreshGraph() {
    data = [
        trace0,
        trace1,
        mUpperBound,
        mLowerBound,
        bUpperBound,
        bLowerBound,
        yUpperBound,
        yLowerBound,
        leftBound,
        rightBound,
        y_xUpperBound,
        y_xLowerBound,
        y_mUpperBound,
        y_mLowerBound,
        y_bUpperBound,
        y_bLowerBound
    ];

    Plotly.react(graph, data, layout);
}