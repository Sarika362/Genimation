import React from "react";
import Carousel from "./Carousel"; // Import the Carousel component
import "./features.css";
import featuresVideo from "../../assets/videos/demo/demo.mp4";

const Features = () => {
    // Define the data for the carousel slides
    const slides = [
        {
            video: featuresVideo,
            title: "Text-to-Animation Magic",
            description: "Transform your text into stunning animated videos effortlessly.",
        },
        {
            video: featuresVideo,
            title: "Effortless Creativity, Simplified",
            description: "Enjoy an easy-to-use interface designed for creators of all skill levels.",
        },
        {
            video: featuresVideo,
            title: "Instant Animation, Anytime",
            description: "Generate high-quality animations in seconds, lightning-fast and efficient.",
        },
        {
            video: featuresVideo,
            title: "Next-Level Animation Technology",
            description: "Powered by cutting-edge AI for sharper, more vibrant, and precise animations.",
        },
    ];

    return (
        <section className="features section" id="features">
        <h1 className="section__title features">What Makes “Genimation” Stand Out</h1>
        {/* Pass the slides data to the Carousel component */}
        <Carousel slides={slides} />
        </section>
    );
};

export default Features;
