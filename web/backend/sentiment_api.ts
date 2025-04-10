import express, { Request, Response } from "express";
import { pipeline, env } from "@huggingface/transformers";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS with specific options
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Enable JSON parsing
app.use(express.json());

// Types for sentiment analysis results
interface SentimentResult {
  label: string;
  score: number;
}

// Initialize the sentiment analysis pipeline
class SentimentPipeline {
  static task = "text-classification" as const;
  static model = "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
  static instance: any = null;

  static async getInstance(): Promise<any> {
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
app.post("/sentiment", (req: Request, res: Response) => {
  (async () => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "No text provided" });
      }

      // Get the sentiment analyzer instance
      const sentimentAnalyzer = await SentimentPipeline.getInstance();

      // Get sentiment prediction
      const result = await sentimentAnalyzer(text);

      // The model only predicts POSITIVE or NEGATIVE
      // If the confidence score is between 0.4 and 0.6, consider it NEUTRAL
      let label = result[0].label;
      const score = result[0].score;

      if (score > 0.4 && score < 0.6) {
        label = "NEUTRAL";
      }

      return res.json({
        label: label,
        score: score,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: (error as Error).message });
    }
  })();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
