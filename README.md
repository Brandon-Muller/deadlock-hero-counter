# Deadlock Hero Counter

## Overview
The Deadlock Hero Counter is a web application designed to assist players in the Deadlock game by providing a user-friendly interface for selecting heroes and viewing their counters. The application features dropdown menus for hero selection, styled to match the game's aesthetic, and includes small icons for each hero.

## Features
- Dropdown selection of heroes with highlighted options.
- Small icons representing each hero for easy identification.
- Responsive design that maintains the Deadlock game's color scheme.
- Suitable for hosting on AWS S3.

## Project Structure
```
deadlock-hero-counter
├── src
│   ├── index.html          # Main HTML document
│   ├── css
│   │   ├── styles.css      # General styles
│   │   └── deadlock-theme.css # Deadlock theme styles
│   ├── js
│   │   ├── app.js          # Main JavaScript entry point
│   │   ├── data
│   │   │   └── heroes.js   # Hero data
│   │   └── components
│   │       ├── dropdown.js  # Dropdown component
│   │       └── counter-display.js # Counter display component
│   ├── assets
│   │   └── icons
│   │       └── heroes      # Hero icons
│   └── data
│       └── deadlock-counters.csv # Counter data
├── package.json             # npm configuration
├── webpack.config.js        # Webpack configuration
└── README.md                # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd deadlock-hero-counter
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Build the project:
   ```
   npm run build
   ```
5. Open `src/index.html` in your web browser to view the application.

## Usage
- Select a hero from the dropdown menus to view their counters.
- The first two dropdowns are highlighted for easy access.
- Icons next to each hero name help in quick identification.

## Hosting
This application is designed to be hosted on AWS S3. Follow AWS documentation for uploading static websites to S3.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.