import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
        if (entry.isIntersecting && !isVisible) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    ref.current && observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (time: number) => {
      startTime = startTime ?? time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About: React.FC = () => {
  const { t } = useTranslation('about');
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  // Translations
  const aboutTitle = t('aboutTitle');
  const aboutDescription = t('aboutDescription');
  const missionTitle = t('missionTitle');
  const missionDescription = t('missionDescription');
  const statsLabels = t('stats', { returnObjects: true }) as Record<string, string>;
  const valuesTitle = t('valuesTitle');
  const valuesData = t('values', { returnObjects: true }) as Array<{ icon: string; title: string; description: string }>;
  const timelineData = t('timeline', { returnObjects: true }) as Array<{ year: string; title: string; description: string }>;
  const timelineCurrent = t('timelineCurrent');

  // Stats mapping
  const stats = [
    { end: 150, suffix: '+', label: statsLabels.projectsDelivered },
    { end: 100, suffix: '%', label: statsLabels.clientSatisfaction },
    { end: 35, suffix: '+', label: statsLabels.teamMembers },
    { end: 5, suffix: '', label: statsLabels.yearsExperience }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (id: string, base = '') =>
    `${base} transition-all duration-700 ${visibleSections[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div id="header" data-animate className={getAnimationClass('header', 'text-center mb-16')}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {aboutTitle}
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* Text Content */}
          <div id="content" data-animate className={getAnimationClass('content')}>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
              {aboutDescription}
            </p>

            {/* Mission Statement */}
            <div className="bg-white p-6 sm:p-8 border-l-4 border-gray-900 mb-8 shadow-lg rounded-r-lg">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                {missionTitle}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {missionDescription}
              </p>
            </div>

            {/* Stats Grid */}
            <div id="stats" data-animate className={getAnimationClass('stats', 'grid grid-cols-2 gap-4 sm:gap-6')}>
              {stats.map((s, idx) => (
                <div key={idx} className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold mb-2">
                    <AnimatedCounter end={s.end} suffix={s.suffix} duration={2000 + idx * 200} />
                  </div>
                  <div className="text-gray-600 text-sm font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div id="timeline" data-animate className={getAnimationClass('timeline', 'relative')}>
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-900 via-gray-600 to-gray-900 opacity-30" />
            {timelineData.map((item, idx) => (
              <div key={idx} className="relative pl-12 pb-8 last:pb-0">
                <div className="absolute left-2 top-0 w-4 h-4 bg-gray-900 rounded-full border-4 border-white" />
                <div className="bg-white p-4 sm:p-6 border-l-4 border-gray-600 rounded-r-lg shadow hover:border-gray-900">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold bg-gray-900 text-white px-3 py-1 rounded-full">
                      {item.year} {item.year === '2025' && `(${timelineCurrent})`}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div id="values" data-animate className={getAnimationClass('values', 'text-center')}>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-12">
            {valuesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesData.map((v, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{v.title}</h4>
                <p className="text-gray-700 text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
