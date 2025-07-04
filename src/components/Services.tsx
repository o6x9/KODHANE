import React from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with cutting-edge technologies and best practices.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 18H7V6h10v1h2V3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v1z"/>
        </svg>
      )
    },
    {
      title: "UI/UX Design",
      description: "Intuitive and beautiful user interfaces that enhance user experience and engagement.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment strategies for modern applications.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
      )
    },
    {
      title: "Consulting",
      description: "Strategic technology consulting to help businesses leverage digital transformation.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h10v14z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Background Elements */}
      <ParallaxLayer offset={2} speed={0.1} className="flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-32 h-32 border border-grey opacity-20 rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/6 w-24 h-24 border border-black opacity-10 rotate-12"></div>
        </div>
      </ParallaxLayer>

      {/* Main Content */}
      <ParallaxLayer offset={2} speed={0.5} className="flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Our <span className="text-grey">Services</span>
            </h2>
            <p className="text-lg text-grey max-w-2xl mx-auto">
              We offer comprehensive digital solutions tailored to meet your business needs and drive growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white p-8 border-2 border-grey border-opacity-20 hover:border-opacity-40 transition-all duration-300 h-full">
                  <div className="text-black group-hover:text-grey transition-colors duration-300 mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4 group-hover:text-grey transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-grey leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxLayer>
    </>
  );
};

export default Services;