import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import IshamiLogo from '../components/IshamiLogo.jsx';
import PhoneSimulator from '../components/app-landing/PhoneSimulator.jsx';

/* ═══════════════════════════════════════════════
   INLINE SVG ICON HELPERS
   ═══════════════════════════════════════════════ */
const icons = {
  grid: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  eye: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  chat: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  menu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════
   STORE BADGE COMPONENTS
   ═══════════════════════════════════════════════ */
function AppStoreBadge() {
  return (
    <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#000', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 20px', textDecoration: 'none', cursor: 'pointer', transition: 'border-color 0.3s' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1 }}>Download on the</span>
        <span style={{ fontSize: '16px', color: '#fff', fontWeight: 600, lineHeight: 1.3 }}>App Store</span>
      </div>
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#000', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 20px', textDecoration: 'none', cursor: 'pointer', transition: 'border-color 0.3s' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
    >
      <svg width="22" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3.61 1.81L13.43 12 3.61 22.19c-.36-.36-.61-.9-.61-1.69V3.5c0-.79.25-1.33.61-1.69z" fill="#4285F4" />
        <path d="M16.89 15.46L13.43 12l3.46-3.46 3.88 2.21c.7.4.7 1.1 0 1.5l-3.88 2.21z" fill="#FBBC04" />
        <path d="M3.61 1.81L13.43 12l3.46-3.46L6.13.53c-.58-.33-1.15-.33-1.56.03l-.96 1.25z" fill="#34A853" />
        <path d="M3.61 22.19L13.43 12l3.46 3.46L6.13 23.47c-.58.33-1.15.33-1.56-.03l-.96-1.25z" fill="#EA4335" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1 }}>GET IT ON</span>
        <span style={{ fontSize: '16px', color: '#fff', fontWeight: 600, lineHeight: 1.3 }}>Google Play</span>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════
   FEATURE DATA
   ═══════════════════════════════════════════════ */
const features = [
  { icon: 'grid', title: 'Browse Portfolio', desc: 'Explore hundreds of curated interior designs' },
  { icon: 'calendar', title: 'Book Consultations', desc: 'Schedule sessions with expert designers' },
  { icon: 'eye', title: 'AR Room Preview', desc: 'Visualize designs in your own space' },
  { icon: 'layers', title: 'Material Catalog', desc: 'Browse premium materials and finishes' },
  { icon: 'chart', title: 'Project Tracking', desc: 'Monitor your project progress in real-time' },
  { icon: 'chat', title: 'Direct Messaging', desc: 'Chat directly with your design team' },
];

/* ═══════════════════════════════════════════════
   FEATURE CARD
   ═══════════════════════════════════════════════ */
function FeatureCard({ icon, title, desc, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.45, 0.02, 0.09, 0.98] }}
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 20,
        padding: '36px 28px',
        transition: 'transform 0.35s cubic-bezier(0.45, 0.02, 0.09, 0.98), box-shadow 0.35s cubic-bezier(0.45, 0.02, 0.09, 0.98)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: '#1A3C34',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        {icons[icon]}
      </div>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 300, color: '#777', lineHeight: 1.7 }}>{desc}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 1 — NAVBAR
   ═══════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Try the App', href: '#demo' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 clamp(20px, 5vw, 80px)',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <div style={{ color: '#FFFFFF' }}>
          <IshamiLogo variant="static" />
        </div>

        {/* Desktop links */}
        <div className="app-landing-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#download"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff',
              background: '#1A3C34',
              padding: '10px 24px',
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#2D5A4E')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#1A3C34')}
          >
            Download App
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="app-landing-nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          {mobileOpen ? icons.close : icons.menu}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(10,10,10,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '24px',
                fontWeight: 600,
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#fff',
              background: '#1A3C34',
              padding: '14px 40px',
              borderRadius: 12,
              textDecoration: 'none',
            }}
          >
            Download App
          </a>
        </motion.div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 — HERO
   ═══════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(100px, 12vh, 140px) clamp(20px, 5vw, 80px) clamp(40px, 6vh, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background texture */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(26,60,52,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="app-landing-hero-grid" style={{ display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'center', gap: 40, maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* LEFT — Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.45, 0.02, 0.09, 0.98] }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D4B896',
              display: 'inline-block',
              marginBottom: 20,
              background: 'rgba(212,184,150,0.1)',
              padding: '6px 16px',
              borderRadius: 30,
            }}
          >
            ISHAMI INTERIOR DESIGN
          </span>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(3rem, 5.5vw, 6rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.05,
              marginBottom: 24,
              letterSpacing: '-0.03em',
            }}
          >
            Design Your{'\n'}
            <span style={{ display: 'block' }}>Dream Space.</span>
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(15px, 1.2vw, 20px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: 40,
            }}
          >
            Browse stunning interior design portfolios, book expert consultations, and visualize your dream space — all from your phone.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
        </motion.div>

        {/* RIGHT — Phone */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.45, 0.02, 0.09, 0.98] }}
          style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          {/* Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,60,52,0.25) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />
          <PhoneSimulator />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 — FEATURES
   ═══════════════════════════════════════════════ */
function FeaturesSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section
      id="features"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.45, 0.02, 0.09, 0.98] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 80px)' }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#1A3C34',
              display: 'inline-block',
              marginBottom: 16,
              background: 'rgba(26,60,52,0.08)',
              padding: '6px 16px',
              borderRadius: 30,
            }}
          >
            WHY ISHAMI APP?
          </span>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Everything You Need
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div
          className="app-landing-features-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 — INTERACTIVE DEMO
   ═══════════════════════════════════════════════ */
function DemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="demo"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,60,52,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,184,150,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.45, 0.02, 0.09, 0.98] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 60px)' }}
        >
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Try It Yourself
          </h2>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(14px, 1.1vw, 18px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Experience the app right here — click through the screens below
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.45, 0.02, 0.09, 0.98] }}
          className="app-landing-demo-phone"
          style={{ display: 'flex', justifyContent: 'center', transform: 'scale(1.15)', transformOrigin: 'center top' }}
        >
          <PhoneSimulator />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5 — DOWNLOAD CTA
   ═══════════════════════════════════════════════ */
function DownloadCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="download"
      style={{
        background: 'linear-gradient(135deg, #1A3C34 0%, #0D2620 100%)',
        padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.45, 0.02, 0.09, 0.98] }}
        >
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 32,
            }}
          >
            Ready to Transform<br />Your Space?
          </h2>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(14px, 1.1vw, 18px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 480,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}
          >
            Download the Ishami app today and start designing the space you've always dreamed of.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>

          {/* QR code placeholder */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* QR icon placeholder */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                <rect x="6" y="6" width="14" height="14" rx="2" />
                <rect x="28" y="6" width="14" height="14" rx="2" />
                <rect x="6" y="28" width="14" height="14" rx="2" />
                <rect x="10" y="10" width="6" height="6" rx="1" fill="rgba(255,255,255,0.3)" stroke="none" />
                <rect x="32" y="10" width="6" height="6" rx="1" fill="rgba(255,255,255,0.3)" stroke="none" />
                <rect x="10" y="32" width="6" height="6" rx="1" fill="rgba(255,255,255,0.3)" stroke="none" />
                <rect x="28" y="28" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.3)" stroke="none" />
                <rect x="36" y="28" width="6" height="4" rx="0.5" fill="rgba(255,255,255,0.3)" stroke="none" />
                <rect x="28" y="36" width="4" height="6" rx="0.5" fill="rgba(255,255,255,0.3)" stroke="none" />
                <rect x="36" y="38" width="6" height="4" rx="0.5" fill="rgba(255,255,255,0.3)" stroke="none" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.05em',
              }}
            >
              Scan to Download
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 6 — FOOTER
   ═══════════════════════════════════════════════ */
function AppFooter() {
  const columns = [
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Team', href: '/about' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Services', href: '#' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'Twitter / X', href: '#' },
        { label: 'LinkedIn', href: '#' },
        { label: 'Pinterest', href: '#' },
      ],
    },
  ];

  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(40px, 6vh, 80px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div
          className="app-landing-footer-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 48 }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '13px',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.45)',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#D4B896')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            © 2025 Ishami Interior Design & Decor Ltd
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            Crafted with care in Kigali, Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function AppLanding() {
  return (
    <>
      {/* Responsive styles */}
      <style>{`
        /* ── Desktop-first nav ── */
        .app-landing-nav-mobile-btn { display: none !important; }

        /* ── Hero grid ── */
        .app-landing-hero-grid { grid-template-columns: 55% 45% !important; }

        /* ── Features grid ── */
        .app-landing-features-grid { grid-template-columns: repeat(3, 1fr) !important; }

        /* ── Footer grid ── */
        .app-landing-footer-grid { grid-template-columns: repeat(4, 1fr) !important; }

        /* ── Demo phone ── */
        .app-landing-demo-phone { transform: scale(1.15) !important; transform-origin: center top !important; }

        /* ────────────────── Tablet ────────────────── */
        @media (max-width: 1024px) {
          .app-landing-features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .app-landing-footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .app-landing-demo-phone { transform: scale(1.05) !important; }
        }

        /* ────────────────── Mobile ────────────────── */
        @media (max-width: 768px) {
          .app-landing-nav-desktop { display: none !important; }
          .app-landing-nav-mobile-btn { display: flex !important; }

          .app-landing-hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .app-landing-hero-grid > div:first-child { order: 1; }
          .app-landing-hero-grid > div:last-child  { order: 2; }

          .app-landing-features-grid { grid-template-columns: 1fr !important; }
          .app-landing-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .app-landing-demo-phone { transform: scale(1) !important; }
        }

        @media (max-width: 480px) {
          .app-landing-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ overflowX: 'hidden', background: '#0A0A0A' }}>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <DownloadCTA />
        <AppFooter />
      </div>
    </>
  );
}
