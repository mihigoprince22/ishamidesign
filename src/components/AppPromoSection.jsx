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
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Experience Our Spaces, <br className="hidden md:block" />
              <span className="text-[#D4B896]">In Your Hands.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-[500px] mb-12 font-light leading-relaxed">
              Step into the future of Ishami's digital experience. Test our interactive mobile prototype and explore curated designs exactly as they were meant to be felt.
            </p>
            
            <Link to="/app">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,184,150,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#D4B896] text-[#0D2620] px-8 py-4 rounded-full font-semibold text-sm md:text-base tracking-wide uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,184,150,0.2)]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Launch Interactive Prototype
              </motion.button>
            </Link>
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
