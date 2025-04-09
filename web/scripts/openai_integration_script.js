import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables
dotenv.config();

// Get the directory name for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function logConversation(prompt, response) {
  const timestamp = new Date().toISOString();
  const logEntry = `\n[${timestamp}]\nPrompt: ${prompt}\nResponse: ${response}\n${"-".repeat(
    50
  )}\n`;

  const logPath = path.join(__dirname, "chat_log.txt");
  fs.appendFileSync(logPath, logEntry);
}

async function chatWithGPT(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    // Get the response text
    const responseText = completion.choices[0].message.content;

    // Log the conversation
    logConversation(prompt, responseText);

    return responseText;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

// Get prompt from command line arguments
const prompt = process.argv[2];

if (!prompt) {
  console.error("Please provide a prompt as a command-line argument");
  console.error('Usage: npm run openai -- "Your prompt here"');
  process.exit(1);
}

// Run the chat
async function main() {
  const response = await chatWithGPT(prompt);

  if (response) {
    console.log("Response:", response);
  }
}

// Run the example
main().catch(console.error);
