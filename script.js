// Inject an element to display tracking data on the page
let trackingDiv = document.createElement('div');
trackingDiv.id = 'trackingData';
trackingDiv.style.position = 'fixed';
trackingDiv.style.bottom = '0';
trackingDiv.style.left = '0';
trackingDiv.style.width = '100%';
trackingDiv.style.height = '200px';
trackingDiv.style.overflowY = 'scroll';
trackingDiv.style.backgroundColor = '#fff';
trackingDiv.style.borderTop = '2px solid #ccc';
trackingDiv.style.fontFamily = 'Arial, sans-serif';
trackingDiv.style.fontSize = '12px';
trackingDiv.style.padding = '10px';
trackingDiv.style.boxSizing = 'border-box';
trackingDiv.style.zIndex = '9999';
document.body.appendChild(trackingDiv);

// Add header for tracking data
let header = document.createElement('div');
header.textContent = 'recordTimestamp, clientTimestamp, button, state, x, y';
trackingDiv.appendChild(header);

// Store mouse tracking data
let sessionData = [];

function addDataPoint(dataPoint) {
    sessionData.push(dataPoint);

    // Display the data point
    const dataString = `${dataPoint.recordTimestamp.toFixed(3)}, ${dataPoint.clientTimestamp.toFixed(3)}, ${dataPoint.button}, ${dataPoint.state}, ${dataPoint.x}, ${dataPoint.y}`;
    const dataElem = document.createElement('div');
    dataElem.textContent = dataString;
    trackingDiv.appendChild(dataElem);

    // Scroll to the bottom of the tracking data
    trackingDiv.scrollTop = trackingDiv.scrollHeight;
}

function getButtonType(event) {
    switch(event.button) {
        case 0: return 'LeftButton';
        case 1: return 'MiddleButton';
        case 2: return 'RightButton';
        default: return 'UnknownButton';
    }
}

// Event listener for mouse movement
document.addEventListener('mousemove', function(event) {
    const dataPoint = {
        recordTimestamp: performance.now() / 1000, // Seconds since page load
        clientTimestamp: Date.now() / 1000,        // Unix timestamp in seconds
        button: 'NoButton',
        state: 'Move',
        x: event.clientX,
        y: event.clientY
    };
    addDataPoint(dataPoint);
});

// Event listener for mouse button press
document.addEventListener('mousedown', function(event) {
    const dataPoint = {
        recordTimestamp: performance.now() / 1000,
        clientTimestamp: Date.now() / 1000,
        button: getButtonType(event),
        state: 'Down',
        x: event.clientX,
        y: event.clientY
    };
    addDataPoint(dataPoint);
});

// Event listener for mouse button release
document.addEventListener('mouseup', function(event) {
    const dataPoint = {
        recordTimestamp: performance.now() / 1000,
        clientTimestamp: Date.now() / 1000,
        button: getButtonType(event),
        state: 'Up',
        x: event.clientX,
        y: event.clientY
    };
    addDataPoint(dataPoint);
});