import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./genimation.css";

// Load API Key from environment variables
const API_KEY = process.env.REACT_APP_REPLICATE_API_KEY;
if (!API_KEY) {
  console.error("Missing API Key. Make sure to set REACT_APP_REPLICATE_API_KEY in .env.");
}

const Genimation = () => {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) {
      alert("Please enter a description!");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Request video generation
      const response = await axios.post(
        "https://api.replicate.com/v1/predictions",
        {
          model: "haiper-ai/haiper-video-2",
          input: { prompt: input, duration: 4 },
        },
        {
          headers: {
            Authorization: `Token ${API_KEY}`,
            "Content-Type": "application/json",
          },
        },

      );

      const predictionId = response.data.id;
      console.log("Prediction ID:", predictionId);

      // Step 2: Poll the API until the video is ready
      let status = response.data.status;
      let video = null;
      let attempts = 0;
      const maxAttempts = 12; // Max wait time = 12 * 5s = 60s

      while (status !== "succeeded" && status !== "failed" && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 sec before checking status
        attempts++;

        const result = await axios.get(
          `https://api.replicate.com/v1/predictions/${predictionId}`,
          {
            headers: {
              Authorization: `Token ${API_KEY}`,
            },
          }
        );

        status = result.data.status;
        video = result.data.output ? result.data.output[0] : null; // Fix for video array

        console.log(`Attempt ${attempts}: Status - ${status}`);
      }

      if (status === "succeeded" && video) {
        setVideoUrl(video);
      } else {
        alert("Video generation failed or timed out.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate video.");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    if (videoUrl) {
      fetch(videoUrl)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, "generated-video.mp4");
        })
        .catch((error) => {
          console.error("Error downloading video:", error);
          alert("Failed to download.");
        });
    } else {
      alert("No video available.");
    }
  };

  return (
    <section className="dynamic-component">
      <div className="icon">
        {videoUrl ? (
          <div className="output-section">
            <video src={videoUrl} controls></video>
            <button className="button download" onClick={handleDownload}>
              Download Video
            </button>
          </div>
        ) : (
          <i className="bx bxs-video"></i>
        )}
      </div>
      <div className="input-section genimation">
        <input
          type="text"
          className="prompt"
          placeholder="Describe your idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="button generate" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate!"}
        </button>
      </div>
    </section>
  );
};

export default Genimation;