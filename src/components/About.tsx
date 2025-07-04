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

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timelineItems = [
    { year: "2020", title: "Founded", description: "Started with a vision to transform digital experiences" },
    { year: "2021", title: "Growth", description: "Expanded our team and capabilities across multiple domains" },
    { year: "2022", title: "Innovation", description: "Launched cutting-edge solutions for enterprise clients" },
    { year: "2023", title: "Excellence", description: "Recognized as industry leaders in digital transformation" },
    { year: "2024", title: "Expansion", description: "Global reach with offices in 5 countries" },
    { year: "2025", title: "Future", description: "Leading AI-driven solutions and sustainable technology" },
  ];

  const stats = [
    { end: 150, suffix: "+", label: "Projects Delivered" },
    { end: 100, suffix: "%", label: "Client Satisfaction" },
    { end: 35, suffix: "+", label: "Team Members" },
    { end: 5, suffix: "", label: "Years Experience" },
  ];

  return (
    <>
      {/* Background Elements */}
      <ParallaxLayer offset={1} speed={0.2} className="flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-10 w-72 h-1 bg-grey opacity-20 rotate-45 animate-float"></div>
          <div className="absolute bottom-1/3 left-10 w-48 h-1 bg-black opacity-10 -rotate-45 animate-float-slow"></div>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 border border-grey opacity-15 rotate-12 animate-float"></div>
        </div>
      </ParallaxLayer>

      {/* Main Content */}
      <ParallaxLayer offset={1} speed={0.5} className="flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                About <span className="text-grey">Our Story</span>
              </h2>
              <p className="text-lg text-grey mb-8 leading-relaxed">
                We are a passionate team of innovators, designers, and developers who believe in the power of technology to create meaningful change. Our journey began with a simple mission: to bridge the gap between imagination and reality through cutting-edge digital solutions.
              </p>
              
              {/* Enhanced Mission Statement */}
              <div className="bg-white p-6 border-l-4 border-grey mb-8 shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">Our Mission</h3>
                <p className="text-grey leading-relaxed">
                  To empower businesses with innovative technology solutions that drive growth, enhance user experiences, and create lasting digital transformation in an ever-evolving technological landscape.
                </p>
              </div>
              
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-white p-6 border border-grey border-opacity-20 hover:border-opacity-50 hover:shadow-md transition-all duration-300 rounded-lg">
                      <div className="text-3xl md:text-4xl font-bold text-black mb-2 transition-colors duration-300 group-hover:text-grey">
                        <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2000 + index * 200} />
                      </div>
                      <div className="text-grey text-sm md:text-base font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-black via-grey to-black opacity-30"></div>
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="relative pl-12 pb-8 last:pb-0 group"
                >
                  <div className="absolute left-2 top-0 w-4 h-4 bg-black rounded-full border-4 border-white transition-all duration-300 group-hover:bg-grey group-hover:scale-125 shadow-md"></div>
                  <div className="bg-white p-6 border-l-4 border-grey transition-all duration-300 hover:border-black hover:shadow-lg rounded-r-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-bold text-white bg-black px-3 py-1 rounded-full group-hover:bg-grey transition-colors duration-300">
                        {item.year}
                      </div>
                      {item.year === "2025" && (
                        <div className="text-xs bg-grey bg-opacity-20 text-grey px-2 py-1 rounded-full">
                          Current
                        </div>
                      )}
                    </div>
                    <div className="text-lg font-semibold text-black mb-3 group-hover:text-grey transition-colors duration-300">
                      {item.title}
                    </div>
                    <div className="text-grey text-sm leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Additional Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-semibold text-black mb-8">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "🚀", title: "Innovation", description: "Pushing technological boundaries" },
                { icon: "🎯", title: "Excellence", description: "Quality in every detail" },
                { icon: "🤝", title: "Partnership", description: "Collaborative success stories" },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 border border-grey border-opacity-20 hover:border-opacity-50 hover:shadow-md transition-all duration-300 rounded-lg"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold text-black mb-2">{value.title}</h4>
                  <p className="text-grey">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </ParallaxLayer>
    </>
  );
};

export default About;