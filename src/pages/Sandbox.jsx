import { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneSimulator from '../components/app-landing/PhoneSimulator.jsx';
import { Link } from 'react-router-dom';

export default function Sandbox() {
  const [simulatorKey, setSimulatorKey] = useState(0);

  const handleRestart = () => {
    setSimulatorKey(prev => prev + 1);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background grid for neutral canvas look */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: 'radial-gradient(circle at 25px 25px, #fff 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      <motion.div
        key={simulatorKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <PhoneSimulator />
      </motion.div>

      {/* Floating Toolbar */}
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(26, 26, 26, 0.85)',
        backdropFilter: 'blur(10px)',
        padding: '12px 24px',
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 20,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <Link to="/" style={{
          color: 'rgba(255,255,255,0.6)',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '13px',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'color 0.3s ease'
        }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
          &larr; Exit
        </Link>
        
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />

        <button onClick={handleRestart} style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          transition: 'opacity 0.3s ease'
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8} onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.67-1.36" />
          </svg>
          Restart Prototype
        </button>
      </div>
    </div>
  );
}
