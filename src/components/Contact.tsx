import React, { useState, useRef, ChangeEvent, FormEvent, FC } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: FC = () => {
  const { t } = useTranslation('contact');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const header = t('header', { returnObjects: true }) as { title: string; subtitle: string };
  const formMeta = t('form', { returnObjects: true }) as Record<string, string>;
  const sidebar = t('sidebar', { returnObjects: true }) as any;
  const contactInfo = sidebar.contactInfo as Array<{ title: string; content: string }>;
  const officeHours = sidebar.officeHours as Array<{ day: string; hours: string }>;

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(t('form.submittingResponse', { defaultValue: 'Thank you for your message! We will get back to you soon.' }));
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            {header.title.split(' ').map((w, i) => (
              <span key={i} className={i === 1 ? 'text-slate-600' : ''}>{w}{i < header.title.split(' ').length - 1 && ' '}</span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            {header.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
                {formMeta.title}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {['name','email'].map((field, idx) => (
                    <div key={idx}>
                      <label htmlFor={field} className="block text-sm font-medium text-slate-700 mb-2">
                        {formMeta[`${field}Label`]}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        id={field}
                        name={field}
                        value={(formData as any)[field]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
                        placeholder={formMeta[`${field}Placeholder`]}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    {formMeta.subjectLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
                    placeholder={formMeta.subjectPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    {formMeta.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900 resize-none"
                    placeholder={formMeta.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? formMeta.submitting : formMeta.submit}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">{sidebar.contactInfoTitle}</h3>
              <div className="space-y-4">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                      {/* You can replace with icons if desired */}
                      <span className="text-white font-medium">{item.title.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{sidebar.officeHoursTitle}</h3>
              <p className="text-sm text-slate-500 mb-4">{sidebar.timezone}</p>
              <div className="space-y-3">
                {officeHours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">{item.day}</span>
                    <span className="text-slate-900 text-sm font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{sidebar.locationTitle}</h3>
              <p className="text-slate-600 text-sm mb-4">{sidebar.locationDescription}</p>
              <a
                href="https://maps.google.com/?q=Levent,Istanbul,Turkey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-slate-900 hover:text-slate-700 font-medium text-sm transition-colors duration-200"
              >
                {sidebar.viewOnMap}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
