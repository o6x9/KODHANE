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

  // Social links data
  const socialData = [
    { href: 'https://linkedin.com/company/innovation-co', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 ..."/></svg> },
    { href: 'https://twitter.com/innovation_co', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 ..."/></svg> },
    { href: 'https://github.com/innovation-co', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0 ..."/></svg> },
    { href: 'https://instagram.com/innovation.co', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163 ..."/></svg> }
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
        <div className="flex justify-center space-x-4 lg:space-x-6 mb-8 lg:mb-12">
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
