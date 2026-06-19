import React, { useState, useCallback } from 'react';
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
};

const StarIcon = ({ filled, size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#F5A623' : 'none'} stroke="#F5A623" strokeWidth="2">
    <path d={icons.star} />
  </svg>
);

/* ═══════════════════════════════════════════
   BOTTOM TAB BAR
   ═══════════════════════════════════════════ */
const BottomTabBar = ({ activeTab = 'home' }) => {
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'default',
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
   SCREEN 1 - HOME FEED
   ═══════════════════════════════════════════ */
const HomeFeed = ({ onProjectClick }) => {
  const [activeCat, setActiveCat] = useState('Interior');
  const categories = ['Interior', 'Furniture', 'Exterior'];

  const projects = [
    {
      id: 1,
      title: 'Modern Living Room',
      designer: 'Ishami Studio',
      rating: 4.8,
      gradient: 'linear-gradient(135deg, ' + C.primary + ', #2D6A5A)',
    },
    {
      id: 2,
      title: 'Minimalist Kitchen',
      designer: 'Ishami Studio',
      rating: 4.6,
      gradient: 'linear-gradient(135deg, ' + C.accent + ', #C4956A)',
    },
  ];

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
        {/* header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: C.primary,
              letterSpacing: -0.3,
            }}
          >
            Ishami
          </span>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: C.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <Icon d={icons.bell} size={14} color={C.text} />
          </div>
        </div>

        {/* greeting */}
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 10, color: C.textSec, margin: 0, lineHeight: 1.2 }}>Good Morning</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '2px 0 0' }}>
            Find your inspiration
          </p>
        </div>

        {/* search bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: C.white,
            borderRadius: 10,
            padding: '8px 10px',
            marginBottom: 14,
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
        >
          <Icon d={icons.search} size={13} color="#BBBBBB" />
          <span style={{ fontSize: 10, color: '#BBBBBB' }}>Search designs, rooms...</span>
        </div>

        {/* category pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {categories.map((cat) => {
            const active = cat === activeCat;
            return (
              <div
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  fontSize: 9,
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: active ? C.primary : C.white,
                  color: active ? C.white : C.text,
                  border: active ? 'none' : '1px solid ' + C.border,
                  transition: 'all .2s ease',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {cat}
              </div>
            );
          })}
        </div>

        {/* section label */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>Featured Projects</span>
          <span style={{ fontSize: 9, color: C.accent, fontWeight: 500, cursor: 'pointer' }}>See All</span>
        </div>

        {/* project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {projects.map((p) => (
            <motion.div
              key={p.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onProjectClick(p)}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                background: C.card,
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  height: 100,
                  background: p.gradient,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon d={icons.heart} size={11} color={C.white} />
                </div>
              </div>
              <div style={{ padding: '8px 10px 10px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{p.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StarIcon filled size={10} />
                    <span style={{ fontSize: 9, color: C.textSec, fontWeight: 500 }}>{p.rating}</span>
                  </div>
                </div>
                <span style={{ fontSize: 9, color: C.textSec }}>{p.designer}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomTabBar activeTab="home" />
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 2 - PROJECT DETAIL
   ═══════════════════════════════════════════ */
const ProjectDetail = ({ project, onBack, onBook }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: C.bg,
      fontFamily: 'Poppins, sans-serif',
    }}
  >
    <div className="no-scrollbars" style={{ flex: 1, overflowY: 'auto' }}>
      {/* hero image */}
      <div style={{ height: 180, background: project.gradient, position: 'relative' }}>
        <motion.div
          whileTap={{ scale: 0.85 }}
          onClick={onBack}
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Icon d={icons.back} size={14} color={C.white} />
        </motion.div>
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon d={icons.heart} size={14} color={C.white} />
        </div>
      </div>

      {/* content */}
      <div style={{ padding: '14px 14px 16px' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: C.text }}>{project.title}</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 4,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, ' + C.accent + ', ' + C.primary + ')',
            }}
          />
          <span style={{ fontSize: 10, color: C.textSec }}>{project.designer}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 1, marginLeft: 'auto' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon key={s} filled={s <= Math.round(project.rating)} size={10} />
            ))}
            <span style={{ fontSize: 9, color: C.textSec, marginLeft: 3 }}>{project.rating}</span>
          </div>
        </div>

        <div style={{ height: 1, background: C.border, marginBottom: 10 }} />

        <p
          style={{
            fontSize: 10,
            lineHeight: 1.6,
            color: C.textSec,
            margin: '0 0 14px',
          }}
        >
          A contemporary living space blending organic textures with clean architectural lines.
          Designed for comfort and elegance.
        </p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {['Living Room', '45 m\u00B2', 'Modern'].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 8,
                padding: '4px 10px',
                borderRadius: 20,
                background: C.primary + '12',
                color: C.primary,
                fontWeight: 500,
                fontFamily: 'Poppins, sans-serif',
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
            width: '100%',
            padding: '11px 0',
            borderRadius: 12,
            border: 'none',
            background: C.primary,
            color: C.white,
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: 0.2,
          }}
        >
          Book Consultation
        </motion.button>
      </div>
    </div>

    <BottomTabBar activeTab="home" />
  </div>
);

