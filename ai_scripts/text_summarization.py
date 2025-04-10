from transformers import pipeline
import sys

def summarize_text(text):
    # Load the summarization model
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    # Generate summary
    summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    
    return summary[0]['summary_text']

if __name__ == "__main__":
    # Define the text to summarize
    Long_text = """The Amazon rainforest, often referred to as the "lungs of the Earth," produces around 20% of the world's oxygen and is home to a staggering variety of plant and animal species. Spanning over nine countries in South America, the majority of the forest lies within Brazil. Unfortunately, deforestation due to logging, agriculture, and mining poses a serious threat to this vital ecosystem, leading to loss of biodiversity and contributing to climate change."""
    
    # Generate and print summary
    summary = summarize_text(Long_text)
    print("\nOriginal Text:")
    print(Long_text)
    print("\nSummary:")
    print(summary) 