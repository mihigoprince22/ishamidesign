import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const easing = [0.45, 0.02, 0.09, 0.98];

const galleryItems = [
  // Gallery images (new separated assets)
  { src: '/images/gallery/kitchen-dark.png', caption: 'Modern Kitchen', category: 'Interiors' },
  { src: '/images/gallery/dining-bright.png', caption: 'Open-Plan Dining', category: 'Interiors' },
  { src: '/images/gallery/basket-wall.png', caption: 'Rwandan Wall Art', category: 'Decor' },
  { src: '/images/gallery/green-restaurant.png', caption: 'Restaurant Interior', category: 'Commercial' },
  { src: '/images/gallery/sofas-lounge.png', caption: 'Lounge Furniture', category: 'Furniture' },
  { src: '/images/gallery/entryway.png', caption: 'Modern Entryway', category: 'Interiors' },
  { src: '/images/gallery/hotel-lobby.png', caption: 'Hotel Lobby', category: 'Commercial' },
  { src: '/images/gallery/living-bright.png', caption: 'Living Room', category: 'Interiors' },
  // Existing portfolio images
  { src: '/images/bento-interior.png', caption: 'Interior Concept', category: 'Interiors' },
  { src: '/images/bento-furniture.png', caption: 'Bespoke Furniture', category: 'Furniture' },
  { src: '/images/bento-exterior.png', caption: 'Exterior Design', category: 'Exteriors' },
  { src: '/images/bento-office.png', caption: 'Office Space', category: 'Commercial' },
  { src: '/images/interior/interior-1.png', caption: 'Residential Interior', category: 'Interiors' },
  { src: '/images/interior/interior-2.png', caption: 'Living Space', category: 'Interiors' },
  { src: '/images/furniture/furniture-1.png', caption: 'Custom Seating', category: 'Furniture' },
  { src: '/images/furniture/furniture-2.png', caption: 'Wooden Craftsmanship', category: 'Furniture' },
  { src: '/images/exterior/exterior-1.png', caption: 'Facade Design', category: 'Exteriors' },
  { src: '/images/exterior/exterior-2.png', caption: 'Outdoor Living', category: 'Exteriors' },
  { src: '/images/office/office-1.png', caption: 'Workspace Design', category: 'Commercial' },
  { src: '/images/office/office-2.png', caption: 'Meeting Room', category: 'Commercial' },
];

const filters = ['All', 'Interiors', 'Furniture', 'Commercial', 'Exteriors', 'Decor'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{ overflowX: 'hidden' }}
    >
      {/* ═══ HERO ═══ */}
      <section
        className="portfolio-hero"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFFFFF',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center' }}
        >
          <span className="text-label" style={{ color: '#1A3C34' }}>Portfolio</span>
          <h1 className="text-display" style={{ color: '#1A1A1A', marginTop: '1rem' }}>
            Our Work
          </h1>
          <p className="text-body-lg" style={{ color: '#777', marginTop: '1rem', maxWidth: '450px', margin: '1rem auto 0' }}>
            A showcase of our interior and exterior design projects
          </p>
        </motion.div>
      </section>

      {/* ═══ FILTER TABS ═══ */}
      <section style={{ background: '#FFFFFF', padding: '0 4vw' }}>
        <div
          className="filter-tabs"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            gap: '0.25rem',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            paddingBottom: '0',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '1rem 1.5rem',
                background: 'none',
                border: 'none',
                borderBottom: activeFilter === filter ? '2px solid #1A3C34' : '2px solid transparent',
                color: activeFilter === filter ? '#1A3C34' : '#999',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ MASONRY GALLERY ═══ */}
      <section style={{ padding: '3rem 4vw 6rem', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            columnCount: 3,
            columnGap: '1.25rem',
          }}
          className="masonry-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: easing }}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '1.25rem',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div className="img-hover-container" style={{ position: 'relative' }}>
                  <img
                    src={item.src}
                    alt={item.caption}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="gallery-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(26,60,52,0.85) 0%, rgba(26,60,52,0.2) 40%, transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 0.5s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#D4B896',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {item.category}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '5rem 2rem', background: '#1A3C34', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easing }}
        >
          <h2 className="text-display-sm" style={{ color: '#FFFFFF' }}>
            Like what you see?
          </h2>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '1rem' }}>
            Let's create something extraordinary together.
          </p>
          <Link to="/contact" className="btn-pill btn-pill-light" style={{ marginTop: '2rem', display: 'inline-block' }}>
            Start Your Project
          </Link>
        </motion.div>
      </section>

      {/* Responsive + hover styles */}
      <style>{`
        .portfolio-hero {
          min-height: 45vh;
          padding: 7rem 1.5rem 3rem;
        }
        .filter-tabs {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          flex-wrap: nowrap;
        }
        .filter-tabs::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) {
          .portfolio-hero {
            min-height: 55vh;
            padding: 8rem 2rem 4rem;
          }
          .filter-tabs { flex-wrap: wrap; overflow-x: visible; }
        }
        @media (min-width: 1024px) {
          .portfolio-hero { min-height: 60vh; }
        }
        @media (max-width: 1024px) {
          .masonry-grid { column-count: 2 !important; }
        }
        @media (max-width: 640px) {
          .masonry-grid { column-count: 1 !important; }
        }
        .img-hover-container:hover .gallery-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </motion.div>
  );
}
