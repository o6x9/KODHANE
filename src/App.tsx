import React, { lazy, Suspense } from 'react';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Technologies = lazy(() => import('./components/Technologies'));
const Team = lazy(() => import('./components/Team'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component for better UX
const SectionLoader: React.FC = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Suspense fallback={<SectionLoader />}>
        <Hero />
      </Suspense>

      {/* About Section */}
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      {/* Services Section */}
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>

      {/* Technologies Section */}
      <Suspense fallback={<SectionLoader />}>
        <Technologies />
      </Suspense>

      {/* Team Section */}
      <Suspense fallback={<SectionLoader />}>
        <Team />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;