import express from "express";
import { pipeline, env } from "@huggingface/transformers";

const app = express();
const port = 5001;

// Enable JSON parsing
app.use(express.json());

// Initialize the sentiment analysis pipeline
class SentimentPipeline {
  static task = "text-classification";
  static model = "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
  static instance = null;

  static async getInstance() {
    if (this.instance === null) {
      // Configure the environment
      env.cacheDir = "./.cache";

      // Initialize the pipeline
      this.instance = pipeline(this.task, this.model);
    }
    return this.instance;
  }
}

// Initialize the pipeline when the server starts
SentimentPipeline.getInstance();

// Sentiment analysis endpoint
app.post("/sentiment", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Get the sentiment analyzer instance
    const sentimentAnalyzer = await SentimentPipeline.getInstance();

    // Get sentiment prediction
    const result = await sentimentAnalyzer(text);

    return res.json({
      label: result[0].label,
      score: result[0].score,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
