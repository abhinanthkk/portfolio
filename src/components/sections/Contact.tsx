import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { resumeData } from '@/data/resume';
const API_ENDPOINT = '/api/contact';

const contactDetails = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: resumeData.contact.email,
    href: `mailto:${resumeData.contact.email}`,
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: resumeData.contact.phone,
    href: `tel:${resumeData.contact.phone}`,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: resumeData.contact.location,
    href: undefined,
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formState.name.trim() ||
      !formState.email.trim() ||
      !formState.subject.trim() ||
      !formState.message.trim()
    ) {
      setErrorMessage('Please fill in all fields.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      subject: formState.subject.trim(),
      message: formState.message.trim(),
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Server responded with status ${response.status}`);
      }

      setStatus('sent');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setErrorMessage(
        err instanceof Error && err.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : err instanceof Error && err.message
            ? err.message
            : 'Unable to send message.',
      );
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4"
        >
          Get in Touch
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          Let&apos;s{' '}
          <span className="gradient-text">Connect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading mx-auto"
        >
          Have a question or want to work together? I&apos;d love to hear from you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass p-8 h-full">
            <h3 className="text-xl font-semibold text-white mb-6">
              Contact Information
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Feel free to reach out! I&apos;m always open to discussing new projects,
              creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4 mb-8">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                    <span className="text-primary">{detail.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-sm text-gray-300 hover:text-primary transition-colors"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-300">{detail.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Social Profiles
              </p>
              <div className="flex gap-3">
                <a
                  href={resumeData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass glass-hover text-gray-400 hover:text-white transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={resumeData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass glass-hover text-gray-400 hover:text-white transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${resumeData.contact.email}`}
                  className="p-3 rounded-xl glass glass-hover text-gray-400 hover:text-white transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="glass p-8" noValidate>
            <h3 className="text-xl font-semibold text-white mb-6">
              Send a Message
            </h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs text-gray-500 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm outline-none focus:border-primary/30 focus:bg-white/[0.05] transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs text-gray-500 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm outline-none focus:border-primary/30 focus:bg-white/[0.05] transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs text-gray-500 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  required
                  placeholder="Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm outline-none focus:border-primary/30 focus:bg-white/[0.05] transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-gray-500 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm outline-none focus:border-primary/30 focus:bg-white/[0.05] transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === 'sent' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* Success toast */}
              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Message sent successfully!
                </motion.div>
              )}

              {/* Error toast */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    {errorMessage || 'Unable to send message.'}
                  </span>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
