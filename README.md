# Vivian Labs Assignment

This repository contains multiple AI-related scripts and a separate web application for sentiment analysis.

## Folder Structure

```
vivianlabs-assignment/
├── ai_scripts/             # Python AI scripts
│   ├── sentiment_analysis_api.py
│   ├── text_classification_script.py
│   ├── text_summarization.py
│   ├── model_evaluation.py
│   └── openai_integration_script.py
├── web/                    # Web application
│   ├── frontend/           # React TypeScript frontend
│   │   └── ...
│   ├── backend/            # Node.js TypeScript backend
│   │   └── ...
│   └── .env                # Environment variables
└── README.md
```

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

The web application consists of a React frontend (TypeScript) and a Node.js backend (TypeScript). It provides a user-friendly interface for sentiment analysis of text inputs, allowing users to enter text and receive sentiment classification results.

### Environment Setup

The web application uses a single `.env` file located in the `web/` directory. Copy the example file to create your own:

```bash
cp web/.env.example web/.env
```

This file contains all necessary configuration for both the frontend and backend.

### Running with Docker Compose (Recommended)

1. Make sure you have Docker and Docker Compose installed on your system.

2. Navigate to the root directory of the project and run:

```bash
docker-compose up --build
```

This will:

- Build and start the frontend service (accessible at http://localhost:3000)
- Build and start the backend service (accessible at http://localhost:5001)

### Quick Start (Local Development)

#### Frontend

```bash
cd web/frontend
npm install
npm start
```

Frontend will be available at http://localhost:3000

#### Backend

```bash
cd web/backend
npm install
npm start
```

Backend will be available at http://localhost:5001

Make sure both services are running simultaneously for the application to work correctly.

## Notes

- The Docker Compose setup is configured to handle all the networking between services automatically
- The backend service is written in TypeScript and uses Node.js
- AI scripts are located in the `ai_scripts` directory
