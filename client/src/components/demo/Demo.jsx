import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './demo.css';
import demoVideo from '../../assets/videos/demo/demo.mp4'

const Demo = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/genimation'); // Replace '/genimation' with your input page route
    };

    const videoRef = useRef(null); // Ref for the video element
    const [isPlaying, setIsPlaying] = useState(false); // Video initially paused

    // Function to handle play/pause toggle
    const togglePlayPause = () => {
        if (isPlaying) {
        videoRef.current.pause();
        } else {
        videoRef.current.play();
        }
        setIsPlaying(!isPlaying); // Toggle the play state
    };

    return (
        <section className='demo section' id='demo'>
            <h1 className='section__title demo'>Watch Genimation in Action</h1>

            <div className='video-container'>
                {/* Video Element */}
                <video
                ref={videoRef} // Reference for play/pause control
                className='demo-video'
                loop
                muted
                >
                <source
                    src = {demoVideo}
                    type='video/mp4'
                />
                Your browser does not support the video tag.
                </video>

                {/* Bottom Right Controls */}
                <div className='controls'>
                {/* Try Genimation Button */}
                <Link to='/genimation' className='try' onClick={handleNavigate}>
                    <h2 className='try-genimation'>Try Genimation</h2>
                </Link>

                {/* Play/Pause Button with Icons */}
                <button className='play-button' onClick={togglePlayPause}>
                    <i className={`uil ${isPlaying ? 'uil-pause' : 'uil-play'}`}></i>
                </button>
                </div>
            </div>
        </section>
    );
};

export default Demo;
