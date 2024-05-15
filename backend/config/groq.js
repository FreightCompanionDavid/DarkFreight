const axios = require('axios');

const initializeGroq = () => {
  const apiKey = process.env.GROQ_API_KEY;
  const proxyUrl = process.env.GROQ_PROXY_URL || 'http://localhost:8000/proxy/groq/v1/chat/completions';

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not defined in environment variables');
  }

  const groqClient = axios.create({
    baseURL: proxyUrl,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  return groqClient;
};

module.exports = {
  initializeGroq
};
