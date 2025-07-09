import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Counter that animates when in view
interface AnimatedCounterProps { end: number; duration?: number; suffix?: string; }
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start: number;
          const step = (timestamp: number) => {
            start = start ?? timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );
    ref.current && observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Tech Card
interface Technology { name: string; category: string; }
interface TechCardProps { tech: Technology; index: number; }
const TechCard: React.FC<TechCardProps> = ({ tech, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setTimeout(() => setVisible(true), index * 50),
      { threshold: 0.1 }
    );
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`group transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="bg-white p-4 sm:p-6 border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 group-hover:bg-gray-600 transition-colors duration-300 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{tech.name}</h4>
        <p className="text-gray-600 text-xs sm:text-sm">{tech.category}</p>
      </div>
    </div>
  );
};

// Client Card
interface ClientCardProps { client: string; index: number; }
const ClientCard: React.FC<ClientCardProps> = ({ client, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setTimeout(() => setVisible(true), index * 100),
      { threshold: 0.1 }
    );
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-center py-6 sm:py-8 px-3 sm:px-4 border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-300 transform hover:scale-105">
        <div className="text-base sm:text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300">
          {client}
        </div>
      </div>
    </div>
  );
};

// Section Header
interface SectionHeaderProps { title: string; subtitle: string; isVisible: boolean; }
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, isVisible }) => (
  <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
      {title.split(' ').map((w, i) => (
        <span key={i} className={i === 1 ? 'text-gray-600' : ''}>
          {w}{i < title.split(' ').length - 1 && ' '}
        </span>
      ))}
    </h2>
    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
      {subtitle}
    </p>
  </div>
);

// Stats Card
interface Stat { value: number; suffix: string; label: string; }
interface StatCardProps extends Stat { index: number; }
const StatCard: React.FC<StatCardProps> = ({ value, suffix, label, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setTimeout(() => setVisible(true), index * 100),
      { threshold: 0.1 }
    );
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`rounded-lg p-6 border border-gray-200 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
        <AnimatedCounter end={value} suffix={suffix} duration={2000 + index * 200} />
      </div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
};

const Technologies: React.FC = () => {
  const { t } = useTranslation('technologies');
  const [headerVisible, setHeaderVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => e.isIntersecting && setHeaderVisible(true), { threshold: 0.1, rootMargin: '-50px' });
    headerRef.current && obs1.observe(headerRef.current);
    const obs2 = new IntersectionObserver(([e]) => e.isIntersecting && setStatsVisible(true), { threshold: 0.1, rootMargin: '-50px' });
    statsRef.current && obs2.observe(statsRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  // JSON data
  const sectionHeader = t('sectionHeader', { returnObjects: true }) as { title: string; subtitle: string };
  const techSectionTitle = t('technologiesSectionTitle');
  const clientSectionTitle = t('clientsSectionTitle');
  const technologies = t('technologies', { returnObjects: true }) as Technology[];
  const clients = t('clients', { returnObjects: true }) as string[];
  const statsLabels = t('stats', { returnObjects: true }) as Array<{ label: string }>;

  const stats: Stat[] = [
    { value: 15, suffix: '+', label: statsLabels[0]?.label },
    { value: 200, suffix: '+', label: statsLabels[1]?.label },
    { value: 98, suffix: '%', label: statsLabels[2]?.label }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          <SectionHeader title={sectionHeader.title} subtitle={sectionHeader.subtitle} isVisible={headerVisible} />
        </div>
        {/* Technologies */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8 text-center">{techSectionTitle}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {technologies.map((tech, idx) => <TechCard key={idx} tech={tech} index={idx} />)}
          </div>
        </div>
        {/* Clients */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8 text-center">{clientSectionTitle}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {clients.map((c, idx) => <ClientCard key={idx} client={c} index={idx} />)}
          </div>
        </div>
        {/* Stats */}
        <div ref={statsRef} className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 transition-all duration-800 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((s, idx) => <StatCard key={idx} {...s} index={idx} />)}
        </div>
      </div>
    </div>
  );
};

export default Technologies;
