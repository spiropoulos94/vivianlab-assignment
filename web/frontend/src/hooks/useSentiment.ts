import { useState } from "react";
import axios from "axios";
import { SentimentResponse } from "../types/sentiment";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/sentiment";

export const useSentiment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SentimentResponse | null>(null);

  const analyzeSentiment = async (text: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(API_URL, { text });

      // Transform the response to match the frontend's expected structure
      const transformedResult = {
        sentiment: response.data.label,
        confidence: response.data.score,
      };

      setResult(transformedResult);
    } catch (err) {
      setError("Failed to analyze sentiment. Please try again.");
      console.error("Sentiment analysis error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    result,
    analyzeSentiment,
  };
};
