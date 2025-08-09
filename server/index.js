import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK",
    message: "MemeForge AI Server is running",
    timestamp: new Date().toISOString()
  });
});

// ✅ AI Image Generation using Hugging Face
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        error: "Invalid input",
        message: "Prompt is required and must be a non-empty string"
      });
    }

    if (prompt.length > 500) {
      return res.status(400).json({
        error: "Invalid input",
        message: "Prompt must be less than 500 characters"
      });
    }

    // Check if API key is configured
    if (!process.env.HUGGINGFACE_API_KEY) {
      console.error("❌ HUGGINGFACE_API_KEY not found in environment variables");
      return res.status(500).json({
        error: "Configuration error",
        message: "AI service not configured. Please add HUGGINGFACE_API_KEY to your .env file"
      });
    }

    console.log("🎨 Generating image for prompt:", prompt);

    // Enhanced prompt for better meme generation
    const enhancedPrompt = `${prompt}, meme style, funny, high quality, clear image, digital art`;

    // Call Hugging Face Stable Diffusion API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            num_inference_steps: 20,
            guidance_scale: 7.5,
            width: 512,
            height: 512
          }
        }),
        timeout: 30000 // 30 second timeout
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Hugging Face API error:", response.status, errorText);
      
      if (response.status === 401) {
        return res.status(401).json({
          error: "Authentication failed",
          message: "Invalid API key. Please check your HUGGINGFACE_API_KEY"
        });
      }
      
      if (response.status === 429) {
        return res.status(429).json({
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later"
        });
      }

      return res.status(500).json({
        error: "AI service error",
        message: "Failed to generate image. Please try again"
      });
    }

    // Get image buffer
    const imageBuffer = await response.buffer();
    
    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error("Empty response from AI service");
    }

    // Convert to base64 data URL
    const base64Image = imageBuffer.toString('base64');
    const imageDataUrl = `data:image/png;base64,${base64Image}`;

    console.log("✅ Image generated successfully");

    res.json({
      success: true,
      image: imageDataUrl,
      prompt: prompt,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Error generating image:", error);
    
    if (error.code === 'ECONNABORTED' || error.name === 'TimeoutError') {
      return res.status(408).json({
        error: "Request timeout",
        message: "Image generation timed out. Please try again"
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred while generating the image"
    });
  }
});

// ✅ Fallback route for undefined endpoints
app.use('*', (req, res) => {
  res.status(404).json({
    error: "Not found",
    message: "Endpoint not found"
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ MemeForge AI Server running on http://localhost:${PORT}`);
  console.log(`🔑 Hugging Face API Key: ${process.env.HUGGINGFACE_API_KEY ? '✅ Configured' : '❌ Missing'}`);
});