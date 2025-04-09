# Sentiment Analysis App

A modern React TypeScript application for analyzing text sentiment using a custom API.

## Features

- Clean, modern UI built with Material-UI
- Real-time sentiment analysis
- Color-coded sentiment results
- Confidence score display
- Loading states and error handling
- Responsive design
- TypeScript for type safety

## Tech Stack

- React 18
- TypeScript
- Material-UI (@mui/material)
- Axios for API calls
- Emotion for styling

## Project Structure

```
src/
├── types/
│   └── sentiment.ts      # TypeScript interfaces
├── hooks/
│   └── useSentiment.ts   # Custom hook for sentiment analysis
├── App.tsx              # Main application component
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- The sentiment analysis API server running on port 5000

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd sentiment-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The app communicates with a sentiment analysis API running on port 5000. The API endpoint is:

```
POST http://localhost:5000/sentiment
```

Request body:

```json
{
  "text": "Your text to analyze"
}
```

Response:

```json
{
  "sentiment": "positive|negative|neutral",
  "confidence": 0.95
}
```

## UI Components

- **Text Input**: A multiline text field for entering text to analyze
- **Analyze Button**: Triggers the sentiment analysis
- **Result Display**: Shows sentiment and confidence with color coding:
  - Green: Positive sentiment
  - Red: Negative sentiment
  - Blue: Neutral sentiment
- **Loading Indicator**: Shows during API calls
- **Error Messages**: Displays if the analysis fails

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
