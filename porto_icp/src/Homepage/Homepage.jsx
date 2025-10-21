import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../Navigation/footer";
import Navbar from "../Navigation/Navbar";
import "./homepage.css";

// Images
import KantorImage from "../assets/kantor_icp(landscape1).webp";
import ArrowImage from "../assets/arrow.png";
import WorkstationImage from "../assets/Workstation.png";
import ServicesImage from "../assets/Services.png";
import AboutImage from "../assets/About.png";

function Homepage() {
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
        if (rect.top < window.innerHeight * 0.6 && rect.bottom >= 0) {
          setScrollAnimate(true);
          window.removeEventListener("scroll", handleScroll);
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExploreClick = () => {
    if (mainContentRef.current) {
      // Ambil elemen section-header (heading "Jelajahi Infoduta")
      const sectionHeader =
        mainContentRef.current.querySelector(".section-header");

      if (sectionHeader) {
        const headerOffset = 100; // Offset dari atas (sesuaikan dengan tinggi navbar Anda)
        const elementPosition = sectionHeader.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const navigationItems = [
    {
      id: "produk",
      title: "Produk",
      image: WorkstationImage,
      route: "/produk",
      description: "Jelajahi produk-produk unggulan kami",
    },
    {
      id: "layanan",
      title: "Layanan",
      image: ServicesImage,
      route: "/layanan",
      description: "Jelajahi layanan pengadaan/penyewaan Produk IT di kami",
    },
    {
      id: "tentang",
      title: "Tentang",
      image: AboutImage,
      route: "/tentang",
      description: "Jelajahi lebih dalam tentang perusahaan kami",
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
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="homepage-hero-section">
        <img
          alt="HR Building Wahid Hasyim"
          className="homepage-hero-image"
          src={KantorImage}
        />
        <div className="homepage-hero-overlay"></div>

        <div className={`homepage-hero-content ${animate ? "animate" : ""}`}>
          <div className="homepage-hero-content-inner">
            <h1 className="homepage-hero-title">
              Solusi Pengadaan
              <span className="homepage-hero-subtitle">Produk IT Terbaik</span>
              <span className="homepage-hero-tagline">untuk Bisnis Anda</span>
            </h1>

            <p className="homepage-hero-description">
              Temukan solusi produk IT terdepan untuk mengembangkan bisnis Anda
              bersama PT Infoduta Computindo Perkasa. Jelajahi produk dan
              layanan kami sekarang!
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={handleExploreClick}
                className="explore-button"
                aria-label="Jelajahi layanan kami"
              >
                <span>Jelajahi Sekarang</span>
                <img
                  className="floating-arrow"
                  style={{ width: "1.25rem", height: "1.25rem" }}
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
        className={`main-content ${scrollAnimate ? "scroll-animate" : ""}`}
      >
        <div className="container-2">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">
              Jelajahi <span className="section-title-accent">Infoduta</span>
            </h2>
            <div className="section-divider"></div>
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
                onClick={() => navigate(item.route)}
                className="card"
                style={{
                  opacity: scrollAnimate ? 1 : 0,
                  transform: scrollAnimate
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition: `all 0.8s ease-out ${index * 0.2}s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                {/* Background Pattern */}
                <div className="card-pattern-1"></div>
                <div className="card-pattern-2"></div>

                <div className="card-content">
                  {/* Icon Container */}
                  <div className="card-icon-container">
                    <img
                      alt={`${item.title} icon`}
                      className="card-icon"
                      src={item.image}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>

                  {/* Call to Action */}
                  <div className="card-cta">
                    <span>Pelajari Lebih Lanjut</span>
                    <svg
                      className="card-arrow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
