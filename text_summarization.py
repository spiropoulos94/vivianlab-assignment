from transformers import pipeline

def summarize_text(text):
    # Load the summarization model
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    # Generate summary
    summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    
    return summary[0]['summary_text']

if __name__ == "__main__":
    # Example text
    long_text = """
    The field of artificial intelligence has made significant progress in recent years. 
    Machine learning models have become more sophisticated, capable of understanding 
    and generating human-like text, recognizing images, and making complex decisions. 
    Deep learning, a subset of machine learning, has been particularly influential, 
    powering many of the recent breakthroughs in AI. These advances have led to 
    practical applications in various industries, from healthcare to finance, 
    revolutionizing how we interact with technology and process information.
    """
    
    # Generate and print summary
    summary = summarize_text(long_text)
    print("Original Text:")
    print(long_text)
    print("\nSummary:")
    print(summary) 