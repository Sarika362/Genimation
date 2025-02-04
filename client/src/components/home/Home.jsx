import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import "./home.css";

const Home = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();  // Hook for navigation

    // Handle input field focus to navigate to Genimation page
    const handleFocus = () => {
        navigate("/genimation");  // Navigate to Genimation page when input is focused
    };

    // Scroll to Archives section when arrow is clicked
    const handleGoToArchives = () => {
        const archivesSection = document.getElementById("archives");
        if (archivesSection) {
        archivesSection.scrollIntoView({ behavior: "smooth" });  // Smooth scrolling to Archives
        }
    };

    return (
        <section className='home section' id='home'>
            <h1 className='section__title'>See Genimation in Action</h1>
            <h2 className='section__subtitle hero'>Turn your ideas into motion. Start now!</h2>
            <div className="input-section">
                <input
                type="text"
                className="prompt"
                placeholder="Describe your idea..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={handleFocus}  // Trigger navigation on focus
                />
                <button className='button generate'>Generate !</button>
            </div>

            {/* Archives Icon */}
            <div className="archives-icon" onClick={handleGoToArchives}>
                Archives&nbsp;<i className="bx bxs-down-arrow"></i>
            </div>
        </section>
    );
};

export default Home;
