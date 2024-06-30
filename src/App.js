import React, { useEffect, useState } from "react";
import './App.scss';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import particlesOptions from "./particles.json";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import MyWork from "./components/MyWork";

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let engineInstance;
  
    const initializeParticlesEngine = async () => {
      try {
        engineInstance = await initParticlesEngine(async (engine) => {
          await loadFull(engine);
        });
        setInit(true);
      } catch (error) {
        console.error("Error initializing particles engine:", error);
      }
    };
  
    initializeParticlesEngine();
  
    return () => {
      if (engineInstance && engineInstance.destroy) {
        engineInstance.destroy();
      }
    };
  }, [init]);

  return (
    <div className="App">
      {init && <Particles options={particlesOptions} />}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="mywork" element={<MyWork />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;