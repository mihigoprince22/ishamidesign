import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const easing = [0.45, 0.02, 0.09, 0.98];

const services = [
  { name: 'Wall Designs', desc: 'Statement walls that define a room', icon: '◩' },
  { name: 'Sofa Chairs', desc: 'Bespoke seating, tailored to you', icon: '◫' },
  { name: 'Kitchen Cabinets', desc: 'Custom cabinetry, built to last', icon: '⊞' },
  { name: 'Counters', desc: 'Premium countertops, every material', icon: '▬' },
  { name: 'Wardrobes', desc: 'Walk-in dreams, perfectly organized', icon: '⊟' },
  { name: 'Wooden Floors', desc: 'Natural hardwood, expertly installed', icon: '▤' },
  { name: 'Shop Setups', desc: 'Retail spaces designed to sell', icon: '⊡' },
  { name: 'Balcony Sets', desc: 'Outdoor living, elevated', icon: '◧' },
];

const portfolioPreview = [
  { src: '/images/gallery/kitchen-dark.png', label: 'Kitchen Design' },
  { src: '/images/gallery/basket-wall.png', label: 'Wall Art & Decor' },
  { src: '/images/gallery/green-restaurant.png', label: 'Restaurant Interior' },
  { src: '/images/gallery/sofas-lounge.png', label: 'Lounge Furniture' },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{ overflowX: 'hidden' }}
    >
      {/* ═══════════════════════════════════════
          HERO — Full bleed with parallax scale
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div style={{ position: 'absolute', inset: '-5%', scale: heroScale }}>
          <img
            src="/images/gallery/living-bright.png"
            alt="Ishami Interior Design"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(26,60,52,0.5) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easing }}
            className="text-label"
            style={{ color: '#D4B896', marginBottom: '2rem' }}
          >
            Since 2019 · Kigali, Rwanda
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="text-display"
            style={{ color: '#FFFFFF', maxWidth: '800px', margin: '0 auto' }}
          >
            Creative Indoor & Outdoor Design
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: easing }}
            className="text-body-lg"
            style={{
              color: 'rgba(255,255,255,0.75)',
              marginTop: '1.5rem',
              maxWidth: '520px',
              margin: '1.5rem auto 0',
            }}
          >
            Affordable, environmentally friendly solutions for homes, hotels, offices & beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: easing }}
            style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/portfolio" className="btn-pill btn-pill-light">View Our Work</Link>
            <Link to="/contact" className="btn-pill btn-pill-light">Get in Touch</Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
            style={{ marginTop: '4rem' }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ color: '#FFFFFF', fontSize: '22px' }}
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES — BIA Horizontal Scroll
          Oversized header + drag slider cards
      ═══════════════════════════════════════ */}
      <section style={{ padding: '7rem 0 5rem', background: '#FAF8F5', overflow: 'hidden' }}>
        <div style={{ padding: '0 4vw', maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easing }}
          >
            <span className="text-label" style={{ color: '#1A3C34' }}>What We Do</span>
            <h2
              className="text-display"
              style={{
                color: '#1A1A1A',
                marginTop: '1rem',
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                lineHeight: 0.95,
              }}
            >
              Our Services
            </h2>
            <p className="text-body" style={{ color: '#777', marginTop: '1.5rem', maxWidth: '480px' }}>
              From wall art to wooden floors — we craft every element of your space with
              environmentally friendly materials and meticulous care.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Drag Slider */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -1200, right: 0 }}
          dragElastic={0.06}
          style={{
            display: 'flex',
            gap: '1px',
            marginTop: '3.5rem',
            cursor: 'grab',
            userSelect: 'none',
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.19, 1, 0.22, 1] }}
              style={{
                minWidth: 'clamp(240px, 22vw, 300px)',
                flexShrink: 0,
                padding: '2.5rem 2rem',
                background: '#FFFFFF',
                borderBottom: '3px solid #1A3C34',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                cursor: 'default',
              }}
              whileHover={{
                backgroundColor: '#1A3C34',
                color: '#FFFFFF',
                transition: { duration: 0.4, ease: easing },
              }}
              className="service-card"
            >
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: '1.5rem',
                  opacity: 0.4,
                  lineHeight: 1,
                }}
              >
                {s.icon}
              </div>
              <h3
                className="text-label-lg"
                style={{ marginBottom: '0.5rem' }}
              >
                {s.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontSize: '13px',
                  opacity: 0.6,
                  lineHeight: 1.5,
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 5 years experience badge */}
        <div style={{ padding: '3rem 4vw 0', maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 'clamp(3rem, 5vw, 5rem)', color: '#1A3C34', lineHeight: 1 }}>
              5+
            </span>
            <span style={{ fontWeight: 300, fontSize: '14px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Years of crafting beautiful spaces
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PORTFOLIO PREVIEW — Asymmetric Grid
      ═══════════════════════════════════════ */}
      <section style={{ padding: '7rem 4vw', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="text-label" style={{ color: '#1A3C34' }}>Portfolio</span>
              <h2 className="text-display-sm" style={{ color: '#1A1A1A', marginTop: '0.75rem' }}>
                Selected Projects
              </h2>
            </div>
            <Link to="/portfolio" className="btn-pill btn-pill-dark">
              View All Projects
            </Link>
          </motion.div>

          {/* Asymmetric 2-column grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
            }}
            className="portfolio-preview-grid"
          >
            {portfolioPreview.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: i % 2 === 1 ? 0.15 : 0, ease: [0.19, 1, 0.22, 1] }}
                style={{ paddingTop: i % 2 === 1 ? '3rem' : '0' }}
              >
                <Link to="/portfolio" style={{ display: 'block' }}>
                  <div
                    className="img-hover-container"
                    style={{ aspectRatio: i === 0 || i === 3 ? '4/5' : '3/4', position: 'relative' }}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Hover overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(26,60,52,0.7) 0%, transparent 50%)',
                        opacity: 0,
                        transition: 'opacity 0.5s ease',
                      }}
                      className="portfolio-overlay"
                    />
                  </div>
                  <div className="text-label-lg" style={{ color: '#1A1A1A', marginTop: '1rem' }}>
                    {item.label}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VISION SECTION — Forest Green
      ═══════════════════════════════════════ */}
      <section
        style={{
          padding: '7rem 2rem',
          background: '#1A3C34',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <span className="text-label" style={{ color: '#D4B896' }}>Our Vision</span>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
              lineHeight: 1.6,
              color: '#FFFFFF',
              fontStyle: 'italic',
              marginTop: '2rem',
            }}
          >
            "An Interior design company that specializes in creative indoor and outdoor design
            experiences."
          </p>
          <div
            style={{
              marginTop: '2rem',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            — Ishami Interior Design & Decor Ltd
          </div>
          <Link
            to="/contact"
            className="btn-pill btn-pill-light"
            style={{ marginTop: '2.5rem', display: 'inline-block' }}
          >
            Start Your Project
          </Link>
        </motion.div>
      </section>

      {/* Responsive + hover styles */}
      <style>{`
        @media (max-width: 768px) {
          .portfolio-preview-grid {
            grid-template-columns: 1fr !important;
          }
          .portfolio-preview-grid > div { padding-top: 0 !important; }
        }
        .img-hover-container:hover .portfolio-overlay {
          opacity: 1 !important;
        }
        .service-card:hover * {
          color: inherit !important;
        }
      `}</style>
    </motion.div>
  );
}
