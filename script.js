if (!window.mouseTrackerInitialized) {
    window.mouseTrackerInitialized = true;

    // Check if trackingDiv already exists
    if (!document.getElementById('trackingData')) {
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
    }

    // Create the download button outside the if block
    if (!document.getElementById('downloadButton')) {
        let downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.textContent = 'Download Data';
        downloadButton.style.position = 'fixed';
        downloadButton.style.bottom = '220px';
        downloadButton.style.left = '10px';
        downloadButton.style.zIndex = '10000';
        document.body.appendChild(downloadButton);

        downloadButton.addEventListener('click', function() {
            downloadDataAsCSV();
        });
    }

    // Initialize sessionData if it doesn't exist
    if (!window.sessionData) {
        window.sessionData = [];
    }

    // Function to add data points
    function addDataPoint(dataPoint) {
        window.sessionData.push(dataPoint);

        // Display the data point
        const dataString = `${dataPoint.recordTimestamp.toFixed(3)}, ${dataPoint.clientTimestamp.toFixed(3)}, ${dataPoint.button}, ${dataPoint.state}, ${dataPoint.x}, ${dataPoint.y}`;
        const dataElem = document.createElement('div');
        dataElem.textContent = dataString;
        document.getElementById('trackingData').appendChild(dataElem);

        // Scroll to the bottom of the tracking data
        document.getElementById('trackingData').scrollTop = document.getElementById('trackingData').scrollHeight;
    }

    // Function to get button type
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

    // Function to download data as CSV
    function downloadDataAsCSV() {
        if (window.sessionData.length === 0) {
            alert('No data to download.');
            return;
        }

        let csvContent = 'recordTimestamp,clientTimestamp,button,state,x,y\n';

        window.sessionData.forEach(dataPoint => {
            let row = `${dataPoint.recordTimestamp.toFixed(3)},${dataPoint.clientTimestamp.toFixed(3)},${dataPoint.button},${dataPoint.state},${dataPoint.x},${dataPoint.y}`;
            csvContent += row + '\n';
        });

        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        let link = document.createElement('a');
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url);

        let timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        link.setAttribute('download', `MouseTrackingData_${timestamp}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clear the session data after download
        window.sessionData = [];
    }
}