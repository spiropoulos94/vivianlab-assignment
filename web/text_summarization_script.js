import { pipeline } from "@xenova/transformers";

// Suppress ONNX warnings
process.env.ORT_LOG_LEVEL = "3"; // Only show errors

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

// Get text from command line arguments
const text = process.argv[2];

if (!text) {
  console.error("Please provide text to summarize as a command-line argument");
  console.error('Usage: npm run summarize -- "Your long text here"');
  process.exit(1);
}

// Run the summarization
async function main() {
  const summary = await summarizeText(text);

  if (summary) {
    console.clear();
    console.log("--------------------------------");
    console.log("Original:", text);
    console.log("Summary:", summary);
    console.log("--------------------------------");
  }
}

// Run the example
main();
