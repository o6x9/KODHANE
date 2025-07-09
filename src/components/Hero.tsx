import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation('hero');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
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
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Logo - Mobile Responsive */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[32rem] xl:h-[32rem] mx-auto mb-8 md:mb-16 flex items-center justify-center">
              <img
                src="/logo.png"
                alt={t('logoAlt')}
                className="w-full h-full object-contain drop-shadow-lg"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              {t('headline1')}
              <br />
              <span className="text-gray-600 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                {t('headline2')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-2 sm:px-0">
              {t('description')}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-gray-100 to-transparent rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Hero;
