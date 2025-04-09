from flask import Flask, request, jsonify
from transformers import pipeline
import torch

app = Flask(__name__)

# Load the sentiment analysis model
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

@app.route('/sentiment', methods=['POST'])
def analyze_sentiment():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
            
        # Get sentiment prediction
        result = sentiment_analyzer(text)[0]
        
        return jsonify({
            "label": result['label'],
            "score": result['score']
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 