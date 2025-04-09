from transformers import pipeline
import sys

def summarize_text(text):
    # Load the summarization model
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    # Generate summary
    summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    
    return summary[0]['summary_text']

if __name__ == "__main__":
    # Check if text is provided
    if len(sys.argv) < 2:
        print("Please provide text to summarize as a command-line argument")
        print('Usage: python text_summarization.py "Your long text here"')
        sys.exit(1)
        
    # Get text from command line arguments
    text = sys.argv[1]
    
    # Generate and print summary
    summary = summarize_text(text)
    print("\nOriginal Text:")
    print(text)
    print("\nSummary:")
    print(summary) 