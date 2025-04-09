export interface SentimentResponse {
  sentiment: string;
  confidence: number;
}

export interface SentimentRequest {
  text: string;
}
