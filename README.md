# AI Developer Coding Test Solutions

This repository contains solutions for the AI Developer Coding Test. Each exercise is implemented in a separate Python file.

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. For the OpenAI integration, create a `.env` file with your API key:

```
OPENAI_API_KEY=your-api-key-here
```

## Exercise Files

1. `text_classification.py`

   - Text classification using Logistic Regression
   - Requires `reviews.csv` with columns `text` and `label`
   - Run: `python text_classification.py`

2. `sentiment_api.py`

   - Flask API for sentiment analysis
   - Uses HuggingFace's DistilBERT model
   - Run: `python sentiment_api.py`
   - API endpoint: POST `/sentiment`

3. `openai_integration.py`

   - OpenAI GPT-3.5 integration
   - Logs conversations to `chat_log.txt`
   - Run: `python openai_integration.py`

4. `model_evaluation.py`

   - Model evaluation metrics and confusion matrix
   - Run: `python model_evaluation.py`

5. `text_summarization.py` (Bonus)
   - Text summarization using BART
   - Run: `python text_summarization.py`

## Notes

- Make sure to have the required data files (`reviews.csv`) in the same directory
- The sentiment analysis API runs on port 5000
- The OpenAI integration requires a valid API key
