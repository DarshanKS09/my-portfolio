import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Summary from './sections/Summary';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Summary />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;
