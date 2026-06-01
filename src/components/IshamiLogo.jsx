import { motion, useScroll, useTransform } from 'framer-motion';

export default function IshamiLogo({ variant = 'default', onClick }) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 100], [1, 0.75]);

  const isStatic = variant === 'static' || variant === 'footer';
  const isFooter = variant === 'footer';
  const color = isFooter ? '#FFFFFF' : 'currentColor';

  const LogoSVG = ({ size = 50 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {/* Geometric Roof */}
      <path d="M 10 50 L 50 15 L 90 50" />
      {/* Chimney */}
      <path d="M 75 28 L 75 12 L 85 12 L 85 36" />
      {/* Inner Branch */}
      <path d="M 50 90 Q 40 50 65 35" strokeWidth="2" />
      {/* Leaf 1 */}
      <path d="M 48 65 Q 35 60 40 45 Q 50 50 48 65 Z" fill={color} strokeWidth="1" />
      {/* Leaf 2 */}
      <path d="M 58 50 Q 75 45 65 30 Q 55 35 58 50 Z" fill={color} strokeWidth="1" />
    </svg>
  );

  const Typography = ({ large }) => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '2px' }}>
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: large ? '1.75rem' : '1.5rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          lineHeight: 1,
          marginBottom: '3px',
          color: 'inherit',
        }}
      >
        ISHAMI
      </span>
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: large ? '0.65rem' : '0.55rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontWeight: 300,
          opacity: 0.9,
          color: 'inherit',
        }}
      >
        Interior Design & Decor
      </span>
    </div>
  );

  /* ─── Footer variant: large, static, white on green ─── */
  if (isFooter) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          color: '#FFFFFF',
        }}
      >
        <LogoSVG size={60} />
        <Typography large />
      </div>
    );
  }

  /* ─── Static variant: for menu overlay, no scroll physics ─── */
  if (isStatic) {
    return (
      <a
        href="/"
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <LogoSVG size={42} />
        <Typography />
      </a>
    );
  }

  /* ─── Default: fixed top-left with scroll shrink + spring physics ─── */
  return (
    <motion.div
      style={{
        scale,
        transformOrigin: 'left top',
        mixBlendMode: 'difference',
        color: '#FFFFFF',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <LogoSVG />
        <Typography />
      </a>
    </motion.div>
  );
}
