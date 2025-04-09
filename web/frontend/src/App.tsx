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
  Fade,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useSentiment } from "./hooks/useSentiment";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", // Indigo
    },
    secondary: {
      main: "#8b5cf6", // Violet
    },
    background: {
      default: "#f3f4f6", // Light gray
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  const [text, setText] = useState("");
  const { loading, error, result, analyzeSentiment } = useSentiment();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      setIsAnimating(true);
      analyzeSentiment(text);
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    if (!sentiment) return "#9e9e9e";

    switch (sentiment.toLowerCase()) {
      case "positive":
        return "#10b981"; // Emerald
      case "negative":
        return "#ef4444"; // Red
      case "neutral":
        return "#3b82f6"; // Blue
      default:
        return "#9e9e9e"; // Gray
    }
  };

  const getSentimentEmoji = (sentiment?: string) => {
    if (!sentiment) return "😐";

    switch (sentiment.toLowerCase()) {
      case "positive":
        return "😊";
      case "negative":
        return "😞";
      case "neutral":
        return "😐";
      default:
        return "😐";
    }
  };

  const getExampleTexts = [
    "I absolutely love this product! It exceeded all my expectations.",
    "This was a terrible experience. I'm very disappointed.",
    "The service was okay, nothing special to mention.",
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={4}
            sx={{
              p: { xs: 3, md: 5 },
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(229, 231, 235, 0.5)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 4,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                color="primary.main"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sentiment Analysis
              </Typography>
            </Box>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              align="center"
              sx={{ mb: 4, maxWidth: "80%", mx: "auto" }}
            >
              Enter any text below to analyze its sentiment and get instant
              feedback on whether it's positive, negative, or neutral.
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
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                placeholder="Type or paste text here..."
              />

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: "block" }}
                >
                  Try these examples:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {getExampleTexts.map((example, index) => (
                    <Chip
                      key={index}
                      label={example.substring(0, 25) + "..."}
                      onClick={() => setText(example)}
                      variant="outlined"
                      sx={{ cursor: "pointer" }}
                    />
                  ))}
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || !text.trim()}
                sx={{
                  mb: 4,
                  py: 1.5,
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.4)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Analyze Sentiment"
                )}
              </Button>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {result && (
                <Fade in={true} timeout={500}>
                  <Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${getSentimentColor(
                          result.sentiment
                        )}20, ${getSentimentColor(result.sentiment)}40)`,
                        border: `1px solid ${getSentimentColor(
                          result.sentiment
                        )}30`,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: getSentimentColor(result.sentiment),
                            color: "white",
                            borderRadius: "50%",
                            width: 60,
                            height: 60,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2rem",
                            mb: { xs: 2, sm: 0 },
                            mr: { xs: 0, sm: 3 },
                          }}
                        >
                          {getSentimentEmoji(result.sentiment)}
                        </Box>
                        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 600,
                              color: getSentimentColor(result.sentiment),
                              mb: 0.5,
                            }}
                          >
                            {result.sentiment.charAt(0).toUpperCase() +
                              result.sentiment.slice(1)}{" "}
                            sentiment
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            Confidence score:{" "}
                            <strong>
                              {(result.confidence * 100).toFixed(1)}%
                            </strong>
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Fade>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
