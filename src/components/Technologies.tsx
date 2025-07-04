import React, { useState, useEffect } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ 
  end, 
  duration = 2000, 
  suffix = "" 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Technologies: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Language" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "MongoDB", category: "Database" },
    { name: "GraphQL", category: "API" },
    { name: "Next.js", category: "Framework" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis", category: "Cache" },
  ];

  const clients = [
    "TechCorp", "InnovateLab", "DataFlow", "CloudBase", 
    "StartupXYZ", "Enterprise Solutions", "Digital Dynamics", "FutureSync"
  ];

  return (
    <>
      {/* Background Elements */}
      <ParallaxLayer offset={3} speed={0.3} className="flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/3 w-2 h-32 bg-grey opacity-20 animate-float"></div>
          <div className="absolute bottom-10 right-1/3 w-2 h-24 bg-black opacity-10 animate-float-slow"></div>
        </div>
      </ParallaxLayer>

      {/* Main Content */}
      <ParallaxLayer offset={3} speed={0.5} className="flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Technologies & <span className="text-grey">Clients</span>
            </h2>
            <p className="text-lg text-grey max-w-2xl mx-auto">
              We work with cutting-edge technologies and trusted by industry leaders worldwide.
            </p>
          </motion.div>

          {/* Technologies Section */}
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-semibold text-black mb-8 text-center"
            >
              Technologies We Master
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="bg-white p-6 border border-grey border-opacity-20 hover:border-opacity-50 transition-all duration-300 text-center">
                    <div className="w-12 h-12 bg-black group-hover:bg-grey transition-colors duration-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-black mb-2">{tech.name}</h4>
                    <p className="text-grey text-sm">{tech.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Clients Section */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-2xl font-semibold text-black mb-8 text-center"
            >
              Trusted by Industry Leaders
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center py-8 px-4 border border-grey border-opacity-20 hover:border-opacity-50 transition-all duration-300"
                >
                  <div className="text-lg font-medium text-grey hover:text-black transition-colors duration-300">
                    {client}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Section with Animated Counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-20 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="py-8">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                  <AnimatedCounter end={15} suffix="+" duration={2000} />
                </div>
                <div className="text-grey">Technologies Mastered</div>
              </div>
              <div className="py-8">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                  <AnimatedCounter end={200} suffix="+" duration={2200} />
                </div>
                <div className="text-grey">Projects Delivered</div>
              </div>
              <div className="py-8">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                  <AnimatedCounter end={98} suffix="%" duration={2400} />
                </div>
                <div className="text-grey">Client Retention</div>
              </div>
            </div>
          </motion.div>
        </div>
      </ParallaxLayer>
    </>
  );
};

export default Technologies;