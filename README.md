# Deadlock Hero Counter

## Overview
The Deadlock Hero Counter is a web application designed to assist players in the Deadlock game by providing counter recommendations for enemy heroes. The application features custom dropdown menus for hero selection, cost-based item prioritization, and strategic advice.

## Features
- **Hero Selection**: Custom dropdown menus with hero icons and search functionality
- **Lane Counter Analysis**: Prioritized by cost efficiency (souls per effectiveness)
- **Team Fight Counters**: Comprehensive team composition analysis
- **Strategy & Tech**: Key abilities to monitor and strategic advice for each hero
- **Cost Display**: Shows soul cost for each counter item (e.g., "Counterspell - $3200")
- **Clear All Button**: Reset all selections with one click
- **Responsive Design**: Works on desktop and mobile devices
- **Deadlock Theme**: Authentic game-inspired styling

## Project Structure
```
deadlock-hero-counter/
├── index.html              # Main HTML document
├── src/
│   ├── css/
│   │   └── styles.css      # All styling including Deadlock theme
│   ├── js/
│   │   ├── app.js          # Main application logic
│   │   ├── security.js     # Security utilities
│   │   ├── heroData.js     # Hero names and data
│   │   ├── counterData.js  # Counter effectiveness data
│   │   └── item-costs.js   # Soul costs for items
│   └── assets/
│       └── icons/
│           └── heroes/     # Hero portrait images
└── README.md               # This file
```

## Setup Instructions

### Simple Setup (No Build Process Required)
1. **Download/Clone** the project files
2. **Open `index.html`** directly in your web browser
   - Double-click `index.html`, or
   - Right-click → "Open with" → your preferred browser

That's it! No installation, no build process, no npm required.

### For Development (Optional)
If you want to serve it locally via HTTP (recommended for development):

**Option 1: Python (if you have Python installed)**
```bash
# Navigate to the project directory
cd deadlock-hero-counter

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then visit: http://localhost:8000
```

**Option 2: Node.js (if you have Node.js installed)**
```bash
# Install a simple server globally
npm install -g http-server

# Navigate to project directory and serve
cd deadlock-hero-counter
http-server

# Visit the URL shown in terminal (usually http://localhost:8080)
```

**Option 3: VS Code Live Server Extension**
- Install the "Live Server" extension in VS Code
- Right-click on `index.html` → "Open with Live Server"

## Usage
1. **Select Enemy Heroes**: Use the dropdown menus to select enemy laners and team members
2. **View Lane Counters**: See cost-efficient counter items prioritized by effectiveness per soul spent
3. **Check Team Counters**: Review items effective against the entire enemy team composition
4. **Read Strategy**: Monitor key abilities and get strategic advice for each enemy hero
5. **Clear Selections**: Use the "Clear All Selections" button to reset and start over

## Features Explained

### Cost-Based Prioritization
- Lane counters are sorted by cost efficiency (effectiveness ÷ soul cost)
- An 800-soul item that's "okay" vs both laners will show before a 3200-soul item that's "great" vs one
- Each item displays its soul cost (e.g., "Healbane - $1600")

### Counter Effectiveness
- **Great**: Highly effective counter
- **Okay**: Moderately effective counter  
- **Specific**: Situational effectiveness with specific builds

### Hero Selection
- **Lane Heroes**: First two dropdowns for enemy laners
- **Team Heroes**: Additional enemy team members
- **Duplicate Prevention**: Can't select the same hero twice
- **Search**: Type to filter hero options
- **Icons**: Visual hero identification

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support
- Works on mobile devices

## Hosting
This is a static website that can be hosted anywhere:
- **AWS S3**: Upload all files to S3 bucket with static website hosting
- **GitHub Pages**: Push to GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder to deploy
- **Any Web Server**: Upload files to any web hosting service

## Troubleshooting

### Common Issues
1. **Hero icons not loading**: Check that `src/assets/icons/heroes/` contains the hero image files
2. **Dropdowns not working**: Ensure all JavaScript files are loading properly
3. **Styling issues**: Verify `src/css/styles.css` is loading correctly

### Browser Console
Press F12 to open developer tools and check the Console tab for any error messages.

## Contributing
Contributions welcome! This is a simple static website - just edit the files directly:
- **Add heroes**: Update `heroData.js` and add images to `assets/icons/heroes/`
- **Update counters**: Modify `counterData.js`
- **Add items**: Update `item-costs.js` with new items and costs
- **Styling**: Edit `styles.css`

## License
This project is for educational and personal use. Deadlock is a trademark of Valve Corporation.
