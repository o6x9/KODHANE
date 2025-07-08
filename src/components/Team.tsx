import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
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
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  email: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden bg-white p-4 sm:p-6 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300 rounded-lg transform hover:scale-105 hover:-translate-y-2">
        {/* Profile Image */}
        <div className="aspect-square mb-4 sm:mb-6 relative overflow-hidden rounded-lg group-hover:shadow-md transition-all duration-300">
          {!imageError ? (
            <img 
              src="/1.jpg" 
              alt={`${member.name} - ${member.role}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* LinkedIn Icon */}
              <a 
                href={member.linkedin} 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 transform hover:scale-110"
                aria-label={`${member.name}'s LinkedIn`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Email Icon */}
              <a 
                href={`mailto:${member.email}`} 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 transform hover:scale-110"
                aria-label={`Email ${member.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-gray-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
            {member.role}
          </p>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  duration: number;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, suffix, label, duration, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`py-6 sm:py-8 bg-white border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-500 rounded-lg transform hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
        <AnimatedCounter end={value} suffix={suffix} duration={duration} />
      </div>
      <div className="text-sm sm:text-base text-gray-600">{label}</div>
    </div>
  );
};

const Team: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const team: TeamMember[] = [
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

  const stats = [
    { value: 35, suffix: "+", label: "Team Members", duration: 2000 },
    { value: 5, suffix: "+", label: "Years Experience", duration: 2200 },
    { value: 24, suffix: "/7", label: "Support Available", duration: 2400 }
  ];

  useEffect(() => {
    const observers: Array<{
      ref: React.RefObject<HTMLDivElement>;
      setter: React.Dispatch<React.SetStateAction<boolean>>;
    }> = [
      { ref: headerRef, setter: setHeaderVisible },
      { ref: quoteRef, setter: setQuoteVisible }
    ];

    const observerInstances = observers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
          }
        },
        { threshold: 0.1, rootMargin: '-50px' }
      );

      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => {
      observerInstances.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Meet Our <span className="text-gray-600">Team</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            A diverse group of passionate professionals dedicated to delivering exceptional results and driving innovation forward.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {team.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={stat.duration}
              delay={800 + index * 100}
            />
          ))}
        </div>

        {/* Team Quote */}
        <div
          ref={quoteRef}
          className={`text-center bg-white p-6 sm:p-8 border border-gray-200 rounded-lg shadow-sm transition-all duration-800 ${
            quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-3xl sm:text-4xl text-gray-400 mb-4">"</div>
          <p className="text-base sm:text-lg text-gray-600 italic mb-4 max-w-3xl mx-auto leading-relaxed">
            Together, we're not just building software – we're crafting digital experiences that transform businesses and inspire innovation across industries.
          </p>
          <div className="text-sm sm:text-base text-gray-900 font-medium">
            — Innovation Co. Team
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;