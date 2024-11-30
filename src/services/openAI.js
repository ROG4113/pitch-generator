import axios from 'axios';
import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;

const openAi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
});

export const getOpenAiResponse = async (data, maxTokens = 100) => {
  const messages = [
    { role: "system", content: "You are a helpful assistant who creates a narrative for an investment thesis and catalyst based on the provided data. The narrative should have no more than three points and be formatted in HTML using <ul> and <li> tags." },
    {
      role: "user",
      content: data,
    },
  ]

  try {
    const response = await openAi.post('/completions', {
      model: 'text-davinci-003',
      messages: messages,
      max_tokens: maxTokens
    });
    return response.data;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};