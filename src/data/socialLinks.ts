/**
 * Hero social links — single source of truth.
 *
 * All URLs are derived from resumeData.contact so you only ever need to
 * update one place (src/data/resume.ts) and every icon picks up the change.
 *
 * To update:
 *  - GitHub / LinkedIn / WhatsApp / Email → edit the relevant field in
 *    resumeData.contact inside src/data/resume.ts
 */

import { resumeData } from '@/data/resume';

const { email, github, linkedin, whatsapp } = resumeData.contact;

const MAILTO = [
  `mailto:${email}`,
  `?subject=${encodeURIComponent('Portfolio Inquiry')}`,
  `&body=${encodeURIComponent('Hi Abhinanth,\n\nI came across your portfolio and would like to connect.')}`,
].join('');

export interface HeroSocialLink {
  id: string;
  label: string;      // aria-label + tooltip text
  title: string;      // native browser tooltip (title attribute)
  href: string;
  external: boolean;  // open in new tab?
}

export const heroSocialLinks: HeroSocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    title: 'GitHub',
    href: github,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    title: 'LinkedIn',
    href: linkedin,
    external: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    title: 'WhatsApp',
    href: whatsapp,
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    title: 'Send me an email',
    href: MAILTO,
    external: false,
  },
];
