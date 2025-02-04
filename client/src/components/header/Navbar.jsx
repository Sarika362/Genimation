import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [Toggle, showMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to scroll to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
  };

  // Handle navigation and scrolling
  const handleNavClick = (id) => {
    if (location.pathname !== '/') {
      navigate('/'); // Navigate to the home page
      setTimeout(() => scrollToSection(id), 100); // Delay scrolling until DOM is updated
    } else {
      scrollToSection(id); // Scroll directly if already on the home page
    }
  };

  return (
    <header className='navbar'>
      <nav className='nav container'>
        <Link to="/" className='nav_logo'>Genimation</Link>
        <div className={Toggle ? "nav_menu show-menu" : "nav_menu"}>
          <ul className='nav_list grid'>
            <li className='nav_item'>
              <button
                className='nav_link'
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
            </li>
            <li className='nav_item'>
              <button
                className='nav_link'
                onClick={() => handleNavClick('archives')}
              >
                Archives
              </button>
            </li>
            <li className='nav_item'>
              <button
                className='nav_link'
                onClick={() => handleNavClick('demo')}
              >
                Demo
              </button>
            </li>
            <li className='nav_item'>
              <button
                className='nav_link'
                onClick={() => handleNavClick('features')}
              >
                Features
              </button>
            </li>
            <li className='nav_item'>
              <button
                className='nav_link'
                onClick={() => handleNavClick('contact')}
              >
                Creators
              </button>
            </li>
          </ul>
          <i className="uil uil-times nav_close" onClick={() => showMenu(!Toggle)}></i>
        </div>
        <div className='nav_toggle' onClick={() => showMenu(!Toggle)}>
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
