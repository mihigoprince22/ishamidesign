import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const easing = [0.45, 0.02, 0.09, 0.98];

const contactDetails = [
  { label: 'Phone', value: '+250 788 310 401', sub: '0788 385 577', href: 'tel:+250788310401', icon: '📞' },
  { label: 'Email', value: 'ishamiinteriordesign@gmail.com', sub: 'ntagozeraesther@gmail.com', href: 'mailto:ishamiinteriordesign@gmail.com', icon: '✉' },
  { label: 'Location', value: 'Kibagabaga, Gasabo', sub: 'Kigali, Rwanda', href: null, icon: '📍' },
  { label: 'WhatsApp', value: '+250 788 310 401', sub: 'Available Mon – Sat', href: 'https://wa.me/250788310401', icon: '💬' },
  { label: 'Hours', value: 'Mon — Sat', sub: '8:00 AM — 6:00 PM', href: null, icon: '🕐' },
];

const projectTypes = ['Residential', 'Commercial', 'Hotel / Airbnb', 'Office', 'Other'];

/* ─── Magnetic Hover Link ─── */
function MagneticLink({ children, href, target, style }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.div;
  const props = href ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined } : {};

  return (
    <Tag
      {...props}
      style={{ ...style, x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {children}
    </Tag>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: '', message: '' });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  /* Scroll parallax for the contact block */
  const contactBlockRef = useRef(null);
  const { scrollYProgress: contactScroll } = useScroll({
    target: contactBlockRef,
    offset: ['start end', 'end start'],
  });
  const contactY = useTransform(contactScroll, [0, 1], [60, -60]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{ overflowX: 'hidden' }}
    >
      {/* ═══════════════════════════════════════
          HERO — Massive BIA Typography
      ═══════════════════════════════════════ */}
      <section className="contact-hero">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4vw' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easing }}
            className="text-label"
            style={{ color: '#1A3C34', display: 'block', marginBottom: '1.5rem' }}
          >
            Get in Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              maxWidth: '900px',
            }}
          >
            Let's<br />Talk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: easing }}
            className="text-body-lg"
            style={{ color: '#777', marginTop: '2rem', maxWidth: '420px' }}
          >
            Ready to transform your space? Tell us about your project and let's create something extraordinary.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          MAIN — Two-column: Contact + Form
          Contact block has scroll parallax
      ═══════════════════════════════════════ */}
      <section ref={contactBlockRef} style={{ background: '#FFFFFF', padding: '0 4vw 6rem' }}>
        <div className="contact-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* ─── LEFT: Contact Details with parallax + magnetic + floating ─── */}
          <motion.div
            style={{ y: contactY }}
            className="contact-details"
          >
            {contactDetails.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  paddingBottom: '1.5rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {/* Floating icon */}
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
                    style={{ fontSize: '16px', display: 'inline-block' }}
                  >
                    {item.icon}
                  </motion.span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#1A3C34',
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Magnetic hover on clickable links */}
                {item.href ? (
                  <MagneticLink
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(14px, 1.1vw, 18px)',
                      color: '#1A1A1A',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {item.value}
                  </MagneticLink>
                ) : (
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 'clamp(14px, 1.1vw, 18px)', color: '#1A1A1A' }}>
                    {item.value}
                  </div>
                )}
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: '13px', color: '#999', marginTop: '0.2rem' }}>
                  {item.sub}
                </div>
              </motion.div>
            ))}

            {/* Floating WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: easing }}
            >
              <MagneticLink
                href="https://wa.me/250788310401"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="btn-pill btn-pill-filled"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </motion.div>
              </MagneticLink>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Minimalist Form ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="contact-form-wrapper"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                style={{ textAlign: 'center', padding: '4rem 2rem' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  style={{ fontSize: '3rem', marginBottom: '1.5rem' }}
                >
                  ✓
                </motion.div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#1A3C34', marginBottom: '1rem' }}>
                  Message Sent
                </h3>
                <p className="text-body" style={{ color: '#777' }}>Thank you! We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', type: '', message: '' }); }}
                  className="btn-pill btn-pill-dark"
                  style={{ marginTop: '2rem' }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A3C34' }}>
                    Start a project
                  </span>
                </div>

                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Full Name', required: true },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'email@example.com', required: true },
                  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+250 ...', required: false },
                ].map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: easing }}
                    style={{ marginBottom: '2rem' }}
                  >
                    <label htmlFor={field.name} className="contact-label">{field.label}</label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="contact-input"
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.24, ease: easing }}
                  style={{ marginBottom: '2rem' }}
                >
                  <label htmlFor="type" className="contact-label">Project Type</label>
                  <select id="type" name="type" value={formData.type} onChange={handleChange} className="contact-input" style={{ cursor: 'pointer' }}>
                    <option value="">Select a type...</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.32, ease: easing }}
                  style={{ marginBottom: '2.5rem' }}
                >
                  <label htmlFor="message" className="contact-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, budget, timeline..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-input"
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="btn-pill btn-pill-filled"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, ease: easing }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%', padding: '1.1em 2em' }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STUDIO SECTION
      ═══════════════════════════════════════ */}
      <section style={{ padding: '5rem 4vw', background: '#F5F0EB' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
          >
            <span className="text-label" style={{ color: '#1A3C34' }}>Visit Our Studio</span>
            <h2 className="text-display-sm" style={{ color: '#1A1A1A', marginTop: '0.75rem' }}>Kibagabaga, Gasabo</h2>
            <p className="text-body" style={{ color: '#777', marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0' }}>
              Located in the heart of Kigali, our studio is where ideas become reality. Stop by for a consultation — we'd love to meet you.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              <MagneticLink href="tel:+250788310401" style={{ textDecoration: 'none' }}>
                <div className="btn-pill btn-pill-dark">Call Us</div>
              </MagneticLink>
              <MagneticLink href="https://wa.me/250788310401" target="_blank" style={{ textDecoration: 'none' }}>
                <div className="btn-pill btn-pill-dark">WhatsApp</div>
              </MagneticLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Styles ─── */}
      <style>{`
        .contact-hero {
          min-height: 55vh;
          display: flex;
          align-items: flex-end;
          padding-bottom: 4rem;
          padding-top: 8rem;
          background: #FFFFFF;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        .contact-details { padding-top: 2rem; }
        .contact-form-wrapper {
          background: #FAF8F5;
          padding: 2.5rem 2rem;
          border-radius: 16px;
        }
        .contact-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #999;
          display: block;
          margin-bottom: 0.5rem;
        }
        .contact-input {
          width: 100%;
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-size: 16px;
          color: #1A1A1A;
          padding: 0.85rem 0;
          border: none;
          border-bottom: 1.5px solid rgba(0,0,0,0.15);
          background: transparent;
          outline: none;
          transition: border-color 0.35s ease;
          -webkit-appearance: none;
          border-radius: 0;
        }
        .contact-input:focus {
          border-bottom-color: #1A3C34;
        }
        .contact-input::placeholder {
          color: #bbb;
          font-weight: 300;
        }

        @media (min-width: 768px) {
          .contact-hero { min-height: 60vh; padding-bottom: 5rem; }
          .contact-form-wrapper { padding: 3rem; }
        }
        @media (min-width: 1024px) {
          .contact-hero { min-height: 70vh; padding-bottom: 5rem; }
          .contact-grid { grid-template-columns: 45% 55%; gap: 4rem; }
          .contact-details { padding-top: 0; }
          .contact-form-wrapper { padding: 3.5rem; }
        }
      `}</style>
    </motion.div>
  );
}
