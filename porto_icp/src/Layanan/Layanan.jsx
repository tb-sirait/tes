import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  FaCheck,
  FaCogs,
  FaServer,
  FaNetworkWired,
  FaHeadset,
} from "react-icons/fa";
import "./layanan.css";

import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import FAQ from "../Tentang/faq";
import KontakContainer from "../Tentang/kontakContainer";

// Import images
import awardImg from "../assets/layanan/award.png";
import consulItImg from "../assets/layanan/consul_it.png";
import hardwareItImg from "../assets/layanan/hardware_it.png";
import procureItImg from "../assets/layanan/procure_it.png";
import serviceItImg from "../assets/layanan/service_it.png";
import aiGeneratifProduk from "../assets/layanan/ai_generatif_produk.png";
import aiGeneratifService from "../assets/layanan/ai_generatif_service.png";
import aiGeneratifSewa from "../assets/layanan/ai_generatif_sewa.png";

function Layanan() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  const heroImages = [
    { src: awardImg, alt: "Award" },
    { src: consulItImg, alt: "Konsultasi IT" },
    { src: hardwareItImg, alt: "Hardware IT" },
    { src: procureItImg, alt: "Procurement IT" },
    { src: serviceItImg, alt: "Service IT" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Hero text fade in animation
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
      setOverlayOpacity(0.5);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const services = [
    {
      icon: <FaCogs className="services-icon-svg" />,
      title: "Konsultasi IT",
      description:
        "Solusi konsultasi teknologi informasi terpadu untuk mengoptimalkan infrastruktur bisnis Anda",
      features: [
        "Analisis Kebutuhan",
        "Perencanaan Strategis",
        "Implementasi Solusi",
      ],
    },
    {
      icon: <FaServer className="services-icon-svg" />,
      title: "Hardware IT",
      description:
        "Penyediaan perangkat keras IT berkualitas tinggi dengan spesifikasi sesuai kebutuhan bisnis",
      features: ["Server Enterprise", "Workstation", "Networking Equipment"],
    },
    {
      icon: <FaNetworkWired className="services-icon-svg" />,
      title: "Procurement IT",
      description:
        "Layanan pengadaan perangkat IT dengan proses yang efisien dan harga kompetitif",
      features: ["Vendor Management", "Cost Optimization", "Quality Assurance"],
    },
    {
      icon: <FaHeadset className="services-icon-svg" />,
      title: "Service IT",
      description:
        "Dukungan teknis dan maintenance komprehensif untuk menjaga performa optimal sistem IT",
      features: ["24/7 Support", "Preventive Maintenance", "Remote Assistance"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Layanan | Infoduta Computindo Perkasa</title>
        <meta
          name="description"
          content="Infoduta hadir sebagai solusi untuk bisnis anda dengan melayani Pengadaan atau Penyewaan Produk IT."
        />
        <meta
          name="keywords"
          content="Layanan IT, Konsultasi IT, Hardware IT, Procurement IT, Service IT, Solusi Teknologi Informasi, Infrastruktur Bisnis, Perangkat Keras IT, Pengadaan Perangkat IT, Dukungan Teknis IT"
        />
        <meta name="author" content="PT Infoduta Computindo Perkasa" />
        <link rel="canonical" href="https://infoduta.co.id/layanan" />
      </Helmet>

      <Navbar />

      {/* Hero Page Section */}
      <div className="services-hero-page home-hero-section">
        <div
          className="services-hero-overlay"
          style={{ opacity: overlayOpacity }}
        ></div>

        <div className="services-hero-content-wrapper">
          {/* Left Group - Text Content */}
          <div
            className={`services-hero-text-group ${isHeroVisible ? "services-hero-visible" : ""}`}
          >
            <h1 className="services-hero-title">Layanan Kami</h1>
            <div className="services-hero-divider"></div>
            <p className="services-hero-subtitle">
              Infoduta hadir sebagai solusi untuk bisnis anda dengan melayani
              Pengadaan atau Penyewaan Produk IT.
            </p>
            <button
              className="services-hero-cta"
              onClick={() => scrollToSection("services-navigation")}
            >
              Jelajahi Layanan
            </button>
          </div>

          {/* Right Group - Image Slider */}
          <div
            className={`services-hero-slider-group ${isHeroVisible ? "services-hero-visible" : ""}`}
          >
            <div className="services-hero-slideshow">
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`services-hero-slide ${
                    index === currentSlide ? "services-slide-active" : ""
                  }`}
                />
              ))}
            </div>

            {/* Controls outside the image */}
            <div className="services-hero-controls">
              <button
                className="services-hero-nav services-hero-nav-prev"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                {"<"}
              </button>

              <div className="services-hero-indicators">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`services-hero-indicator ${
                      index === currentSlide ? "services-indicator-active" : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="services-hero-nav services-hero-nav-next"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="services-main-content">
        {/* Navigation Section */}
        <section
          id="services-navigation"
          className="services-navigation-section"
        >
          <h2 className="services-section-title">
            Apa Saja Layanan yang Kami Sediakan?
          </h2>
          <div className="services-navigation-grid">
            <button
              className="services-nav-card"
              onClick={() => scrollToSection("services-pengadaan")}
            >
              <div className="services-nav-image-wrapper">
                <img
                  src={aiGeneratifProduk}
                  alt="Pengadaan dan Penjualan Produk IT"
                  className="services-nav-image"
                />
              </div>
              <h3 className="services-nav-title">
                Pengadaan dan Penjualan Produk IT
              </h3>
            </button>

            <button
              className="services-nav-card"
              onClick={() => scrollToSection("services-penyewaan")}
            >
              <div className="services-nav-image-wrapper">
                <img
                  src={aiGeneratifSewa}
                  alt="Penyewaan Produk IT"
                  className="services-nav-image"
                />
              </div>
              <h3 className="services-nav-title">Penyewaan Produk IT</h3>
            </button>

            <button
              className="services-nav-card"
              onClick={() => scrollToSection("services-purnajual")}
            >
              <div className="services-nav-image-wrapper">
                <img
                  src={aiGeneratifService}
                  alt="Layanan Purna Jual"
                  className="services-nav-image"
                />
              </div>
              <h3 className="services-nav-title">Layanan Purna Jual</h3>
            </button>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="services-grid-section">
          <h2 className="services-section-title">Layanan Kami</h2>
          <div className="services-cards-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="services-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="services-card-icon">{service.icon}</div>
                <h3 className="services-card-title">{service.title}</h3>
                <p className="services-card-description">
                  {service.description}
                </p>
                <ul className="services-card-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="services-feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pengadaan Section */}
        <section id="services-pengadaan" className="services-detail-section">
          <div className="services-detail-container">
            <div className="services-detail-content">
              <h2 className="services-detail-title">
                Pengadaan dan Penjualan Produk IT
              </h2>
              <p className="services-detail-text">
                Infoduta menyediakan layanan penjualan dan pengadaan produk IT
                terkini, mulai dari perangkat keras komputer, server, hingga
                berbagai solusi jaringan dan teknologi informasi. Kami
                berkomitmen memberikan produk berkualitas dengan harga
                kompetitif yang dapat memenuhi kebutuhan bisnis Anda.
              </p>
              <div className="services-detail-badges">
                <span className="services-badge services-badge-green">
                  Produk Terbaru
                </span>
                <span className="services-badge services-badge-blue">
                  Garansi Resmi
                </span>
              </div>
            </div>
            <div className="services-detail-image-wrapper">
              <img
                src={aiGeneratifProduk}
                alt="Penjualan dan Pengadaan Produk IT"
                className="services-detail-image"
              />
            </div>
          </div>
        </section>

        {/* Penyewaan Section */}
        <section
          id="services-penyewaan"
          className="services-detail-section services-detail-reverse"
        >
          <div className="services-detail-container">
            <div className="services-detail-image-wrapper">
              <img
                src={aiGeneratifSewa}
                alt="Penyewaan Produk IT"
                className="services-detail-image"
              />
            </div>
            <div className="services-detail-content">
              <h2 className="services-detail-title">Penyewaan Produk IT</h2>
              <p className="services-detail-text">
                Butuh solusi IT jangka pendek tanpa harus membeli? Infoduta
                menawarkan layanan penyewaan produk IT berkualitas tinggi, mulai
                dari laptop, server, hingga perangkat jaringan. Dengan layanan
                kami, Anda dapat mengakses teknologi terbaru sesuai kebutuhan
                bisnis Anda tanpa beban investasi besar.
              </p>
              <div className="services-detail-badges">
                <span className="services-badge services-badge-purple">
                  Fleksibel
                </span>
                <span className="services-badge services-badge-orange">
                  Hemat Biaya
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Purna Jual Section */}
        <section id="services-purnajual" className="services-detail-section">
          <div className="services-detail-container">
            <div className="services-detail-content">
              <h2 className="services-detail-title">
                Layanan Purnajual Unggulan
              </h2>
              <p className="services-detail-text">
                Sebagai bentuk komitmen kami terhadap kualitas dan kepuasan
                pelanggan, layanan purnajual Infoduta menyediakan:
              </p>
              <ul className="services-detail-list">
                <li className="services-detail-list-item">
                  <FaCheck className="services-detail-check" />
                  <div>
                    <strong>Servis Bergaransi:</strong> Produk IT yang Anda beli
                    atau sewa dilengkapi dengan jaminan Servis bergaransi (baik
                    dari Supplier ataupun dari Kami).
                  </div>
                </li>
                <li className="services-detail-list-item">
                  <FaCheck className="services-detail-check" />
                  <div>
                    <strong>Konsultasi Alat IT Gratis:</strong> Kami menyediakan
                    konsultasi produk untuk kebutuhan proyek pada Bisnis anda
                    dengan produk IT yang sesuai.
                  </div>
                </li>
                <li className="services-detail-list-item">
                  <FaCheck className="services-detail-check" />
                  <div>
                    <strong>Pengiriman dan Instalasi:</strong> Kami siap
                    membantu pengiriman dan instalasi produk IT di lokasi Anda,
                    memastikan Produk IT yang anda beli dapat berjalan dengan
                    lancar dan sesuai dengan kebutuhan Anda.
                  </div>
                </li>
                <li className="services-detail-list-item">
                  <FaCheck className="services-detail-check" />
                  <div>
                    <strong>Pelatihan Penggunaan:</strong> Kami siap membantu
                    Anda dengan memberikan informasi cara penggunaan dan
                    pemanfaatan Produk IT yang Anda
                  </div>
                </li>
              </ul>
            </div>
            <div className="services-detail-image-wrapper">
              <img
                src={aiGeneratifService}
                alt="Layanan Purnajual Unggulan"
                className="services-detail-image"
              />
            </div>
          </div>
        </section>
        <FAQ />
      </main>

      <Footer />
    </>
  );
}

export default Layanan;
