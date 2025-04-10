import { pipeline } from "@xenova/transformers";

async function summarizeText(text) {
  try {
    // Load the summarization model
    const summarizer = await pipeline("summarization", "Xenova/bart-large-cnn");

    // Generate summary
    const summary = await summarizer(text, {
      max_length: 130,
      min_length: 30,
      do_sample: false,
    });

    return summary[0].summary_text;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

// Define the text to summarize
const long_text = `The Amazon rainforest, often referred to as the "lungs of the Earth," produces around 20% of the world's oxygen and is home to a staggering variety of plant and animal species. Spanning over nine countries in South America, the majority of the forest lies within Brazil. Unfortunately, deforestation due to logging, agriculture, and mining poses a serious threat to this vital ecosystem, leading to loss of biodiversity and contributing to climate change.`;

// Run the summarization
async function main() {
  const summary = await summarizeText(long_text);

  if (summary) {
    console.clear();
    console.log("--------------------------------");
    console.log("Original:", long_text);
    console.log("Summary:", summary);
    console.log("--------------------------------");
  }
}

// Run the example
main();
