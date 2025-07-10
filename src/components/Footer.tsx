import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Social link component
type SocialLinkProps = { href: string; icon: React.ReactNode; name: string; };
const SocialLink = memo<SocialLinkProps>(({ href, icon, name }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -2 }}
    className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
    aria-label={name}
  >
    {icon}
  </motion.a>
));

// Footer section component
interface FooterLink { name: string; href: string; }
interface FooterSectionProps { title: string; links: FooterLink[]; index: number; }
const FooterSection = memo<FooterSectionProps>(({ title, links, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 * index }}
    viewport={{ once: true }}
    className="space-y-4"
  >
    <h4 className="text-white font-semibold text-lg">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, idx) => (
        <li key={idx}>
          <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm block py-1">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </motion.div>
));

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation('footer');
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const cycleLang = () => {
    const langs = ['en', 'ar', 'tr'];
    const idx = langs.indexOf(i18n.language);
    const next = langs[(idx + 1) % langs.length];
    i18n.changeLanguage(next);
  };

  // Company info
  const company = t('company', { returnObjects: true }) as Record<string, string>;

  // Sections
  const sections = t('sections', { returnObjects: true }) as Array<{ title: string; links: string[] }>;
  const sectionHrefs = [
    ['#about', '#team', '#careers', '#press'],
    ['#services', '#services', '#services', '#services'],
    ['#blog', '#portfolio', '#docs', '#support'],
    ['#privacy', '#terms', '#cookies', '#gdpr']
  ];

  // Social links data with complete white SVG icons
  const socialData = [
    { 
      href: 'https://linkedin.com/company/innovation-co', 
      icon: (
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      href: 'https://twitter.com/innovation_co', 
      icon: (
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      href: 'https://github.com/innovation-co', 
      icon: (
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      href: 'https://instagram.com/innovation.co', 
      icon: (
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ];
  const socialNames = t('socialLinks', { returnObjects: true }) as string[];

  const bottom = t('bottom', { returnObjects: true }) as Record<string, string>;

  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Company Info */}
        <motion.div className="sm:col-span-2 lg:col-span-2" /* ... use company.name, company.description etc. */ />

        {/* Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {sections.map((sec, i) => (
            <FooterSection
              key={i}
              title={sec.title}
              index={i + 1}
              links={sec.links.map((name, j) => ({ name, href: sectionHrefs[i][j] }))}
            />
          ))}
        </div>

        {/* Social Links */}
        <div className=" flex justify-center space-x-4 lg:space-x-6 mb-8 lg:mb-12">
          {socialData.map((s, idx) => (
            <SocialLink key={idx} href={s.href} icon={s.icon} name={socialNames[idx]} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-6 lg:pt-8 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="text-gray-400 text-sm text-center lg:text-left">
            <p>{bottom.copyright}</p>
            <p className="text-xs opacity-75">{bottom.builtWith}</p>
          </div>
          <div className="text-gray-400 text-xs text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-end mb-1">
              <span className="mr-1">{bottom.timeLabel}</span>
              {currentDateTime}
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              <span>{bottom.systemStatus}</span>
            </div>
          </div>
        </div>

        {/* Language Switcher Button */}
        <motion.button
          onClick={cycleLang}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-32 lg:bottom-36 right-6 lg:right-8 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"          aria-label="Switch language"
        >
          <img src="/language-icon.svg" alt="Language" className="w-20 h-20 lg:w-30 lg:h-30" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;