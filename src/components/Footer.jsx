import { Link } from 'react-router-dom';
import IshamiLogo from './IshamiLogo.jsx';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

const socials = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/250788310401',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A3C34', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 4vw 2.5rem' }}>

        {/* ─── Large Striking Logo ─── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <IshamiLogo variant="footer" />
        </div>

        {/* ─── Divider ─── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem' }} />

        {/* ─── Four-column grid ─── */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }}>
          {/* LEFT — About */}
          <div>
            <p className="text-label" style={{ color: '#D4B896', marginBottom: '1.25rem', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
              About
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7, maxWidth: '280px' }}>
              Creative indoor & outdoor design experiences. Affordable, environmentally friendly solutions since 2019.
            </p>
          </div>

          {/* MIDDLE — Quick Links */}
          <div>
            <p className="text-label" style={{ color: '#D4B896', marginBottom: '1.25rem', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
              Quick Links
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#D4B896')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT — Contact */}
          <div>
            <p className="text-label" style={{ color: '#D4B896', marginBottom: '1.25rem', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
              Get in Touch
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>
              <a href="tel:+250788310401" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4B896')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                +250 788 310 401
              </a>
              <a href="mailto:ishamiinteriordesign@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4B896')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                ishamiinteriordesign@gmail.com
              </a>
              <p style={{ margin: 0 }}>Kibagabaga, Gasabo, Kigali</p>
            </div>
          </div>

          {/* RIGHT-MOST — App Prototype CTA */}
          <div>
            <p className="text-label" style={{ color: '#D4B896', marginBottom: '1.25rem', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
              Interactive Prototype
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '280px' }}>
              Test drive our digital mobile experience directly in your browser.
            </p>
            <Link
              to="/app-demo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#D4B896',
                color: '#1A3C34',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 15px rgba(212,184,150,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(255,255,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#D4B896';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(212,184,150,0.3)';
              }}
            >
              Launch App Demo
            </Link>
          </div>
        </div>

        {/* ─── Social Icons ─── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '3rem', paddingTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4B896'; e.currentTarget.style.color = '#1A3C34'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* ─── Copyright ─── */}
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '2rem' }}>
          © {new Date().getFullYear()} Ishami Interior Design & Decor Ltd. All rights reserved.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center;
          }
          .footer-grid p { margin-left: auto; margin-right: auto; }
          .footer-grid nav { align-items: center; }
        }
      `}</style>
    </footer>
  );
}
