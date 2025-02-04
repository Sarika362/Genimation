// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import Home from './components/home/Home';
import Archives from './components/archives/Archives';
import Features from './components/features/Features';
import Demo from './components/demo/Demo';
import Contact from './components/footer/Contact';
import Genimation from './components/genimation/Genimation'; // Import the Genimation component

function App() {
  return (
    <Router>
      <Navbar />
      <main className='main'>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Archives />
              <Demo />
              <Features />
              <Contact />
            </>
          } />

          <Route path="/genimation" element={<Genimation />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
