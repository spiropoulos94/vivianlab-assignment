import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
import re
from nltk.tokenize import word_tokenize
import nltk

# Download required NLTK data
nltk.download('punkt')

def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove punctuation
    text = re.sub(r'[^\w\s]', '', text)
    # Tokenize
    tokens = word_tokenize(text)
    return ' '.join(tokens)

def main():
    # Load the dataset
    try:
        df = pd.read_csv('reviews.csv')
    except FileNotFoundError:
        print("Error: reviews.csv file not found!")
        return

    # Preprocess text
    df['processed_text'] = df['text'].apply(preprocess_text)

    # Convert text to vectors using TF-IDF
    vectorizer = TfidfVectorizer(max_features=1000)
    X = vectorizer.fit_transform(df['processed_text'])
    y = df['label']

    # Train the model
    model = LogisticRegression()
    model.fit(X, y)

    # Make predictions
    y_pred = model.predict(X)

    # Print results
    print("\nClassification Report:")
    print(classification_report(y, y_pred))
    print(f"\nAccuracy: {accuracy_score(y, y_pred):.4f}")

if __name__ == "__main__":
    main() 