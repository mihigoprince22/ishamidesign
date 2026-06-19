import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import AppLanding from './pages/AppLanding.jsx';
import Sandbox from './pages/Sandbox.jsx';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#FFFFFF', overflowX: 'hidden' }}>
      <ScrollToTop />
      {location.pathname === '/app' ? (
        <AppLanding />
      ) : location.pathname === '/app-demo' ? (
        <Sandbox />
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
