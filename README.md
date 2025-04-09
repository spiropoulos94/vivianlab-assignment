# Vivian Labs Assignment

This repository contains multiple AI-related scripts and a separate web application for sentiment analysis.

## AI Scripts

### Requirements

- Python 3.x
- Required Python packages (install using `pip install -r requirements.txt`):
  - transformers
  - torch
  - pandas
  - numpy

### Running AI Scripts

1. **Sentiment Analysis Script**

```bash
python ai_scripts/sentiment_analysis_api.py
```

2. **Data Analysis Script**

```bash
python ai_scripts/text_classification_script.py
```

3. **Text Generation Script**

```bash
python ai_scripts/text_summarization.py
```

4. **Model Valuation Script**

```bash
python ai_scripts/model_evaluation.py
```

5. **OpenAI Integration**

```bash
python ai_scripts/openai_integration_script.py
```

## Web Application

The web application consists of a React frontend (TypeScript) and a Node.js backend (JavaScript). It provides a user-friendly interface for sentiment analysis of text inputs, allowing users to enter text and receive sentiment classification results.

### Running with Docker Compose (Recommended)

1. Make sure you have Docker and Docker Compose installed on your system.

2. Navigate to the root directory of the project and run:

```bash
docker-compose up --build
```

This will:

- Build and start the frontend service (accessible at http://localhost:3000)
- Build and start the backend service (accessible at http://localhost:5001)

### Running Manually (Development)

#### Frontend

1. Navigate to the frontend directory:

```bash
cd web/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will be available at http://localhost:3000

#### Backend

1. Navigate to the backend directory:

```bash
cd web/backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm start
```

The backend will be available at http://localhost:5001

## Notes

- The Docker Compose setup is configured to handle all the networking between services automatically
- When running manually, make sure both frontend and backend services are running simultaneously
- The backend service is written in JavaScript and uses Node.js
- AI scripts are located in the `ai_scripts` directory
