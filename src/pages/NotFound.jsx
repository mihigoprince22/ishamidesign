import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(6rem, 15vw, 12rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#F5F0EB',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#1A1A1A',
            marginTop: '-1rem',
          }}
        >
          Page Not Found
        </h1>
        <p
          className="text-body"
          style={{ color: '#777', marginTop: '1rem', maxWidth: '400px', margin: '1rem auto 0' }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-pill btn-pill-dark"
          style={{ marginTop: '2.5rem', display: 'inline-block' }}
        >
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
}
