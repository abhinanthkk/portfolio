import nodemailer from 'nodemailer';

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ApiResponse {
  error?: string;
  success?: boolean;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;

function validate(body: ContactBody): string | null {
  if (!body.name || body.name.trim().length === 0) return 'Name is required.';
  if (body.name.trim().length > 100) return 'Name is too long (max 100 characters).';
  if (!body.email) return 'Email is required.';
  if (!EMAIL_REGEX.test(body.email.trim())) return 'Please provide a valid email address.';
  if (!body.subject || body.subject.trim().length === 0) return 'Subject is required.';
  if (body.subject.trim().length > 200) return 'Subject is too long (max 200 characters).';
  if (!body.message || body.message.trim().length === 0) return 'Message is required.';
  if (body.message.trim().length < MIN_MESSAGE_LENGTH) return `Message is too short (minimum ${MIN_MESSAGE_LENGTH} characters).`;
  if (body.message.trim().length > MAX_MESSAGE_LENGTH) return `Message is too long (maximum ${MAX_MESSAGE_LENGTH} characters).`;
  return null;
}

function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    const missing: string[] = [];
    if (!user) missing.push('EMAIL_USER');
    if (!pass) missing.push('EMAIL_PASS');
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

function buildOwnerEmail(body: Required<ContactBody>, timestamp: string) {
  return {
    subject: `Portfolio Contact - ${body.subject}`,
    text: [
      '----------------------------------------------------', '',
      'New Portfolio Contact', '',
      'Name:', body.name, '',
      'Email:', body.email, '',
      'Subject:', body.subject, '',
      'Message:', '',
      body.message, '',
      '----------------------------------------------------', '',
      `Timestamp: ${timestamp}`,
    ].join('\n'),
  };
}

function buildAutoReplyBody(name: string) {
  const safeName = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:24px}
.card{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)}
.header{background:linear-gradient(135deg,#1e3a5f,#1a2a4a);padding:32px;text-align:center}
.header h1{color:#fff;font-size:22px;font-weight:700}.header p{color:rgba(255,255,255,0.7);font-size:14px;margin-top:6px}
.body{padding:32px}.body p{color:#333;font-size:15px;line-height:1.7;margin-bottom:16px}
.body ul{list-style:none;padding:0;margin:16px 0}
.body ul li{padding:8px 12px;background:#f8f9fa;border-radius:8px;margin-bottom:6px;color:#555;font-size:14px;border-left:3px solid #1e3a5f}
.signature{margin-top:24px;padding-top:20px;border-top:1px solid #e0e0e0}
.signature .name{font-size:16px;font-weight:700;color:#1e3a5f}
.signature .title{font-size:13px;color:#666;margin-top:2px}
.links{margin-top:12px}
.links a{display:inline-block;padding:6px 14px;margin-right:8px;background:#f0f4ff;color:#1e3a5f;text-decoration:none;border-radius:6px;font-size:13px;font-weight:500}
.footer{padding:20px 32px;background:#f8f9fa;text-align:center;font-size:12px;color:#888}
</style></head>
<body><div class="card">
<div class="header"><h1>Abhinanth K K</h1><p>Software Developer &amp; AI Enthusiast</p></div>
<div class="body">
<p>Hi <strong>${safeName}</strong>,</p>
<p>Thank you for reaching out through my portfolio website.</p>
<p>I have received your message <strong>successfully</strong>.</p>
<p>I appreciate your interest and will review your message as soon as possible.</p>
<p>If your message is regarding:</p>
<ul><li>Internship</li><li>Full-Time Opportunity</li><li>Freelance Work</li><li>Collaboration</li><li>Technical Discussion</li></ul>
<p>I will get back to you as soon as possible.</p>
<p>Have a great day!</p>
<div class="signature">
<p class="name">Abhinanth K K</p>
<p class="title">Software Developer | AI Enthusiast</p>
<div class="links">
<a href="https://github.com/abhinanthkk" target="_blank">GitHub</a>
<a href="https://linkedin.com/in/abhinanthkk" target="_blank">LinkedIn</a>
</div></div></div>
<div class="footer">This is an automated reply. Please do not respond to this email.</div>
</div></body></html>`;

  const text = [
    `Hi ${name},`, '',
    'Thank you for reaching out through my portfolio website.', '',
    'I have received your message successfully.', '',
    'I appreciate your interest and will review your message as soon as possible.', '',
    'If your message is regarding:', '  - Internship', '  - Full-Time Opportunity', '  - Freelance Work', '  - Collaboration', '  - Technical Discussion', '',
    'I will get back to you as soon as possible.', '',
    'Have a great day!', '',
    'Best Regards,', 'Abhinanth K K', 'Software Developer | AI Enthusiast', '',
    'GitHub: https://github.com/abhinanthkk',
    'LinkedIn: https://linkedin.com/in/abhinanthkk',
  ].join('\n');

  return { html, text };
}

function sanitize(str: string): string {
  return str.replace(/[\r\n]/g, ' ').trim();
}

const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  requestLog.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  return false;
}

export default async function handler(
  req: { method: string; body: ContactBody; headers: Record<string, string> },
  res: {
    status: (code: number) => { json: (data: ApiResponse) => void };
    setHeader: (key: string, value: string) => void;
  },
) {
  const startTime = Date.now();

  const setCors = () => {
    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  };

  const jsonError = (code: number, message: string) => {
    setCors();
    res.status(code).json({ error: message });
  };

  if (req.method === 'OPTIONS') {
    setCors();
    res.status(204).json({});
    return;
  }

  if (req.method !== 'POST') {
    jsonError(405, 'Method not allowed. Use POST.');
    return;
  }

  setCors();

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'unknown';

  if (isRateLimited(ip)) {
    jsonError(429, 'Too many requests. Please try again later.');
    return;
  }

  const validationError = validate(req.body);
  if (validationError) {
    jsonError(400, validationError);
    return;
  }

  const { name, email, subject, message } = req.body as Required<ContactBody>;

  const cleanName = sanitize(name);
  const cleanSubject = sanitize(subject);
  const contactEmail = process.env.CONTACT_EMAIL || 'kkabhinanth29@gmail.com';
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  console.log(`[Contact] Request from ${email} "${cleanSubject}"`);

  try {
    if (!user || !pass) {
      const missing = [!user && 'EMAIL_USER', !pass && 'EMAIL_PASS'].filter(Boolean);
      throw new Error(`Environment variables not set: ${missing.join(', ')}`);
    }

    const transporter = createTransporter();

    console.log(`[Contact] Sending owner email to ${contactEmail}...`);
    const ownerMail = buildOwnerEmail(
      { name: cleanName, email: email.trim(), subject: cleanSubject, message: message.trim() },
      timestamp,
    );
    const ownerResult = await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: contactEmail,
      replyTo: email.trim(),
      subject: ownerMail.subject,
      text: ownerMail.text,
    });
    console.log(`[Contact] Owner email sent: ${ownerResult.messageId} (${Date.now() - startTime}ms)`);

    console.log(`[Contact] Sending auto-reply to ${email.trim()}...`);
    const autoReply = buildAutoReplyBody(cleanName);
    const autoResult = await transporter.sendMail({
      from: `"Abhinanth K K" <${user}>`,
      to: email.trim(),
      subject: 'Thank you for contacting Abhinanth K K',
      html: autoReply.html,
      text: autoReply.text,
    });
    console.log(`[Contact] Auto-reply sent: ${autoResult.messageId} (${Date.now() - startTime}ms)`);

    console.log(`[Contact] Done (${Date.now() - startTime}ms)`);
    setCors();
    res.status(200).json({ success: true });
  } catch (err: any) {
    const elapsed = Date.now() - startTime;
    console.error(`[Contact] ERROR after ${elapsed}ms`);
    console.error(`[Contact] Error name: ${err.name}`);
    console.error(`[Contact] Error message: ${err.message}`);
    console.error(`[Contact] Error code: ${err.code}`);
    if (err.command) console.error(`[Contact] SMTP command: ${err.command}`);
    if (err.response) console.error(`[Contact] SMTP response: ${err.response}`);
    if (err.responseCode) console.error(`[Contact] SMTP response code: ${err.responseCode}`);
    console.error(`[Contact] Stack: ${err.stack}`);

    // Determine if this is an SMTP auth error
    const isAuthError = err.code === 'EAUTH' || (err.responseCode && err.responseCode >= 535 && err.responseCode <= 535);
    const isConfigError = err.message?.includes('Environment variables') || err.message?.includes('Missing');

    let clientMessage = 'Unable to send message. Please try again later.';
    if (isConfigError) {
      clientMessage = 'Server configuration error. Please contact the site owner.';
    } else if (isAuthError) {
      clientMessage = 'Email service authentication failed. Please contact the site owner.';
    }

    jsonError(500, clientMessage);
  }
}
