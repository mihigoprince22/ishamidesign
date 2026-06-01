import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import IshamiLogo from './IshamiLogo.jsx';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
];

const overlayVariants = {
  hidden: { clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' },
  visible: {
    clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)',
    transition: { duration: 0.8, ease: [0.45, 0.02, 0.09, 0.98] },
  },
  exit: {
    clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)',
    transition: { duration: 0.6, ease: [0.45, 0.02, 0.09, 0.98] },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.35 + i * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Fixed Header Bar ─── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* SVG Logo — scroll-reactive, mix-blend-difference */}
        <div style={{ pointerEvents: 'auto' }}>
          <IshamiLogo />
        </div>

        {/* Menu Button — top-right */}
        <motion.button
          onClick={() => setMenuOpen(true)}
          className="menu-btn"
          style={{
            pointerEvents: 'auto',
            borderRadius: '50%',
            backgroundColor: '#1A3C34',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '10px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.45, 0.02, 0.09, 0.98] }}
          aria-label="Open menu"
        >
          Menu
        </motion.button>
      </header>

      {/* ─── Full-Screen Menu Overlay ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: '#1A3C34',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'auto',
            }}
          >
            {/* SVG Logo inside overlay — static variant, white */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.5rem',
                color: '#FFFFFF',
              }}
            >
              <IshamiLogo variant="static" onClick={() => setMenuOpen(false)} />
            </motion.div>

            {/* Close Button */}
            <motion.button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.5rem',
                background: 'none',
                color: '#FFFFFF',
                fontSize: '22px',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              whileHover={{ rotate: 90, borderColor: '#D4B896' }}
              transition={{ duration: 0.35, ease: [0.45, 0.02, 0.09, 0.98] }}
              aria-label="Close menu"
            >
              ✕
            </motion.button>

            {/* Nav Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    to={link.to}
                    style={{
                      color: location.pathname === link.to ? '#D4B896' : '#FFFFFF',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.3,
                      textDecoration: 'none',
                      padding: '0.25rem 0',
                      display: 'block',
                      transition: 'color 0.35s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4B896')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = location.pathname === link.to ? '#D4B896' : '#FFFFFF')
                    }
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8 } }}
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.05em',
              }}
            >
              ishamiinteriordesign@gmail.com &nbsp;·&nbsp; +250 788 310 401
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .menu-btn { width: 48px; height: 48px; }
        @media (min-width: 768px) {
          .menu-btn { width: 56px; height: 56px; }
        }
      `}</style>
    </>
  );
}
