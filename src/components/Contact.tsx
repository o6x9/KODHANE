import React, { useState } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Show success message or handle form submission
    alert('Thank you for your message! We will get back to you soon.');
  };

  // Istanbul coordinates
  const istanbulCoords = {
    lat: 41.0082,
    lng: 28.9784
  };

  return (
    <>
      {/* Background Elements */}
      <ParallaxLayer offset={5} speed={0.1} className="flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-grey from-0% via-transparent via-50% to-transparent to-100% opacity-5"></div>
          <div className="absolute top-1/4 right-10 w-32 h-32 border border-grey opacity-10 rotate-45 animate-float"></div>
          <div className="absolute bottom-1/3 left-10 w-24 h-24 border border-black opacity-5 -rotate-12 animate-float-slow"></div>
        </div>
      </ParallaxLayer>

      {/* Main Content */}
      <ParallaxLayer offset={5} speed={0.5} className="flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Get In <span className="text-grey">Touch</span>
            </h2>
            <p className="text-lg text-grey max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how we can help bring your vision to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 border border-grey border-opacity-20 hover:border-opacity-30 transition-all duration-300 rounded-lg shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-black mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-grey border-opacity-20 focus:border-opacity-50 focus:outline-none transition-all duration-300 bg-white text-black rounded-md hover:border-opacity-30"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-grey border-opacity-20 focus:border-opacity-50 focus:outline-none transition-all duration-300 bg-white text-black rounded-md hover:border-opacity-30"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-grey border-opacity-20 focus:border-opacity-50 focus:outline-none transition-all duration-300 bg-white text-black rounded-md hover:border-opacity-30"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-grey border-opacity-20 focus:border-opacity-50 focus:outline-none transition-all duration-300 bg-white text-black resize-none rounded-md hover:border-opacity-30"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-4 px-8 font-medium hover:bg-grey transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 rounded-md"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 border border-grey border-opacity-20 hover:border-opacity-30 transition-all duration-300 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-black mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Address</h4>
                      <p className="text-grey">Levent Business District<br />Istanbul, Turkey 34330</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Phone</h4>
                      <p className="text-grey">+90 (212) 555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Email</h4>
                      <p className="text-grey">hello@innovationco.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white p-6 border border-grey border-opacity-20 hover:border-opacity-30 transition-all duration-300 rounded-lg shadow-sm">
                <h4 className="font-medium text-black mb-4">Office Hours (UTC+3)</h4>
                <div className="space-y-2 text-grey">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              {/* Interactive Map - Istanbul */}
              <div className="bg-white border border-grey border-opacity-20 hover:border-opacity-30 transition-all duration-300 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-grey border-opacity-20">
                  <h4 className="font-medium text-black flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Our Location in Istanbul
                  </h4>
                </div>
                <div className="h-64 relative">
                  {/* Embedded Google Maps for Istanbul */}
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.4056168749555!2d28.976063715405994!3d41.00824397929847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9be92011c27%3A0x236e6383c4d0a37e!2sLevent%2C%20Istanbul%2C%20Turkey!5e0!3m2!1sen!2str!4v1625000000000!5m2!1sen!2str`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Istanbul Office Location"
                    className="w-full h-full"
                  />
                  
                  {/* Fallback if iframe doesn't load */}
                  <div className="absolute inset-0 bg-grey bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="text-grey text-center">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <p className="text-sm">Istanbul, Turkey</p>
                      <p className="text-xs">Levent Business District</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxLayer>
    </>
  );
};

export default Contact;