import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Service {
  icon: string;
  title: string;
  description: string;
}

const Services: React.FC = () => {
  const { t } = useTranslation('services');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const element = document.getElementById('services-section');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Load services from translation JSON
  const services = t('services', { returnObjects: true }) as Service[];
  const sectionTitle = t('servicesTitle');
  const sectionDesc = t('servicesDescription');

  return (
    <section
      id="services-section"
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-20 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-16 h-16 md:w-32 md:h-32 border border-gray-300 opacity-20 rotate-45 transform-gpu" />
        <div className="absolute bottom-1/4 right-1/6 w-12 h-12 md:w-24 md:h-24 border border-gray-400 opacity-10 rotate-12 transform-gpu" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {sectionTitle.split(' ').map((word, idx) => (
              <span key={idx} className={idx === 1 ? 'text-gray-600' : ''}>
                {word}{idx < sectionTitle.split(' ').length - 1 && ' '}
              </span>
            ))}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {sectionDesc}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 h-full
                hover:shadow-lg hover:border-gray-300 hover:-translate-y-1
                transition-all duration-300 cursor-pointer
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : undefined }}
            >
              <div className="text-3xl md:text-4xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 group-hover:text-gray-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
