import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      
      {/* Background Elements - Hidden on mobile for performance */}
      <div className="hidden md:flex items-center justify-center absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-400 opacity-10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-black opacity-5 rounded-full animate-float-slow"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full safe-top safe-bottom">
          
          {/* Content Container with Animation */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            
            {/* Logo - Mobile Responsive */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[32rem] xl:h-[32rem] mx-auto mb-8 md:mb-16 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Innovation Co. Logo" 
                className="w-full h-full object-contain drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Headline - Mobile Responsive */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Innovation
              <br />
              <span className="text-gray-600 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                Redefined
              </span>
            </h1>

            {/* Description - Mobile Responsive */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-2 sm:px-0">
              We craft digital experiences that push boundaries and create lasting impact through cutting-edge technology and creative excellence.
            </p>

            {/* CTA Button - Mobile Optimized */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 text-base md:text-lg font-semibold hover:bg-gray-800 active:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 min-h-[48px] rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                aria-label="Get started with our services"
              >
                Get Started
              </button>
              
              <button
                className="w-full sm:w-auto border-2 border-gray-900 text-gray-900 px-8 py-4 text-base md:text-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 min-h-[48px] rounded-lg transform hover:-translate-y-0.5 active:translate-y-0"
                aria-label="Learn more about our services"
              >
                Learn More
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Mobile Responsive */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 opacity-70">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-xs sm:text-sm mb-2 hidden sm:block">Scroll down</span>
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div> */}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-gray-100 to-transparent rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Hero;