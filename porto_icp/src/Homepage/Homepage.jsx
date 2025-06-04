
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Navigation/footer';
import Navbar from '../Navigation/Navbar';

// Mock components for demonstration - replace with your actual components

// Placeholder images - replace with your actual imports
import KantorImage from '../assets/kantor_icp(landscape1).png';
import ArrowImage from '../assets/arrow.png';
import WorkstationImage from '../assets/Workstation.png';
import ServicesImage from '../assets/Services.png';
import AboutImage from '../assets/About.png';

function Homepage() {
  // Mock navigate function - replace with actual useNavigate hook
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [scrollAnimate, setScrollAnimate] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (mainContentRef.current) {
        const rect = mainContentRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom >= 0) {
          setScrollAnimate(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navigationItems = [
    {
      id: 'produk',
      title: 'Produk',
      image: WorkstationImage,
      route: '/produk',
      description: 'Jelajahi produk unggulan kami'
    },
    {
      id: 'layanan',
      title: 'Layanan',
      image: ServicesImage,
      route: '/layanan',
      description: 'Temukan layanan terbaik'
    },
    {
      id: 'tentang',
      title: 'Tentang',
      image: AboutImage,
      route: '/tentang',
      description: 'Kenali lebih dekat perusahaan kami'
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    },
    heroSection: {
      position: 'relative',
      height: '100vh',
      overflow: 'hidden'
    },
    heroImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%)',
      zIndex: 2
    },
    heroContent: {
      position: 'absolute',
      top: '50%',
      right: '4rem',
      color: 'white',
      maxWidth: '32rem',
      zIndex: 10,
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(50px)',
      transition: 'all 0.8s ease-out'
    },
    heroContentInner: {
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    heroTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      lineHeight: '1.2',
      marginBottom: '1.5rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroSubtitle: {
      color: '#3b82f6',
      display: 'block',
      fontSize: '2rem'
    },
    heroTagline: {
      color: '#e2e8f0',
      fontSize: '1.5rem',
      fontWeight: 'normal',
      display: 'block',
      marginTop: '0.5rem'
    },
    heroDescription: {
      color: '#cbd5e1',
      fontSize: '1.125rem',
      marginBottom: '2rem',
      lineHeight: '1.75'
    },
    exploreButton: {
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '0.75rem',
      padding: '1rem 2rem',
      fontSize: '1.125rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      zIndex: 10,
      textAlign: 'center',
      animation: 'bounce 2s infinite'
    },
    scrollText: {
      fontSize: '0.875rem',
      marginBottom: '0.5rem'
    },
    scrollMouse: {
      width: '1.5rem',
      height: '2.5rem',
      border: '2px solid white',
      borderRadius: '1rem',
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto'
    },
    scrollDot: {
      width: '0.25rem',
      height: '0.75rem',
      backgroundColor: 'white',
      borderRadius: '0.125rem',
      marginTop: '0.5rem',
      animation: 'pulse 2s infinite'
    },
    mainContent: {
      padding: '5rem 1.5rem',
      backgroundColor: 'white',
      opacity: scrollAnimate ? 1 : 0,
      transform: scrollAnimate ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out'
    },
    container2: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    sectionTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1rem'
    },
    sectionTitleAccent: {
      color: '#2563eb'
    },
    sectionDivider: {
      width: '6rem',
      height: '0.25rem',
      background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
      margin: '0 auto 1.5rem auto',
      borderRadius: '0.125rem'
    },
    sectionDescription: {
      fontSize: '1.25rem',
      color: '#6b7280',
      maxWidth: '32rem',
      margin: '0 auto',
      lineHeight: '1.75'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
      borderRadius: '1rem',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    },
    cardPattern1: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '8rem',
      height: '8rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      transform: 'translate(4rem, -4rem)'
    },
    cardPattern2: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '6rem',
      height: '6rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      transform: 'translate(-3rem, 3rem)'
    },
    cardContent: {
      position: 'relative',
      zIndex: 10
    },
    cardIconContainer: {
      width: '6rem',
      height: '6rem',
      margin: '0 auto 1.5rem auto',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease'
    },
    cardIcon: {
      width: '3rem',
      height: '3rem',
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.75rem',
      transition: 'transform 0.3s ease'
    },
    cardDescription: {
      color: '#bfdbfe',
      fontSize: '0.875rem',
      lineHeight: '1.75',
      marginBottom: '1.5rem'
    },
    cardCta: {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'white',
      fontWeight: '600',
      transition: 'transform 0.3s ease'
    },
    cardArrow: {
      marginLeft: '0.5rem',
      width: '1rem',
      height: '1rem'
    },
    // Media queries simulation
      '@media (max-width: 768px)': {
        heroContent: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.6)',
          margin: '0 1rem',
          padding: '1.5rem',
          borderRadius: '1rem',
          zIndex: 10,
          maxWidth: '95%',
          width: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        },
        heroContentInner: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        },
        heroImage: {
          zIndex: 1
        },
        heroTitle: {
          fontSize: '1.75rem',
          lineHeight: '1.2'
        },
        heroSubtitle: {
          fontSize: '1.25rem'
        },
        heroTagline: {
          fontSize: '1rem'
        },
        sectionTitle: {
          fontSize: '2rem'
        }
      }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0) translateX(-50%); }
            50% { transform: translateY(-10px) translateX(-50%); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .hero-content:hover .explore-button {
            background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          }

          .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .card:hover .card-icon-container {
            transform: scale(1.1);
          }

          .card:hover .card-title {
            transform: scale(1.05);
          }

          .card:hover .card-cta {
            transform: translateX(8px);
          }

          .floating-arrow {
            animation: pulse 2s infinite;
          }

          @media (max-width: 768px) {
          .hero-content {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: rgba(0, 0, 0, 0.6) !important;
            margin: 0 1rem !important;
            padding: 1.5rem !important;
            border-radius: 1rem !important;
            z-index: 10 !important;
            max-width: 95% !important;
            width: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
            hyphens: auto !important;
          }
          .hero-content-inner {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .heroImage {
            z-index: 1 !important;
          }
          
          .hero-title {
            font-size: 1.75rem !important;
            line-height: 1.2 !important;
          }
          
          
          .section-title {
            font-size: 2rem !important;
          }
          .hero-subtitle {
            font-size: 1.25rem !important;
          }
          .hero-tagline {
            font-size: 1rem !important;
          }
          
          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
        `}
      </style>

      <Navbar />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <img
          alt="Modern office building representing our company headquarters"
          style={styles.heroImage}
          src={KantorImage}
        />
        <div style={styles.heroOverlay}></div>

        <div className="hero-content" style={styles.heroContent}>
          <div style={styles.heroContentInner}>
            <h1 className="hero-title" style={styles.heroTitle}>
              Solusi Kebutuhan
              <span style={styles.heroSubtitle}>Software & Hardware</span>
              <span style={styles.heroTagline}>Pilihan Anda</span>
            </h1>
            
            <p style={styles.heroDescription}>
              Temukan solusi teknologi terdepan untuk mengembangkan bisnis Anda
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={handleExploreClick}
                className="explore-button"
                style={styles.exploreButton}
                aria-label="Jelajahi layanan kami"
              >
                <span>Jelajahi Sekarang</span>
                <img 
                  className="floating-arrow"
                  style={{ width: '1.25rem', height: '1.25rem' }}
                  src={ArrowImage} 
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main
        ref={mainContentRef}
        style={styles.mainContent}
      >
        <div style={styles.container2}>
          {/* Section Header */}
          <div style={styles.sectionHeader}>
            <h2 className="section-title" style={styles.sectionTitle}>
              Eksplor <span style={styles.sectionTitleAccent}>Infoduta</span>
            </h2>
            <div style={styles.sectionDivider}></div>
            <p style={styles.sectionDescription}>
              Lebih dekat dengan perusahaan kami
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="cards-grid" style={styles.cardsGrid}>
            {navigationItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => navigate(item.route)}
                className="card"
                style={{
                  ...styles.card,
                  opacity: scrollAnimate ? 1 : 0,
                  transform: scrollAnimate ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.8s ease-out ${index * 0.2}s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
                }}
              >
                {/* Background Pattern */}
                <div style={styles.cardPattern1}></div>
                <div style={styles.cardPattern2}></div>

                <div style={styles.cardContent}>
                  {/* Icon Container */}
                  <div className="card-icon-container" style={styles.cardIconContainer}>
                    <img
                      alt={`${item.title} icon`}
                      style={styles.cardIcon}
                      src={item.image}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="card-title" style={styles.cardTitle}>
                    {item.title}
                  </h3>
                  <p style={styles.cardDescription}>
                    {item.description}
                  </p>

                  {/* Call to Action */}
                  <div className="card-cta" style={styles.cardCta}>
                    <span>Pelajari Lebih Lanjut</span>
                    <svg 
                      style={styles.cardArrow}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;