
    let sessionData = [];
    const trackingDataDiv = document.getElementById('trackingData');

    function addDataPoint(dataPoint) {
        sessionData.push(dataPoint);

        // Display the data point
        const dataString = `${dataPoint.recordTimestamp.toFixed(3)}, ${dataPoint.clientTimestamp.toFixed(3)}, ${dataPoint.button}, ${dataPoint.state}, ${dataPoint.x}, ${dataPoint.y}`;
        const pre = document.createElement('pre');
        pre.textContent = dataString;
        trackingDataDiv.appendChild(pre);

        // Scroll to the bottom
        trackingDataDiv.scrollTop = trackingDataDiv.scrollHeight;
    }

    function getButtonType(event) {
        switch(event.button) {
            case 0:
                return 'LeftButton';
            case 1:
                return 'MiddleButton';
            case 2:
                return 'RightButton';
            default:
                return 'UnknownButton';
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