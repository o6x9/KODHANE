// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <select
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
      className="w-full h-full text-sm bg-transparent border-none focus:outline-none cursor-pointer"
    >
      <option value="en">EN</option>
      <option value="ar">AR</option>
      <option value="tr">TR</option>
    </select>
  );
};
export default LanguageSwitcher;
