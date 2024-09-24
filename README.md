
# Mouse Movement Tracker Extension

## Overview

The **Mouse Movement Tracker** is a browser extension designed to monitor and track mouse movements and clicks on any web page. It records mouse events in real-time and displays the data in a floating panel at the bottom of the page. You can download the recorded data as a CSV file and clear the data to start a new session.

## Features

- **Real-time tracking**: Tracks and logs mouse movements and button clicks.
- **Downloadable data**: Export the tracked data as a CSV file.
- **Automatic reset**: Clears the data after downloading to start a fresh session.
- **Minimal intrusion**: Adds a small, unobtrusive floating panel for displaying tracking data.
- **Cross-website support**: Runs on any website to track mouse interactions.

## Installation

### For Developers

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mouse-movement-tracker.git
   ```

2. Navigate to the project folder:

   ```bash
   cd mouse-movement-tracker
   ```

3. Load the extension in your browser:
   
   #### Chrome
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

   #### Firefox
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on" and select the `manifest.json` file in the project directory

4. The **Mouse Movement Tracker** extension will be available and ready to use in your browser.

## Usage

Once installed, the extension will automatically track mouse events on any website you visit. The real-time tracking data is shown in a fixed panel at the bottom of the page.

- **View tracking data**: Move your mouse or click anywhere on the page to see live updates in the panel.
- **Download data**: Click the "Download Data" button to export the recorded data as a CSV file.
- **Reset data**: After downloading, the data will be automatically reset for a new session.

### Data Format

The CSV file includes the following columns:
- `recordTimestamp`: Time since page load (in seconds) when the event was recorded
- `clientTimestamp`: Unix timestamp (in seconds) when the event was recorded
- `button`: The mouse button involved in the event (LeftButton, MiddleButton, RightButton, or NoButton for movement)
- `state`: State of the event (Move, Down, or Up)
- `x`: X-coordinate of the mouse event
- `y`: Y-coordinate of the mouse event

### Example CSV Output

```csv
recordTimestamp,clientTimestamp,button,state,x,y
0.123,1633024801.456,NoButton,Move,100,150
0.456,1633024801.789,LeftButton,Down,200,250
0.789,1633024802.012,LeftButton,Up,300,350
```

## Project Structure

```
mouse-movement-tracker/
├── manifest.json        # Extension configuration
├── index.html           # Extension popup (not heavily used in this project)
├── script.js            # Main script for tracking mouse events
├── icons/               # Folder containing extension icons
└── README.md            # Project documentation
```

## Permissions

The extension requires the following permissions:
- **`activeTab`**: Access to the current tab to inject the tracking script.
- **`scripting`**: Allows the extension to inject JavaScript into web pages.
- **`storage`**: Optional (for potential future enhancements that may store data locally).
- **`host_permissions`:** `<all_urls>`: Ensures the extension can run on any website to track mouse movements globally.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, feel free to open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch with your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes.
4. Commit your changes:
   ```bash
   git commit -m "Add feature: your-feature-name"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a pull request on the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the open-source community for tools and libraries that make browser extension development easier.
- This project was inspired by the need for a simple, effective tool for tracking user interactions on websites.
