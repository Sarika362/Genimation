import React from 'react';
import "./archives.css";

// Import images dynamically from the 'assets/videos/archives' folder
const importImages = (requireContext) =>
    requireContext.keys().map(requireContext);
const images = importImages(require.context('../../assets/videos/archives', false, /\.(png|jpeg|jpg|svg)$/));

const Archives = () => {
    return (
        <section className='Archives section' id='archives'>
            <h2 className='section__title archives'>
                Discover the Vision Behind
                <br />
                "Genimation"
            </h2>
            <div className='masonry-layout'>
                {images.map((image, index) => (
                    <div key={index} className='masonry-item'>
                        <img src={image} alt={`Archive ${index + 1}`} className='masonry-image' />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Archives;
