// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000;

// Change to a more widely supported SDXL model
const HF_MODEL_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';
// You can also try the refiner if the base works: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-refiner-1.0';

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await fetch(HF_MODEL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('image')) {
      const buffer = await response.buffer();
      const base64 = buffer.toString('base64');
      res.send({ image: `data:image/png;base64,${base64}` });
    } else {
      // Attempt to parse error as JSON first, then fallback to text
      let errorDetails;
      try {
          errorDetails = await response.json();
          console.error('❌ Hugging Face API Error (JSON):', errorDetails);
      } catch {
          errorDetails = await response.text();
          console.error('❌ Hugging Face API Error (Text):', errorDetails);
      }

      res.status(response.status).json({ // Use response.status for more accurate error codes
        error: 'Image generation failed',
        reason: errorDetails.error || errorDetails // Pass the specific error message
      });
    }
  } catch (err) {
    console.error('❌ Server error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});