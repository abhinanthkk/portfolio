import { motion } from 'framer-motion';
import { Download, FileText, Eye } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function Resume() {
  return (
    <SectionWrapper id="resume">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4"
        >
          Resume
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          My{' '}
          <span className="gradient-text">Resume</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading mx-auto"
        >
          View or download my detailed resume for a complete overview of my qualifications
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-6 md:p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white">Resume PDF</h3>
              <p className="text-sm text-gray-500">Updated July 2026</p>
            </div>
          </div>

          {/* PDF Preview */}
          <div className="mb-6 rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.01]">
            <iframe
              src="/abhinanthCV.pdf#toolbar=0&navpanes=0"
              className="w-full h-[500px] md:h-[700px]"
              title="Resume Preview"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/abhinanthCV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <a
              href="/abhinanthCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover text-white font-medium transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              Open in New Tab
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
