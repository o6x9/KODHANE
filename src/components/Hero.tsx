import React from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <>
      {/* Background Elements - Hidden on mobile for performance */}
      <ParallaxLayer offset={0} speed={0.1} className="hidden md:flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-grey opacity-10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-black opacity-5 rounded-full animate-float-slow"></div>
        </div>
      </ParallaxLayer>

      {/* Main Content */}
      <ParallaxLayer offset={0} speed={0.5} className="flex items-center justify-center min-h-screen">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full safe-top safe-bottom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
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
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 md:mb-6 leading-tight">
              Innovation
              <br />
              <span className="text-grey">Redefined</span>
            </h1>

            {/* Description - Mobile Responsive */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-grey max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2 sm:px-0">
              We craft digital experiences that push boundaries and create lasting impact through cutting-edge technology and creative excellence.
            </p>

            {/* CTA Button - Mobile Optimized */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium hover:bg-grey transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 min-h-[48px] rounded-md sm:rounded-none"
              aria-label="Get started with our services"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </ParallaxLayer>

      {/* Floating Elements - Hidden on mobile */}
      <ParallaxLayer offset={0} speed={0.8} className="pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 w-4 h-4 bg-grey rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-black rounded-full animate-float-slow opacity-40"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-grey rounded-full animate-float opacity-50"></div>
      </ParallaxLayer>

      {/* Scroll Indicator - Mobile Responsive */}
      <ParallaxLayer offset={0} speed={1} className="flex items-end justify-center pb-4 md:pb-8 pointer-events-none">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-grey opacity-60"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </ParallaxLayer>
    </>
  );
};

export default Hero;