import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── colour tokens ─── */
const C = {
  primary: '#1A3C34',
  primaryDark: '#0D2620',
  accent: '#D4B896',
  bg: '#F5F5F5',
  white: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSec: '#888888',
  border: '#E8E8E8',
  success: '#2ECC71',
};

/* ─── slide variants (direction-aware) ─── */
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0.6 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0.6 }),
};

/* ─── tiny icon helpers (inline SVG paths) ─── */
const Icon = ({ d, size = 16, color = C.text, style, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, ...style }}
    {...rest}
  >
    <path d={d} />
  </svg>
);

const icons = {
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  search: 'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM21 21l-4.35-4.35',
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  back: 'M19 12H5M12 19l-7-7 7-7',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z',
  check: 'M20 6L9 17l-5-5',
  calendar: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9'
};

const StarIcon = ({ filled, size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#F5A623' : 'none'} stroke="#F5A623" strokeWidth="2">
    <path d={icons.star} />
  </svg>
);

const MiniIshamiLogo = ({ size = 24, color = C.primary }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 10 L10 50 L20 50 L20 90 L80 90 L80 50 L90 50 Z" stroke={color} strokeWidth="6" strokeLinejoin="round"/>
    <path d="M40 90 L40 60 L60 60 L60 90" stroke={color} strokeWidth="6" strokeLinejoin="round"/>
    <path d="M50 30 Q 60 40 50 50 Q 40 40 50 30" fill={color}/>
  </svg>
);

/* ═══════════════════════════════════════════
   BOTTOM TAB BAR
   ═══════════════════════════════════════════ */
const BottomTabBar = ({ activeTab = 'home', onTabClick }) => {
  const tabs = [
    { key: 'home', icon: icons.home, label: 'Home' },
    { key: 'search', icon: icons.search, label: 'Search' },
    { key: 'heart', icon: icons.heart, label: 'Saved' },
    { key: 'user', icon: icons.user, label: 'Profile' },
  ];
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 52,
        borderTop: '1px solid ' + C.border,
        background: C.white,
        paddingBottom: 4,
        flexShrink: 0,
      }}
    >
      {tabs.map((t) => {
        const active = t.key === activeTab;
        return (
          <div
            key={t.key}
            onClick={() => onTabClick && onTabClick(t.key)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
            }}
          >
            <Icon d={t.icon} size={18} color={active ? C.primary : '#BBBBBB'} />
            <span
              style={{
                fontSize: 9,
                fontWeight: active ? 600 : 400,
                color: active ? C.primary : '#BBBBBB',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {t.label}
            </span>
            {active && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: C.accent,
                  marginTop: -1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 0 - SPLASH
   ═══════════════════════════════════════════ */
const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      height: '100%',
      background: C.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <MiniIshamiLogo size={80} color={C.white} />
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 1 - LOGIN
   ═══════════════════════════════════════════ */
const LoginScreen = ({ onLogin }) => {
  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 24px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <MiniIshamiLogo size={50} color={C.primary} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text, margin: 0 }}>Welcome Back</h2>
          <p style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>Sign in to continue to Ishami</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="email" 
              placeholder="Email Address" 
              style={{
                width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid ' + C.border,
                background: 'transparent', fontSize: 13, outline: 'none', color: C.text, fontFamily: 'Poppins, sans-serif'
              }} 
            />
          </div>
          <div style={{ position: 'relative' }}>
            <input 
              type="password" 
              placeholder="Password" 
              style={{
                width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid ' + C.border,
                background: 'transparent', fontSize: 13, outline: 'none', color: C.text, fontFamily: 'Poppins, sans-serif'
              }} 
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onLogin}
          style={{
            marginTop: 40, width: '100%', padding: '14px 0', background: C.primary, color: C.white,
            border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 14px rgba(26,60,52,0.3)'
          }}
        >
          Log In
        </motion.button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 2 - HOME FEED (Dashboard)
   ═══════════════════════════════════════════ */
const HomeFeed = ({ mockProjects, onProjectClick, onProfileClick }) => {
  const [activeCat, setActiveCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Living Room', 'Kitchen', 'Commercial'];

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(p => {
      const matchCat = activeCat === 'All' || p.category === activeCat;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [mockProjects, activeCat, searchQuery]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: C.bg,
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div className="no-scrollbars" style={{ flex: 1, overflowY: 'auto', padding: '0 14px 10px' }}>
        {/* APP HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10,
            marginBottom: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MiniIshamiLogo size={22} color={C.primary} />
            <span style={{ fontWeight: 700, fontSize: 14, color: C.primary, letterSpacing: -0.3 }}>
              Ishami
            </span>
          </div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={onProfileClick}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: C.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>

        {/* Search bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: C.white,
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 14,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          }}
        >
          <Icon d={icons.search} size={14} color="#BBBBBB" />
          <input 
            type="text" 
            placeholder="Search designs, rooms..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none', background: 'transparent', outline: 'none', 
              fontSize: 11, width: '100%', color: C.text, fontFamily: 'Poppins, sans-serif'
            }}
          />
        </div>

        {/* category pills */}
        <div className="no-scrollbars" style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map((cat) => {
            const active = cat === activeCat;
            return (
              <div
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: active ? C.primary : C.white,
                  color: active ? C.white : C.text,
                  border: active ? 'none' : '1px solid ' + C.border,
                  transition: 'all .2s ease',
                  fontFamily: 'Poppins, sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </div>
            );
          })}
        </div>

        {/* section label */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Featured Projects</span>
          <span style={{ fontSize: 10, color: C.accent, fontWeight: 500, cursor: 'pointer' }}>See All</span>
        </div>

        {/* project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: C.textSec, fontSize: 11 }}>
              No designs found matching "{searchQuery}"
            </div>
          ) : (
            filteredProjects.map((p) => (
              <motion.div
                key={p.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => onProjectClick(p)}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: C.card,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ height: 140, position: 'relative' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 10, right: 10,
                      width: 26, height: 26,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Icon d={icons.heart} size={12} color={C.text} />
                  </div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{p.title}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <StarIcon filled size={11} />
                      <span style={{ fontSize: 10, color: C.textSec, fontWeight: 500 }}>{p.rating}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: C.textSec }}>{p.category}</span>
                    <span style={{ fontSize: 9, padding: '3px 8px', background: C.primary+'15', color: C.primary, borderRadius: 10, fontWeight: 600 }}>{p.designer}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <BottomTabBar activeTab="home" onTabClick={cat => cat === 'user' && onProfileClick()} />
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 3 - PROJECT DETAIL
   ═══════════════════════════════════════════ */
const ProjectDetail = ({ project, onBack, onBook }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: 'Poppins, sans-serif' }}>
    <div className="no-scrollbars" style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ height: 220, position: 'relative' }}>
        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%)' }} />
        <motion.div
          whileTap={{ scale: 0.85 }}
          onClick={onBack}
          style={{
            position: 'absolute', top: 16, left: 14,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <Icon d={icons.back} size={16} color={C.white} />
        </motion.div>
        <div
          style={{
            position: 'absolute', top: 16, right: 14,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon d={icons.heart} size={16} color={C.white} />
        </div>
      </div>

      <div style={{ padding: '18px 16px', background: C.white, borderRadius: '20px 20px 0 0', marginTop: -20, position: 'relative', zIndex: 2, minHeight: '100%' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: C.text }}>{project.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: 14 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, ' + C.accent + ', ' + C.primary + ')', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MiniIshamiLogo size={14} color={C.white} />
          </div>
          <span style={{ fontSize: 11, color: C.textSec, fontWeight: 500 }}>{project.designer}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon key={s} filled={s <= Math.round(project.rating)} size={11} />
            ))}
            <span style={{ fontSize: 10, color: C.textSec, marginLeft: 4, fontWeight: 600 }}>{project.rating}</span>
          </div>
        </div>

        <div style={{ height: 1, background: C.border, marginBottom: 14 }} />

        <p style={{ fontSize: 11, lineHeight: 1.6, color: C.textSec, margin: '0 0 16px' }}>
          A contemporary space blending organic textures with clean architectural lines.
          Designed for comfort and elegance, perfectly suited for modern living.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {[project.category, '45 m²', 'Modern'].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 9, padding: '5px 12px', borderRadius: 20,
                background: C.primary + '12', color: C.primary, fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onBook}
          style={{
            width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
            background: C.primary, color: C.white, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Poppins, sans-serif', letterSpacing: 0.2,
            boxShadow: '0 4px 14px rgba(26,60,52,0.25)'
          }}
        >
          Book Consultation
        </motion.button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   SCREEN 4 - BOOKING
   ═══════════════════════════════════════════ */
const BookingScreen = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState(3);
  const [selectedTime, setSelectedTime] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return { label: dayLabels[i], num: d.getDate() };
  });

  const timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: 'Poppins, sans-serif' }}>
      <div className="no-scrollbars" style={{ flex: 1, overflowY: 'auto', padding: '0 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, marginBottom: 18 }}>
          <motion.div
            whileTap={{ scale: 0.85 }}
            onClick={onBack}
            style={{ width: 30, height: 30, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
          >
            <Icon d={icons.back} size={15} color={C.text} />
          </motion.div>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Book Session</span>
        </div>

        <div style={{ background: C.white, borderRadius: 16, padding: 14, marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Icon d={icons.calendar} size={14} color={C.primary} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>Select Date</span>
          </div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
            {days.map((d, i) => {
              const active = i === selectedDay;
              return (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedDay(i)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 0', borderRadius: 12, width: 34, cursor: 'pointer', background: active ? C.primary : 'transparent' }}
                >
                  <span style={{ fontSize: 9, color: active ? 'rgba(255,255,255,0.8)' : C.textSec }}>{d.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: active ? C.white : C.text }}>{d.num}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div style={{ background: C.white, borderRadius: 16, padding: 14, marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Icon d={icons.clock} size={14} color={C.primary} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>Select Time</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {timeSlots.map((t, i) => {
              const active = i === selectedTime;
              return (
                <motion.div
                  key={t}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(i)}
                  style={{ textAlign: 'center', padding: '10px 0', borderRadius: 12, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: active ? C.primary : 'transparent', color: active ? C.white : C.text, border: active ? '1px solid transparent' : '1px solid ' + C.border }}
                >
                  {t}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleConfirm}
          style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: confirmed ? C.success : C.primary, color: C.white, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background .3s', boxShadow: '0 4px 14px rgba(26,60,52,0.25)' }}
        >
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon d={icons.check} size={16} color={C.white} /> Booked!
              </motion.span>
            ) : (
              <motion.span key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Confirm Booking</motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 5 - PROFILE SCREEN
   ═══════════════════════════════════════════ */
const ProfileScreen = ({ onBack, onLogout }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: 'Poppins, sans-serif' }}>
      <div className="no-scrollbars" style={{ flex: 1, overflowY: 'auto', padding: '0 14px 10px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, marginBottom: 20 }}>
          <motion.div
            whileTap={{ scale: 0.85 }}
            onClick={onBack}
            style={{ width: 30, height: 30, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
          >
            <Icon d={icons.back} size={15} color={C.text} />
          </motion.div>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Profile</span>
          <div style={{ width: 30 }} /> {/* spacer */}
        </div>

        {/* User Info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', marginBottom: 12, border: '3px solid '+C.white, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: C.text }}>Alex Morgan</h2>
          <span style={{ fontSize: 11, color: C.textSec, marginTop: 4 }}>alex@example.com</span>
        </div>

        {/* Menu Items */}
        <div style={{ background: C.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: 24 }}>
          {[
            { icon: icons.heart, label: 'Saved Designs', count: '12' },
            { icon: icons.calendar, label: 'Consultation History', count: '2' },
            { icon: icons.bell, label: 'Notifications', count: '5' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: i < 2 ? '1px solid '+C.bg : 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon d={item.icon} size={14} color={C.primary} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{item.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.count && <span style={{ fontSize: 10, fontWeight: 600, color: C.textSec, background: C.bg, padding: '2px 8px', borderRadius: 10 }}>{item.count}</span>}
                <Icon d={icons.back} size={12} color="#CCC" style={{ transform: 'rotate(180deg)' }} />
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          style={{ width: '100%', padding: '14px', background: 'transparent', border: '1px solid #FF4D4D', color: '#FF4D4D', borderRadius: 14, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'Poppins, sans-serif' }}
        >
          <Icon d={icons.logout} size={14} color="#FF4D4D" /> Log Out
        </motion.button>
      </div>
      <BottomTabBar activeTab="user" onTabClick={cat => cat === 'home' && onBack()} />
    </div>
  );
};

/* ═══════════════════════════════════════════
   PHONE SIMULATOR (the outer frame)
   ═══════════════════════════════════════════ */
const PhoneSimulator = () => {
  const [screenIndex, setScreenIndex] = useState(0); // 0:Splash, 1:Login, 2:Home, 3:Detail, 4:Booking, 5:Profile
  const [direction, setDirection] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  const mockProjects = [
    { id: 1, title: 'Modern Living Room', category: 'Living Room', designer: 'Ishami Studio', rating: 4.8, image: '/images/gallery/living-bright.png' },
    { id: 2, title: 'Minimalist Kitchen', category: 'Kitchen', designer: 'Ishami Studio', rating: 4.6, image: '/images/gallery/kitchen-dark.png' },
    { id: 3, title: 'Organic Wall Decor', category: 'Living Room', designer: 'Ishami Studio', rating: 4.9, image: '/images/gallery/basket-wall.png' },
    { id: 4, title: 'Boutique Restaurant', category: 'Commercial', designer: 'Ishami Studio', rating: 5.0, image: '/images/gallery/green-restaurant.png' },
    { id: 5, title: 'Lounge Area', category: 'Living Room', designer: 'Ishami Studio', rating: 4.7, image: '/images/gallery/sofas-lounge.png' },
    { id: 6, title: 'Elegant Dining', category: 'Kitchen', designer: 'Ishami Studio', rating: 4.8, image: '/images/gallery/dining-bright.png' },
  ];

  const goTo = useCallback(
    (idx, project) => {
      setDirection(idx > screenIndex ? 1 : -1);
      if (project) setSelectedProject(project);
      setScreenIndex(idx);
    },
    [screenIndex]
  );

  const screens = [
    <SplashScreen key="splash" onComplete={() => goTo(1)} />,
    <LoginScreen key="login" onLogin={() => goTo(2)} />,
    <HomeFeed key="home" mockProjects={mockProjects} onProjectClick={(p) => goTo(3, p)} onProfileClick={() => goTo(5)} />,
    <ProjectDetail key="detail" project={selectedProject || mockProjects[0]} onBack={() => goTo(2)} onBook={() => goTo(4)} />,
    <BookingScreen key="booking" onBack={() => goTo(3)} />,
    <ProfileScreen key="profile" onBack={() => goTo(2)} onLogout={() => goTo(1)} />
  ];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* side buttons */}
      <div style={{ position: 'absolute', left: -2.5, top: 105, width: 3, height: 18, background: '#2A2A2A', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: -2.5, top: 140, width: 3, height: 32, background: '#2A2A2A', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: -2.5, top: 180, width: 3, height: 32, background: '#2A2A2A', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', right: -2.5, top: 155, width: 3, height: 48, background: '#2A2A2A', borderRadius: '0 2px 2px 0' }} />

      {/* phone frame */}
      <div
        style={{
          width: 320,
          height: 650,
          background: C.bg,
          borderRadius: 44,
          border: '8px solid #1A1A1A',
          boxShadow: 'inset 0 0 0 2px #444, 0 30px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {/* top status bar (hidden on splash) */}
          {screenIndex !== 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px 4px', position: 'relative', zIndex: 10, background: screenIndex === 1 ? 'transparent' : C.bg }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.text, fontFamily: 'Poppins, sans-serif' }}>9:41</span>
              {/* Dynamic Island */}
              <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 90, height: 22, borderRadius: 20, background: '#000000' }} />
              {/* status icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                  {[5, 7, 9, 11].map((h, i) => <div key={i} style={{ width: 2.5, height: h, borderRadius: 1, background: C.text }} />)}
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M1.42 9a16 16 0 0 1 21.16 0M5.07 12.5a10 10 0 0 1 13.86 0M8.72 16a6 6 0 0 1 6.56 0M12 19.5h.01" stroke={C.text} strokeWidth="2" strokeLinecap="round" /></svg>
                <div style={{ width: 18, height: 9, borderRadius: 2, border: '1px solid ' + C.text, padding: 1, position: 'relative' }}>
                  <div style={{ width: '75%', height: '100%', borderRadius: 1, background: C.text }} />
                  <div style={{ position: 'absolute', right: -3, top: '50%', transform: 'translateY(-50%)', width: 2, height: 4, borderRadius: '0 1px 1px 0', background: C.text }} />
                </div>
              </div>
            </div>
          )}

          {/* screen content area */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={screenIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween', duration: 0.35, ease: [0.45, 0.02, 0.09, 0.98] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                {screens[screenIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* home indicator bar */}
          <div style={{ height: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: (screenIndex === 0 || screenIndex === 3) ? 'transparent' : C.white, position: 'absolute', bottom: 0, width: '100%', zIndex: 10 }}>
            <div style={{ width: 100, height: 4, borderRadius: 4, background: (screenIndex === 0) ? '#FFFFFF' : '#CCCCCC' }} />
          </div>
        </div>
      </div>
      <style>{`
        .no-scrollbars::-webkit-scrollbar { display: none; }
        .no-scrollbars { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PhoneSimulator;
