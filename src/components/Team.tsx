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

const Team: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years in tech innovation and business strategy.",
      linkedin: "#",
      email: "alex@innovationco.com"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Technical architect specializing in scalable systems and emerging technologies.",
      linkedin: "#",
      email: "sarah@innovationco.com"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Designer",
      bio: "Creative director focused on user-centered design and brand storytelling.",
      linkedin: "#",
      email: "michael@innovationco.com"
    },
    {
      name: "Emily Taylor",
      role: "Head of Development",
      bio: "Full-stack expert leading our development team with passion for clean code.",
      linkedin: "#",
      email: "emily@innovationco.com"
    },
  ];

  return (
    <>
      {/* Background Elements */}
      <ParallaxLayer offset={4} speed={0.2} className="flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-grey opacity-5 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-black opacity-5 rounded-full animate-float-slow"></div>
          <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-grey opacity-3 rounded-full animate-float"></div>
        </div>
      </ParallaxLayer>

      {/* Main Content */}
      <ParallaxLayer offset={4} speed={0.5} className="flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Meet Our <span className="text-grey">Team</span>
            </h2>
            <p className="text-lg text-grey max-w-2xl mx-auto">
              A diverse group of passionate professionals dedicated to delivering exceptional results and driving innovation forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-white p-6 border border-grey border-opacity-20 hover:border-opacity-40 hover:shadow-lg transition-all duration-300 rounded-lg">
                  {/* Profile Image */}
                  <div className="aspect-square mb-6 relative overflow-hidden rounded-lg group-hover:shadow-md transition-all duration-300">
                    <img 
                      src="/1.jpg" 
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder (hidden by default) */}
                    <div className="absolute inset-0 bg-grey bg-opacity-20 hidden items-center justify-center">
                      <svg className="w-20 h-20 text-grey opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* LinkedIn Icon */}
                        <a 
                          href={member.linkedin} 
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-grey transition-colors duration-300"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        {/* Email Icon */}
                        <a 
                          href={`mailto:${member.email}`} 
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-grey transition-colors duration-300"
                          aria-label={`Email ${member.name}`}
                        >
                          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-grey transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-grey font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-grey text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Team Stats with Animated Counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="py-8 bg-white border border-grey border-opacity-20 hover:border-opacity-40 hover:shadow-md transition-all duration-300 rounded-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                <AnimatedCounter end={35} suffix="+" duration={2000} />
              </div>
              <div className="text-grey">Team Members</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="py-8 bg-white border border-grey border-opacity-20 hover:border-opacity-40 hover:shadow-md transition-all duration-300 rounded-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                <AnimatedCounter end={5} suffix="+" duration={2200} />
              </div>
              <div className="text-grey">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="py-8 bg-white border border-grey border-opacity-20 hover:border-opacity-40 hover:shadow-md transition-all duration-300 rounded-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                <AnimatedCounter end={24} suffix="/7" duration={2400} />
              </div>
              <div className="text-grey">Support Available</div>
            </motion.div>
          </motion.div>

          {/* Team Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 text-center bg-white p-8 border border-grey border-opacity-20 rounded-lg"
          >
            <div className="text-4xl text-grey mb-4">"</div>
            <p className="text-lg text-grey italic mb-4 max-w-2xl mx-auto">
              Together, we're not just building software – we're crafting digital experiences that transform businesses and inspire innovation across industries.
            </p>
            <div className="text-sm text-black font-medium">
              — Innovation Co. Team
            </div>
          </motion.div>
        </div>
      </ParallaxLayer>
    </>
  );
};

export default Team;