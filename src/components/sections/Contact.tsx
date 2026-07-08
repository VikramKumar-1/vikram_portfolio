'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlowCard from '@/components/ui/GlowCard';
import MagneticButton from '@/components/ui/MagneticButton';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/VikramKumar-1',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/vikram-kumar-824037301',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:vikuraj3337@gmail.com',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const inputClasses = `
  w-full px-4 py-3 rounded-xl
  bg-white/5 border border-cyber-glass-border
  text-white placeholder-gray-500
  transition-all duration-300
  focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20
  focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]
`;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showButterfly, setShowButterfly] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || name.trim().length < 2) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid name (at least 2 characters).' });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    if (!message || message.trim().length < 10) {
      setStatusMessage({ type: 'error', text: 'Message is too short (minimum 10 characters).' });
      setIsSubmitting(false);
      return;
    }

    const data = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ID || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
      subject: `New Contact Request from ${name} - MyPortfolio`,
      from_name: 'MyPortfolio',
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMessage({ type: 'success', text: 'Message sent successfully!' });
        setShowButterfly(true);
        setTimeout(() => setShowButterfly(false), 4000);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to send message. Please check your access key.' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto">
        <AnimatedText
          text="Get In Touch"
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-center mb-12 max-w-lg mx-auto"
        >
          Need a project built or looking for a developer? Drop me a message and
          I&apos;ll get back to you as soon as possible.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
            <GlowCard glowColor="cyan">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Name field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className={inputClasses}
                  />
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    className={inputClasses}
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Status Message */}
                {statusMessage && (
                  <div className={`p-3 rounded-lg text-sm font-medium text-center ${statusMessage.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    {statusMessage.text}
                  </div>
                )}

                <div className="pt-8 relative">
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        relative w-full py-5 rounded-xl font-bold tracking-widest sm:tracking-[0.2em] uppercase 
                        transition-all duration-500 active:scale-[0.98]
                        ${isSubmitting 
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                          : 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]'
                        }
                      `}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            </GlowCard>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6 mt-12"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="
                  text-gray-500 transition-all duration-300
                  hover:text-cyber-cyan hover:scale-110
                  hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]
                "
              >
                {social.icon}
              </a>
            ))}
          </motion.div>

          {/* Bottom text */}
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 text-sm mt-8"
          >
            Or reach me directly at{' '}
            <a
              href="mailto:vikuraj3337@gmail.com"
              className="text-cyber-cyan hover:underline"
            >
              vikuraj3337@gmail.com
            </a>
          </motion.p>
        </motion.div>
      </div>

      {/* Magical Butterfly Animation on Success */}
      <AnimatePresence>
        {showButterfly && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 100, scale: 0.5, rotate: -20 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              x: [-50, 150, 300, 500], 
              y: [100, -200, -400, -800],
              scale: [0.5, 1.5, 2.5, 3],
              rotate: [-20, 20, -10, 15]
            }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="pointer-events-none fixed z-[100] text-7xl drop-shadow-[0_0_25px_rgba(0,240,255,1)]"
            style={{ left: '40%', bottom: '20%' }}
          >
            🦋
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
