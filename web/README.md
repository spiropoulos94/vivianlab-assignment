# Sentiment Analysis API

A Node.js implementation of sentiment analysis using Transformers.js, similar to the Python version.

## Features

- Uses the same model as the Python version (`distilbert-base-uncased-finetuned-sst-2-english`)
- No API key required (runs models locally)
- Simple Express.js API endpoint
- Caches models locally for faster subsequent runs

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server will run on port 5000.

## Usage

Send a POST request to `/sentiment` with a JSON body containing the text to analyze:

```bash
curl -X POST http://localhost:5000/sentiment \
  -H "Content-Type: application/json" \
  -d '{"text": "I love this product!"}'
```

Response:

```json
{
  "label": "POSITIVE",
  "score": 0.9996721148490906
}
```

## Notes

- The first run will download the model (about 260MB)
- Models are cached in the `.cache` directory
- Uses the same model and produces the same results as the Python version