/* ═══════════════════════════════════════════
   SCREEN 3 - BOOKING
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
        {/* header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            paddingTop: 10,
            marginBottom: 14,
          }}
        >
          <motion.div
            whileTap={{ scale: 0.85 }}
            onClick={onBack}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: C.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <Icon d={icons.back} size={14} color={C.text} />
          </motion.div>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Book a Session</span>
        </div>

        {/* calendar */}
        <div
          style={{
            background: C.white,
            borderRadius: 14,
            padding: 12,
            marginBottom: 12,
            boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
            <Icon d={icons.calendar} size={13} color={C.primary} />
            <span style={{ fontSize: 10, fontWeight: 600, color: C.text }}>Select Date</span>
          </div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
            {days.map((d, i) => {
              const active = i === selectedDay;
              return (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedDay(i)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: '6px 0',
                    borderRadius: 10,
                    width: 30,
                    cursor: 'pointer',
                    background: active ? C.primary : 'transparent',
                    transition: 'background .2s',
                  }}
                >
                  <span style={{ fontSize: 8, color: active ? 'rgba(255,255,255,0.7)' : C.textSec }}>
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: active ? C.white : C.text,
                    }}
                  >
                    {d.num}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* time slots */}
        <div
          style={{
            background: C.white,
            borderRadius: 14,
            padding: 12,
            marginBottom: 12,
            boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
            <Icon d={icons.clock} size={13} color={C.primary} />
            <span style={{ fontSize: 10, fontWeight: 600, color: C.text }}>Select Time</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {timeSlots.map((t, i) => {
              const active = i === selectedTime;
              return (
                <motion.div
                  key={t}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setSelectedTime(i)}
                  style={{
                    textAlign: 'center',
                    padding: '8px 0',
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: 500,
                    cursor: 'pointer',
                    background: active ? C.primary : 'transparent',
                    color: active ? C.white : C.text,
                    border: active ? 'none' : '1px solid ' + C.border,
                    transition: 'all .2s',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {t}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* your details */}
        <div
          style={{
            background: C.white,
            borderRadius: 14,
            padding: 12,
            marginBottom: 14,
            boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 600, color: C.text, display: 'block', marginBottom: 8 }}>
            Your Details
          </span>
          {['Full Name', 'Phone Number'].map((ph) => (
            <div
              key={ph}
              style={{
                background: C.bg,
                borderRadius: 8,
                padding: '9px 10px',
                marginBottom: 6,
                fontSize: 9,
                color: '#BBBBBB',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {ph}
            </div>
          ))}
        </div>

        {/* confirm button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleConfirm}
          style={{
            width: '100%',
            padding: '11px 0',
            borderRadius: 12,
            border: 'none',
            background: confirmed ? C.success : C.primary,
            color: C.white,
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: 0.2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'background .3s',
          }}
        >
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.span
                key="done"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Icon d={icons.check} size={14} color={C.white} />
                Booked!
              </motion.span>
            ) : (
              <motion.span
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Confirm Booking
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <BottomTabBar activeTab="home" />
    </div>
  );
};

/* ═══════════════════════════════════════════
   PHONE SIMULATOR (the outer frame)
   ═══════════════════════════════════════════ */
const PhoneSimulator = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  const goTo = useCallback(
    (idx, project) => {
      setDirection(idx > screenIndex ? 1 : -1);
      if (project) setSelectedProject(project);
      setScreenIndex(idx);
    },
    [screenIndex],
  );

  const defaultProject = {
    title: 'Modern Living Room',
    designer: 'Ishami Studio',
    rating: 4.8,
    gradient: 'linear-gradient(135deg, ' + C.primary + ', #2D6A5A)',
  };

  const screens = [
    <HomeFeed key="home" onProjectClick={(p) => goTo(1, p)} />,
    <ProjectDetail
      key="detail"
      project={selectedProject || defaultProject}
      onBack={() => goTo(0)}
      onBook={() => goTo(2)}
    />,
    <BookingScreen key="booking" onBack={() => goTo(1)} />,
  ];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* side buttons */}
      {/* silent toggle */}
      <div
        style={{
          position: 'absolute',
          left: -2.5,
          top: 105,
          width: 3,
          height: 18,
          background: '#2A2A2A',
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* volume up */}
      <div
        style={{
          position: 'absolute',
          left: -2.5,
          top: 140,
          width: 3,
          height: 32,
          background: '#2A2A2A',
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* volume down */}
      <div
        style={{
          position: 'absolute',
          left: -2.5,
          top: 180,
          width: 3,
          height: 32,
          background: '#2A2A2A',
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* power */}
      <div
        style={{
          position: 'absolute',
          right: -2.5,
          top: 155,
          width: 3,
          height: 42,
          background: '#2A2A2A',
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* iPhone body */}
      <div
        style={{
          width: 280,
          height: 590,
          borderRadius: 50,
          background: '#1C1C1E',
          padding: 4,
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.08), 0 4px 30px rgba(0,0,0,0.45), 0 10px 60px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)',
          position: 'relative',
        }}
      >
        {/* inner bezel */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 46,
            overflow: 'hidden',
            background: C.bg,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Status bar */}
          <div
            style={{
              height: 44,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 20px 4px',
              position: 'relative',
              zIndex: 10,
              background: C.bg,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, color: C.text, fontFamily: 'Poppins, sans-serif' }}>
              9:41
            </span>
            {/* Dynamic Island */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 90,
                height: 22,
                borderRadius: 20,
                background: '#000000',
              }}
            />
            {/* status icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                {[5, 7, 9, 11].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 2.5,
                      height: h,
                      borderRadius: 1,
                      background: C.text,
                    }}
                  />
                ))}
              </div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M1.42 9a16 16 0 0 1 21.16 0M5.07 12.5a10 10 0 0 1 13.86 0M8.72 16a6 6 0 0 1 6.56 0M12 19.5h.01" stroke={C.text} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div
                style={{
                  width: 18,
                  height: 9,
                  borderRadius: 2,
                  border: '1px solid ' + C.text,
                  padding: 1,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '75%',
                    height: '100%',
                    borderRadius: 1,
                    background: C.text,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: -3,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 2,
                    height: 4,
                    borderRadius: '0 1px 1px 0',
                    background: C.text,
                  }}
                />
              </div>
            </div>
          </div>

          {/* screen content area */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={screenIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                }}
              >
                {screens[screenIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* home indicator bar */}
          <div
            style={{
              height: 20,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: C.white,
            }}
          >
            <div
              style={{
                width: 100,
                height: 4,
                borderRadius: 4,
                background: '#CCCCCC',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneSimulator;
