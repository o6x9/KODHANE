import React from 'react';
import { Parallax } from '@react-spring/parallax';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Technologies from './components/Technologies';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Parallax pages={7} className="overflow-hidden">
        {/* Hero Section - Page 0 */}
        <Hero />
        
        {/* About Section - Page 1 */}
        <About />
        
        {/* Services Section - Page 2 */}
        <Services />
        
        {/* Technologies Section - Page 3 */}
        <Technologies />
        
        {/* Team Section - Page 4 */}
        <Team />
        
        {/* Contact Section - Page 5 */}
        <Contact />
        
        {/* Footer - Page 6 */}
        <Footer />
      </Parallax>
    </div>
  );
};

export default App;