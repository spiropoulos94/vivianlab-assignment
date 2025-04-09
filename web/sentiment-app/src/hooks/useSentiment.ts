import { useState } from "react";
import axios from "axios";
import { SentimentResponse, SentimentRequest } from "../types/sentiment";

const API_URL = "http://localhost:5000/sentiment";

export const useSentiment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SentimentResponse | null>(null);

  const analyzeSentiment = async (text: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<SentimentResponse>(API_URL, { text });
      setResult(response.data);
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
