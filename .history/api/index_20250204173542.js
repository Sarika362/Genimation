require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Replicate = require("replicate");

const app = express();
const API_TOKEN = process.env.REPLICATE_API_TOKEN;

const replicate = new Replicate({ auth: API_TOKEN });

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

// Sample API Route
app.get("/", (req, res) => {
    res.send("Genimation Backend is running on Vercel!");
});

// POST route for generating video
app.post("/generate-video", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const input = {
            prompt: prompt,
            duration: 4
        };

        // Initiate video generation
        const prediction = await replicate.predictions.create({
            model: "haiper-ai/haiper-video-2",
            input
        });

        console.log("Prediction Created:", prediction);
        const predictionId = prediction.id;
        let videoUrl = null;

        // Polling until video generation is complete
        while (!videoUrl) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 sec

            const checkStatus = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
                headers: { Authorization: `Token ${API_TOKEN}` }
            });

            console.log("Status Response:", checkStatus.data);

            if (checkStatus.data.status === "succeeded") {
                videoUrl = checkStatus.data.output;  // Direct URL of the generated video
                break;
            } else if (checkStatus.data.status === "failed") {
                return res.status(500).json({ error: "Video generation failed." });
            }
        }

        if (!videoUrl) {
            return res.status(500).json({ error: "Failed to retrieve video URL" });
        }

        // Return the video URL directly
        res.json({ video_url: videoUrl });
    } catch (error) {
        console.error("Error generating video:", error);
        res.status(500).json({ error: "Failed to generate video" });
    }
});

// Export the app (Required for Vercel)
module.exports = app;