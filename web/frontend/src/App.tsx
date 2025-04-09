import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSentiment } from "./hooks/useSentiment";

function App() {
  const [text, setText] = useState("");
  const { loading, error, result, analyzeSentiment } = useSentiment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      analyzeSentiment(text);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "#4caf50";
      case "negative":
        return "#f44336";
      case "neutral":
        return "#2196f3";
      default:
        return "#9e9e9e";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sentiment Analysis
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Enter text to analyze"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading || !text.trim()}
            sx={{ mb: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : "Analyze Sentiment"}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: getSentimentColor(result.sentiment),
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Sentiment: {result.sentiment}
              </Typography>
              <Typography>
                Confidence: {(result.confidence * 100).toFixed(2)}%
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
