# Life Score Calculator

A web application that calculates your "Life Score" based on various factors including education, skills, social connections, and wealth.

## Features

- Multi-step questionnaire across 4 categories
- Real-time score calculation
- Visual breakdown of category scores
- Personalized improvement suggestions
- Animated score display
- Mobile-friendly design

## Tech Stack

- React
- Vite
- TailwindCSS
- Recharts (for data visualization)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `/src/pages/` - Main page components
  - `LandingPage.jsx` - Welcome page
  - `Questionnaire.jsx` - Multi-step form
  - `ResultPage.jsx` - Score display and breakdown
- `/src/App.jsx` - Main application component
- `/src/index.css` - Global styles and Tailwind imports

## Future Enhancements

- Integration with LinkedIn API
- Instagram data import
- Banking API integration
- More detailed scoring algorithms
- Export/share functionality
- Historical score tracking
