import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PhoneMockup = () => (
  <div
    style={{
      width: 260,
      height: 530,
      background: '#F5F5F5',
      borderRadius: 36,
      border: '6px solid #1A1A1A',
      boxShadow: 'inset 0 0 0 2px #444, 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(212,184,150,0.15)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transform: 'rotate(-5deg) scale(1.05)'
    }}
  >
    {/* Dynamic Island */}
    <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 70, height: 18, borderRadius: 20, background: '#000000', zIndex: 10 }} />
    
    {/* Mockup screen content (simplified UI for promo visual) */}
    <div style={{ flex: 1, background: '#F5F5F5', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 200, background: 'linear-gradient(135deg, #1A3C34, #0D2620)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'radial-gradient(circle at 50% 50%, #D4B896 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      </div>
      <div style={{ padding: 20, flex: 1, background: '#FFFFFF', borderRadius: '24px 24px 0 0', marginTop: -24, position: 'relative' }}>
        <div style={{ width: '70%', height: 16, background: '#E8E8E8', borderRadius: 8, marginBottom: 12 }} />
        <div style={{ width: '40%', height: 10, background: '#F0F0F0', borderRadius: 6, marginBottom: 24 }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
           <div style={{ height: 80, background: '#F5F5F5', borderRadius: 12 }} />
           <div style={{ height: 80, background: '#F5F5F5', borderRadius: 12 }} />
        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
           <div style={{ width: '100%', height: 40, background: '#1A3C34', borderRadius: 12 }} />
        </div>
      </div>
    </div>
  </div>
);

export default function AppPromoSection() {
  return (
    <section className="relative overflow-hidden bg-[#0D2620] py-24 lg:py-32">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4B896] opacity-5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1A3C34] opacity-40 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Typography & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: 'clamp(2.5rem, 4vw, 4rem)', 
              fontWeight: 500, 
              color: '#FFFFFF', 
              lineHeight: 1.1, 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.02em' 
            }}>
              Experience our spaces,<br />
              <span style={{ color: '#D4B896', fontStyle: 'italic', fontWeight: 300 }}>in your hands.</span>
            </h2>
            
            <p className="text-body-lg" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', marginBottom: '3rem', fontSize: '16px' }}>
              Test our interactive mobile prototype and explore curated designs exactly as they were meant to be felt.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '500px' }}>
              <Link to="/app" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ x: 5 }}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    color: '#D4B896', 
                    textTransform: 'uppercase', 
                    fontSize: '12px', 
                    fontWeight: 600, 
                    letterSpacing: '0.1em', 
                    borderBottom: '1px solid rgba(212,184,150,0.4)', 
                    paddingBottom: '6px',
                    transition: 'border-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#D4B896'}
                  onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'rgba(212,184,150,0.4)'}
                >
                  Launch Prototype
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Floating Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
