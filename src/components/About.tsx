import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | undefined;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  
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

  const values = [
    { icon: "🚀", title: "Innovation", description: "Pushing technological boundaries" },
    { icon: "🎯", title: "Excellence", description: "Quality in every detail" },
    { icon: "🤝", title: "Partnership", description: "Collaborative success stories" },
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (id: string, baseClass: string = '') => {
    const isVisible = visibleSections[id];
    return `${baseClass} transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div 
          id="header"
          data-animate
          className={getAnimationClass('header', 'text-center mb-16')}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            About <span className="text-gray-600">Our Story</span>
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          
          {/* Text Content */}
          <div 
            id="content"
            data-animate
            className={getAnimationClass('content')}
          >
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
              We are a passionate team of innovators, designers, and developers who believe in the power of technology to create meaningful change. Our journey began with a simple mission: to bridge the gap between imagination and reality through cutting-edge digital solutions.
            </p>
            
            {/* Mission Statement */}
            <div className="bg-white p-6 sm:p-8 border-l-4 border-gray-900 mb-8 shadow-lg rounded-r-lg">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth, enhance user experiences, and create lasting digital transformation in an ever-evolving technological landscape.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div 
              id="stats"
              data-animate
              className={getAnimationClass('stats', 'grid grid-cols-2 gap-4 sm:gap-6')}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 bg-white border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 rounded-lg group"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2000 + index * 200} />
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div 
            id="timeline"
            data-animate
            className={getAnimationClass('timeline', 'relative')}
          >
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-900 via-gray-600 to-gray-900 opacity-30"></div>
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`relative pl-12 pb-8 last:pb-0 group transition-all duration-500 delay-${index * 100}`}
              >
                <div className="absolute left-2 top-0 w-4 h-4 bg-gray-900 rounded-full border-4 border-white transition-all duration-300 group-hover:bg-gray-600 group-hover:scale-125 shadow-md"></div>
                <div className="bg-white p-4 sm:p-6 border-l-4 border-gray-600 transition-all duration-300 hover:border-gray-900 hover:shadow-lg rounded-r-lg">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full group-hover:bg-gray-600 transition-colors duration-300">
                      {item.year}
                    </div>
                    {item.year === "2025" && (
                      <div className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        Current
                      </div>
                    )}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors duration-300">
                    {item.title}
                  </div>
                  <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div 
          id="values"
          data-animate
          className={getAnimationClass('values', 'text-center')}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 sm:p-8 bg-white border border-gray-200 hover:border-gray-400 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 rounded-lg group"
              >
                <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">{value.title}</h4>
                <p className="text-gray-700 text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background Elements - Simplified */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 right-10 w-32 sm:w-48 lg:w-72 h-0.5 bg-gray-400 opacity-20 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-10 w-24 sm:w-32 lg:w-48 h-0.5 bg-gray-900 opacity-10 -rotate-45 animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 border border-gray-400 opacity-15 rotate-12 animate-pulse delay-2000"></div>
        </div>
      </div>
    </div>
  );
};

export default About;