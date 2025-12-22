import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../Navigation/footer";
import Navbar from "../Navigation/Navbar";
import "./homepage.css";

// Images
import KantorImage from "../assets/kantor_icp(landscape1).webp";
import WorkstationImage from "../assets/Workstation.png";
import ServicesImage from "../assets/Services.png";
import AboutImage from "../assets/About.png";

function Homepage() {
  const navigate = useNavigate();
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [contentVisible, setContentVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const mainContentRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Animasi overlay dari 100% ke 50%
    const overlayTimer = setTimeout(() => {
      setOverlayOpacity(0.5);
    }, 100);

    // Animasi fade in untuk content (teks dan tombol)
    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 600);

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  useEffect(() => {
    // Simpan referensi untuk cleanup
    const currentCards = cardRefs.current;

    // Observer untuk animasi cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = currentCards.indexOf(entry.target);
            if (index !== -1) {
              setTimeout(() => {
                setCardsVisible((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200); // Delay berbeda untuk setiap card
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const handleExploreClick = () => {
    if (mainContentRef.current) {
      // Cara 1: Gunakan scrollIntoView
      mainContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Cara 2: Fallback dengan window.scrollTo (lebih reliable untuk event trigger)
      setTimeout(() => {
        const targetPosition = mainContentRef.current.offsetTop;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const navigationItems = [
    {
      id: "tentang",
      title: "Tentang Infoduta",
      image: AboutImage,
      route: "/tentang",
      description:
        "Lorem ipsum dolor sit amet consectetur. Viverra amet lacus urna euismod in fermentum vitae. Sed sed enim semper id.",
    },
    {
      id: "layanan",
      title: "Layanan Kami",
      image: ServicesImage,
      route: "/layanan",
      description:
        "Lorem ipsum dolor sit amet consectetur. Viverra amet lacus urna euismod in fermentum vitae. Sed sed enim semper id.",
    },
    {
      id: "produk",
      title: "Produk IT Infoduta",
      image: WorkstationImage,
      route: "/produk",
      description:
        "Lorem ipsum dolor sit amet consectetur. Viverra amet lacus urna euismod in fermentum vitae. Sed sed enim semper id.",
    },
  ];

  return (
    <div className="homepage-container">
      <Helmet>
        <title>
          PT. Infoduta Computindo Perkasa | Solusi Pengadaan Produk IT terbaik
          untuk Bisnis Anda
        </title>
        <meta
          name="description"
          content="Temukan solusi teknologi terdepan untuk mengembangkan bisnis Anda bersama PT Infoduta Computindo Perkasa. Jelajahi produk dan layanan kami sekarang!"
        />
        <meta
          name="keywords"
          content="Infoduta, Infoduta Computindo Perkasa, Software, Hardware, Solusi IT, Produk IT, Layanan IT, Teknologi Bisnis, Infrastruktur IT, Perangkat Lunak, Perangkat Keras, Solusi Teknologi, Transformasi Digital"
        />
        <meta name="author" content="PT Infoduta Computindo Perkasa" />
        <meta
          property="og:title"
          content="Infoduta Computindo Perkasa | Solusi Software & Hardware Pilihan Anda"
        />
        <meta
          property="og:description"
          content="Temukan solusi teknologi terdepan untuk mengembangkan bisnis Anda bersama PT Infoduta Computindo Perkasa. Jelajahi produk dan layanan kami sekarang!"
        />
        <meta property="og:image" content="/api/og-image/homepage" />
        <meta property="og:url" content="https://infoduta.com/" />
        <link rel="canonical" href="https://infoduta.com/" />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="homepage-hero-section" id="hero-section">
        <img
          alt="HR Building Wahid Hasyim"
          className="homepage-hero-image"
          src={KantorImage}
        />
        <div
          className="homepage-hero-overlay"
          style={{ opacity: overlayOpacity }}
        ></div>

        <div
          className={`homepage-hero-content ${contentVisible ? "visible" : ""}`}
        >
          <div className="homepage-hero-content-inner">
            <h1 className="homepage-hero-title">
              PT. Infoduta Computindo Perkasa
            </h1>
            <h2 className="homepage-hero-subtitle">
              Solusi Pengadaan Produk IT Terbaik
              <br />
              Untuk Bisnis Anda
            </h2>
            <button
              onClick={handleExploreClick}
              className="explore-button"
              aria-label="Jelajahi layanan kami"
            >
              Jelajah Sekarang
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main ref={mainContentRef} className="homepage-main-content">
        <div className="container-2">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">Jelajahi Infoduta</h2>
            <p className="section-description">
              Lebih dekat dengan perusahaan kami dan temukan produk dan layanan
              sesuai keinginan Anda.
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="cards-grid">
            {navigationItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => navigate(item.route)}
                className={`card ${cardsVisible[index] ? "card-visible" : ""}`}
              >
                {/* Icon Container - di kiri */}
                <div className="card-icon-container">
                  <img
                    alt={`${item.title} icon`}
                    className="card-icon"
                    src={item.image}
                  />
                </div>

                {/* Content - di kanan */}
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>

                  {/* Call to Action */}
                  <div className="card-cta">
                    <span>Selengkapnya</span>
                    <svg
                      className="card-arrow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
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
