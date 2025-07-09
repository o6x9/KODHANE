// src/components/Team.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { teamData } from '../data/teamMembers';

// === Types ===
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  picture: string;     // ← added
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

interface Stat {
  label: string;
}

interface StatCardProps extends Stat {
  index: number;
}

interface Quote {
  text: string;
  author: string;
}

// === Animated Counter ===
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated) {
        setAnimated(true);
        let start: number;
        const step = (ts: number) => {
          start = start ?? ts;
          const progress = Math.min((ts - start) / duration, 1);
          const val = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(val * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.1, rootMargin: '-50px' });
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration, animated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// === Team Card ===
const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
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
      className={`group cursor-pointer transition-all duration-600 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-white p-6 border border-gray-200 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        {/* ← Render the photo */}
        <img
          src={member.picture}
          alt={member.name}
          className="w-36 h-36 rounded-full object-cover mb-4 mx-auto"
        />

        {/* ← Textual info */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          {member.name}
        </h3>
        <p className="text-gray-600 font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
};

// === Stat Card ===
const StatCard: React.FC<StatCardProps> = ({ label, index }) => {
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
      className={`rounded-lg p-6 border border-gray-200 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
        <AnimatedCounter
          end={[35, 5, 24][index]}
          suffix={['+', '+', '/7'][index]}
          duration={2000 + index * 200}
        />
      </div>
      <div className="text-sm sm:text-base text-gray-600">{label}</div>
    </div>
  );
};

// === Main Team Component ===
const Team: React.FC = () => {
  const { t } = useTranslation('team');
  const [headerVisible, setHeaderVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs1 = new IntersectionObserver(
      ([e]) => e.isIntersecting && setHeaderVisible(true),
      { threshold: 0.1, rootMargin: '-50px' }
    );
    headerRef.current && obs1.observe(headerRef.current);

    const obs2 = new IntersectionObserver(
      ([e]) => e.isIntersecting && setQuoteVisible(true),
      { threshold: 0.1, rootMargin: '-50px' }
    );
    quoteRef.current && obs2.observe(quoteRef.current);

    return () => {
      obs1.disconnect();
      obs2.disconnect();
    };
  }, []);

  // 1) get translated text objects
  const section = t('sectionHeader', { returnObjects: true }) as {
    title: string;
    subtitle: string;
  };
  const textMembers = t('teamMembers', { returnObjects: true }) as Omit<
    TeamMember,
    'picture'
  >[];
  const statsLabels = t('stats', { returnObjects: true }) as Stat[];
  const quoteObj = t('quote', { returnObjects: true }) as Quote;

  // 2) merge picture-paths in matching order
  const members: TeamMember[] = textMembers.map((m, i) => ({
    ...m,
    picture: teamData[i]?.picture || '/teamPictures/default.png',
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            {section.title.split(' ').map((w, i) => (
              <span
                key={i}
                className={i === 1 ? 'text-gray-600' : undefined}
              >
                {w}
                {i < section.title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {members.map((m, idx) => (
            <TeamCard key={idx} member={m} index={idx} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 text-center">
          {statsLabels.map((s, idx) => (
            <StatCard key={idx} label={s.label} index={idx} />
          ))}
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className={`bg-white p-8 border border-gray-200 rounded-lg shadow-sm text-center transition-all duration-800 ${
            quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-4xl text-gray-300 mb-4">“</div>
          <p className="italic text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            {quoteObj.text}
          </p>
          <div className="font-medium text-gray-900">{quoteObj.author}</div>
        </div>
      </div>
    </div>
  );
};

export default Team;
