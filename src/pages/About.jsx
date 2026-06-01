import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const easing = [0.45, 0.02, 0.09, 0.98];

const clients = [
  { name: 'Airbnbs', desc: 'Curated aesthetics that earn 5-star reviews', img: '/images/gallery/living-bright.png' },
  { name: 'Hotels', desc: 'Lobby to suite, designed to impress', img: '/images/gallery/hotel-lobby.png' },
  { name: 'Apartments', desc: 'Turning compact spaces into dream homes', img: '/images/gallery/entryway.png' },
  { name: 'Individual Homes', desc: 'Personal sanctuaries, beautifully realized', img: '/images/gallery/dining-bright.png' },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{ overflowX: 'hidden' }}
    >
      {/* ═══════════════════════════════════════
          HERO — Clean landing, responsive height
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="about-hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div style={{ position: 'absolute', inset: 0, y: heroY }}>
          <img
            src="/images/gallery/dining-bright.png"
            alt="Ishami Interior"
            style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </motion.div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,60,52,0.5) 0%, rgba(0,0,0,0.55) 100%)' }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="text-label"
            style={{ color: '#D4B896', marginBottom: '1.5rem' }}
          >
            Est. 2019 · Kigali, Rwanda
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="text-display"
            style={{ color: '#FFFFFF', maxWidth: '700px', margin: '0 auto' }}
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: easing }}
            className="text-body-lg"
            style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1.5rem', maxWidth: '460px', margin: '1.5rem auto 0' }}
          >
            Building beautiful spaces since 2019
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ marginTop: '3rem' }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '24px' }}>↓</motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          STORY — Two-column
      ═══════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="about-story-grid">
          <div className="about-story-image">
            <div className="sticky-image-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                style={{ width: '100%', height: '100%' }}
              >
                <img src="/images/about-studio.png" alt="Ishami Studio" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="about-story-text"
          >
            <span className="text-label" style={{ color: '#1A3C34' }}>Our Story</span>
            <h2 className="text-display-sm" style={{ color: '#1A1A1A', marginTop: '1.5rem' }}>
              Ishami Interior<br />Design & Decor
            </h2>
            <div className="text-body" style={{ color: '#555', marginTop: '2rem' }}>
              <p style={{ marginBottom: '1.25rem' }}>
                Ishami Interior Design and Decor Ltd is an Interior Design company that specializes
                in creative interior design services. The company started in 2019 and seeks to grow
                and expand the Ishami Interior as a household brand as well as build a loyal client base.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Ishami interior design provides affordable and environmentally friendly solutions to
                interior and exterior design for homes, hotels, offices, etc., for both domestic and
                international customers.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                Ishami blends clients' desires with interior and exterior design and gives clients
                the chance to enjoy a complete package.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              {[{ num: '5+', label: 'Years' }, { num: '100+', label: 'Projects' }, { num: '8', label: 'Services' }].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#1A3C34', lineHeight: 1 }}>{stat.num}</div>
                  <div className="text-label" style={{ color: '#999', marginTop: '0.4rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-pill btn-pill-dark" style={{ marginTop: '2.5rem', display: 'inline-block' }}>Work With Us</Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VISION
      ═══════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: '#1A3C34', overflow: 'hidden' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <span className="text-label" style={{ color: '#D4B896' }}>Our Vision</span>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)', lineHeight: 1.6, color: '#FFFFFF', fontStyle: 'italic', marginTop: '2rem' }}>
            "An Interior design company that specializes in creative indoor and outdoor design experiences."
          </p>
          <div style={{ marginTop: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
            — Ishami Interior Design & Decor Ltd
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          CLIENTS — STRICT HEIGHT CONSTRAINTS
          Fixed image boxes, overflow hidden
      ═══════════════════════════════════════ */}
      <section style={{ padding: '5rem 0 4rem', background: '#FAF8F5', overflow: 'hidden' }}>
        <div style={{ padding: '0 4vw', maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
            style={{ marginBottom: '2.5rem' }}
          >
            <span className="text-label" style={{ color: '#1A3C34' }}>Who We Serve</span>
            <h2 className="text-display" style={{ color: '#1A1A1A', marginTop: '0.75rem', fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
              Our Clients
            </h2>
          </motion.div>
        </div>

        {/* Horizontal Drag Slider with STRICT IMAGE HEIGHTS */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -600, right: 0 }}
          dragElastic={0.08}
          style={{ display: 'flex', gap: '1.25rem', padding: '0 4vw', cursor: 'grab', userSelect: 'none', overflow: 'hidden' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="client-card"
            >
              {/* STRICT height-constrained image container */}
              <div className="client-img-box">
                <img
                  src={client.img}
                  alt={client.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }}
                  draggable={false}
                />
              </div>
              <h3 className="text-label-lg" style={{ color: '#1A1A1A', marginTop: '1rem' }}>{client.name}</h3>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: '13px', color: '#888', marginTop: '0.3rem', fontStyle: 'italic' }}>
                {client.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Responsive Styles ─── */}
      <style>{`
        .about-hero { height: 60vh; }
        .about-story-grid { display: grid; grid-template-columns: 1fr; }
        .sticky-image-wrap { height: 50vh; overflow: hidden; }
        .about-story-text { padding: 3rem 1.5rem; }

        /* === STRICT CLIENT IMAGE CONSTRAINTS === */
        .client-card {
          min-width: clamp(220px, 26vw, 320px);
          flex-shrink: 0;
        }
        .client-img-box {
          height: 30vh;
          max-height: 280px;
          overflow: hidden;
          border-radius: 12px;
        }

        @media (min-width: 768px) {
          .about-hero { height: 80vh; }
          .sticky-image-wrap { height: 60vh; }
          .about-story-text { padding: 4rem 3rem; }
          .client-img-box {
            height: 40vh;
            max-height: 380px;
          }
        }

        @media (min-width: 1024px) {
          .about-hero { height: 100vh; }
          .about-story-grid { grid-template-columns: 55% 45% !important; }
          .sticky-image-wrap { position: sticky; top: 0; height: 100vh; }
          .about-story-text { padding: 5rem 4rem; }
          .client-img-box {
            height: 500px;
            max-height: 500px;
          }
        }
      `}</style>
    </motion.div>
  );
}
