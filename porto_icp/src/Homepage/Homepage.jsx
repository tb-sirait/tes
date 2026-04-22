import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../Navigation/footer";
import Navbar from "../Navigation/Navbar";
import "./homepage.css";

import { X } from "lucide-react";

// Images
import KantorImage from "../assets/kantor_icp(landscape1).webp";
import WorkstationImage from "../assets/Workstation.png";
import ServicesImage from "../assets/Services.png";
import AboutImage from "../assets/About.png";
import IklanImage from "../assets/iklan.png"; // Import gambar iklan Anda

function Homepage() {
  const navigate = useNavigate();
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [contentVisible, setContentVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false); // State untuk tombol close
  const [isClosing, setIsClosing] = useState(false); // State untuk animasi close
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

    // Tampilkan modal iklan setelah 2 detik
    const adTimer = setTimeout(() => {
      setShowAdModal(true);
    }, 2000);

    // Tampilkan tombol close setelah 4 detik dari modal muncul
    const closeButtonTimer = setTimeout(() => {
      setShowCloseButton(true);
    }, 6000); // 2 detik (modal muncul) + 4 detik = 6 detik total

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(contentTimer);
      clearTimeout(adTimer);
      clearTimeout(closeButtonTimer);
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
              }, index * 200);
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
      mainContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        const targetPosition = mainContentRef.current.offsetTop;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  // Fungsi untuk menutup modal iklan dengan animasi
  const handleCloseAd = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowAdModal(false);
      setIsClosing(false);
      setShowCloseButton(false);
    }, 300); // Durasi animasi
  };

  const navigationItems = [
    {
      id: "tentang",
      title: "Tentang Infoduta",
      image: AboutImage,
      route: "/tentang",
      description:
        "PT Infoduta Computindo Perkasa adalah perusahaan B2B pengadaan produk IT terpercaya di Jakarta Pusat & Jabodetabek, melayani pengadaan hardware, software, server, laptop, komputer, dan sewa perangkat IT untuk kebutuhan bisnis.",
    },
    {
      id: "layanan",
      title: "Layanan Pengadaan IT Kami",
      image: ServicesImage,
      route: "/layanan",
      description:
        "Layanan pengadaan produk IT lengkap — komputer, laptop, server, printer, hardware, dan sparepart — serta jasa sewa perangkat IT dan dukungan teknis untuk bisnis Anda di Jabodetabek.",
    },
    {
      id: "produk",
      title: "Produk IT Infoduta",
      image: WorkstationImage,
      route: "/produk",
      description:
        "Jelajahi katalog pengadaan produk IT kami: komputer, laptop, server, sparepart, printer, dan hardware dari merek ternama. Tersedia layanan jual beli dan sewa perangkat IT untuk kebutuhan bisnis B2B.",
    },
  ];

  return (
    <div className="home-container">
      <Helmet>
        <title>
          PT. Infoduta Computindo Perkasa | Hi-Tech Recommendation for
          Hardware-Software-Service-Rental
        </title>
        <meta
          name="description"
          content="PT Infoduta Computindo Perkasa adalah perusahaan pengadaan produk IT B2B terpercaya di Jakarta Pusat & Jabodetabek. Melayani pengadaan komputer, laptop, server, printer, hardware, sparepart, dan sewa alat IT untuk bisnis Anda."
        />
        <meta
          name="keywords"
          content="pengadaan produk IT, pengadaan komputer, pengadaan laptop, pengadaan server, pengadaan printer, pengadaan hardware, pengadaan sparepart, pengadaan IT B2B, jual beli IT, sewa perangkat IT, perusahaan IT Jakarta, pengadaan IT Jabodetabek, pengadaan IT Jakarta Pusat, PT Infoduta Computindo Perkasa, hi-tech solution hardware software service rental"
        />
        <meta name="author" content="PT Infoduta Computindo Perkasa" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://infoduta.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta
          property="og:title"
          content="PT. Infoduta Computindo Perkasa | Pengadaan Produk IT B2B — Hardware, Software, Server, Laptop"
        />
        <meta
          property="og:description"
          content="Perusahaan pengadaan produk IT B2B terpercaya di Jakarta Pusat & Jabodetabek. Melayani pengadaan komputer, laptop, server, printer, sparepart, dan sewa alat IT."
        />
        <meta
          property="og:image"
          content="https://infoduta.com/og/homepage.jpg"
        />
        <meta property="og:url" content="https://infoduta.com/" />
        <meta property="og:locale" content="id_ID" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PT. Infoduta Computindo Perkasa | Pengadaan Produk IT B2B"
        />
        <meta
          name="twitter:description"
          content="Perusahaan pengadaan produk IT B2B — komputer, laptop, server, hardware, sparepart & sewa IT di Jakarta Pusat & Jabodetabek."
        />
        <meta
          name="twitter:image"
          content="https://infoduta.com/og/homepage.jpg"
        />

        {/* JSON-LD: Organization */}
        <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PT Infoduta Computindo Perkasa",
      "alternateName": "Infoduta",
      "description": "Perusahaan B2B pengadaan produk IT — hardware, software, server, laptop, komputer, sparepart, printer, dan layanan sewa perangkat IT di Jakarta Pusat & Jabodetabek.",
      "url": "https://infoduta.com",
      "logo": "https://infoduta.com/logo.png",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jakarta Pusat",
          "addressRegion": "DKI Jakarta",
          "addressCountry": "ID"
        }
      },
      "areaServed": [
        "Jakarta Pusat", "Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"
      ],
      "knowsAbout": [
        "Pengadaan Komputer", "Pengadaan Laptop", "Pengadaan Server",
        "Pengadaan Printer", "Pengadaan Hardware", "Pengadaan Sparepart",
        "Pengadaan Produk IT B2B", "Sewa Perangkat IT", "Jual Beli IT"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Indonesian"
      },
      "sameAs": []
    }
  `}</script>

        {/* JSON-LD: LocalBusiness (sangat penting untuk SEO lokal Jakarta) */}
        <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "PT Infoduta Computindo Perkasa",
      "description": "Perusahaan pengadaan produk IT B2B di Jakarta Pusat. Menyediakan komputer, laptop, server, hardware, software, sparepart, printer, dan layanan sewa perangkat IT untuk kebutuhan bisnis.",
      "url": "https://infoduta.com",
      "logo": "https://infoduta.com/logo.png",
      "image": "https://infoduta.com/og/homepage.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jakarta Pusat",
        "addressRegion": "DKI Jakarta",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -6.1862,
        "longitude": 106.8310
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": -6.1862,
          "longitude": 106.8310
        },
        "geoRadius": "50000"
      },
      "priceRange": "$$",
      "currenciesAccepted": "IDR",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    }
  `}</script>

        {/* JSON-LD: WebPage */}
        <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PT. Infoduta Computindo Perkasa | Pengadaan Produk IT B2B",
      "description": "Halaman utama PT Infoduta Computindo Perkasa — perusahaan pengadaan produk IT B2B terpercaya di Jakarta Pusat & Jabodetabek.",
      "url": "https://infoduta.com/",
      "inLanguage": "id-ID",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Infoduta Computindo Perkasa",
        "url": "https://infoduta.com"
      },
      "about": {
        "@type": "Organization",
        "name": "PT Infoduta Computindo Perkasa"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://infoduta.com/"
          }
        ]
      }
    }
  `}</script>

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

      {/* Modal Iklan */}
      {showAdModal && (
        <div
          className={`ad-modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={showCloseButton ? handleCloseAd : undefined}
        >
          <div
            className={`ad-modal-content ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close - hanya muncul setelah 4 detik */}
            {showCloseButton && (
              <button className="ad-modal-close" onClick={handleCloseAd}>
                <X size={24} style={{ color: "black" }} />
              </button>
            )}

            {/* Gambar Iklan */}
            <img
              src={IklanImage}
              alt="Iklan Promosi"
              className="ad-modal-image"
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="home-hero-section" id="hero-section">
        <img
          alt="HR Building Wahid Hasyim"
          className="home-hero-image"
          src={KantorImage}
        />
        <div
          className="home-hero-overlay"
          style={{ opacity: overlayOpacity }}
        ></div>

        <div className={`home-hero-content ${contentVisible ? "visible" : ""}`}>
          <div className="home-hero-content-inner">
            <h1 className="home-hero-title">PT. Infoduta Computindo Perkasa</h1>
            <h2 className="home-hero-subtitle">
              Hi-Tech Recommendation for Hardware-Software-Service-Rental
            </h2>
            {/* Tambahkan hidden text untuk SEO tanpa merusak tampilan */}
            <p className="sr-only">
              Pengadaan komputer, laptop, server, printer, hardware, sparepart,
              dan sewa perangkat IT untuk bisnis Anda di Jakarta Pusat, Jakarta,
              Bogor, Depok, Tangerang, dan Bekasi.
            </p>
            <button
              onClick={handleExploreClick}
              className="home-explore-button"
              aria-label="Jelajahi layanan kami"
            >
              Jelajahi Kami Sekarang
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
      <main ref={mainContentRef} className="home-main-content">
        <div className="home-container-2">
          {/* Section Header */}
          <div className="home-section-header">
            <h2 className="home-section-title">Jelajahi Infoduta</h2>
            <p className="home-section-description">
              Lebih dekat dengan perusahaan kami dan temukan produk dan layanan
              sesuai keinginan Anda.
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="home-cards-grid">
            {navigationItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => navigate(item.route)}
                className={`home-card ${cardsVisible[index] ? "home-card-visible" : ""}`}
              >
                {/* Background Pattern */}
                <div className="card-pattern-1"></div>
                <div className="card-pattern-2"></div>
                <div className="card-pattern-3"></div>
                <div className="card-pattern-4"></div>
                {/* Icon Container - di kiri */}
                <div className="home-card-icon-container">
                  <img
                    alt={`${item.title} icon`}
                    className="home-card-icon"
                    src={item.image}
                  />
                </div>

                {/* Content - di kanan */}
                <div className="home-card-content">
                  <h3 className="home-card-title">{item.title}</h3>
                  <p className="home-card-description">{item.description}</p>

                  {/* Call to Action */}
                  <div className="home-card-cta">
                    <span>Selengkapnya</span>
                    <svg
                      className="home-card-arrow"
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
