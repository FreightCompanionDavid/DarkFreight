const axios = require('axios');
const { initializeGroq } = require('../config/groq');

const groqClient = initializeGroq();

const sendGroqRequest = async (messages) => {
  try {
    const response = await groqClient.post('', {
      messages: messages,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending request to GROQ:', error);
    throw new Error('Failed to communicate with GROQ service');
  }
};

const verifyShipmentDetails = async (shipmentDetails) => {
  const messages = [
    {
      role: 'system',
      content: 'Verify the following shipment details.',
    },
    {
      role: 'user',
      content: JSON.stringify(shipmentDetails),
    },
  ];

  return await sendGroqRequest(messages);
};

const scanAndDigitizeDocument = async (documentUrl) => {
  const messages = [
    {
      role: 'system',
      content: 'Scan and digitize the document from the provided URL.',
    },
    {
      role: 'user',
      content: {
        type: 'image_url',
        image_url: {
          url: documentUrl,
        },
      },
    },
  ];

  return await sendGroqRequest(messages);
};

const getRealTimeUpdates = async () => {
  const messages = [
    {
      role: 'system',
      content: 'Provide real-time updates on document processing.',
    },
  ];

  return await sendGroqRequest(messages);
};

module.exports = {
  verifyShipmentDetails,
  scanAndDigitizeDocument,
  getRealTimeUpdates,
};
