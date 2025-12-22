import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaUsers,
  FaHandshake,
  FaTrophy,
  FaChevronDown,
} from "react-icons/fa";
import "./tentang.css";

// Import images
import kantorImage from "../assets/kantor_icp(landscape1).webp";
import strukturImage from "../assets/struktur_keorganisasian_icp.png";
import dellLogo from "../assets/Dell_logo.png";
import lenovoLogo from "../assets/lenovo_logo.png";
import ciscoLogo from "../assets/Cisco_logo.png";
import microsoftLogo from "../assets/microsoft_logo.png";
import asusLogo from "../assets/Asus_logo.png";
import samsungLogo from "../assets/samsung_logo.png";
import hpLogo from "../assets/hp_logo.png";
import appleLogo from "../assets/Apple_logo.png";
import wdLogo from "../assets/wd_logo.png";
import infocusLogo from "../assets/Infocus_logo.png";
import pertaminaLogo from "../assets/pertamina_logo.png";
import telkomLogo from "../assets/Telkom_logo.png";
import tmLogo from "../assets/TM_logo.png";
import plnLogo from "../assets/pln_logo.png";

// Import components
import FAQ from "./faq";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import KontakContainer from "./kontakContainer";

import { Helmet } from "react-helmet";

function Tentang() {
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const brandLogos = [
    { src: dellLogo, alt: "Dell" },
    { src: lenovoLogo, alt: "Lenovo" },
    { src: ciscoLogo, alt: "Cisco" },
    { src: microsoftLogo, alt: "Microsoft" },
    { src: asusLogo, alt: "Asus" },
    { src: samsungLogo, alt: "Samsung" },
    { src: hpLogo, alt: "HP" },
    { src: appleLogo, alt: "Apple" },
    { src: wdLogo, alt: "WD" },
    { src: infocusLogo, alt: "InFocus" },
  ];

  const partnerLogos = [
    { src: pertaminaLogo, alt: "Pertamina" },
    { src: telkomLogo, alt: "Telkom Indonesia" },
    { src: tmLogo, alt: "TM" },
    { src: plnLogo, alt: "PLN" },
  ];

  useEffect(() => {
    if (!showMainContent) {
      // Matikan scroll
      document.body.style.overflow = "hidden";
    } else {
      // Aktifkan kembali scroll
      document.body.style.overflow = "auto";
    }

    // Cleanup saat component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMainContent]);

  const handleScrollToContent = () => {
    setShowMainContent(true);
    // Scroll ke posisi 0 (top) terlebih dahulu
    window.scrollTo({ top: 0, behavior: "auto" });

    // Kemudian scroll ke section tentang kami
    setTimeout(() => {
      const aboutSection = document.querySelector(".tentang-section-about");
      if (aboutSection) {
        const navbarHeight = 70; // Adjust sesuai tinggi navbar Anda
        const elementPosition = aboutSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Tentang Kami | PT Infoduta Computindo Perkasa</title>
        <meta
          name="description"
          content="Pelajari lebih lanjut tentang PT Infoduta Computindo Perkasa, perusahaan IT terpercaya yang telah melayani klien selama lebih dari 29 tahun dengan solusi teknologi informasi terbaik."
        />
        <meta
          name="keywords"
          content="Tentang Infoduta, Visi Misi Infoduta, Struktur Organisasi Infoduta, Brand Partner Infoduta, Rekan Kerja Infoduta, Perusahaan IT Indonesia"
        />
        <link rel="canonical" href="https://www.infoduta.com/tentang" />
      </Helmet>

      <div className="tentang-page">
        {/* Hero Section - Full Screen */}
        <section
          className={`tentang-hero homepage-hero-section ${showMainContent ? "tentang-hero-hidden" : ""}`}
        >
          <div className="tentang-hero-overlay"></div>
          <img
            src={kantorImage}
            alt="Kantor PT Infoduta Computindo Perkasa"
            className="tentang-hero-image"
          />
          <div className="tentang-hero-content">
            <h1 className="tentang-hero-title">Tentang Infoduta</h1>
            <p className="tentang-hero-subtitle">
              Komitmen dan Sinergi Kami untuk memberikan Solusi Kebutuhan Produk
              IT Bisnis Anda
            </p>
            <button
              className="tentang-hero-button"
              onClick={handleScrollToContent}
            >
              Jelajahi Kami
            </button>

            <div className="tentang-hero-stats">
              <div className="tentang-stat-item">
                <div className="tentang-stat-label">Melayani</div>
                <div className="tentang-stat-value">29+</div>
                <div className="tentang-stat-desc">Tahun</div>
              </div>
              <div className="tentang-stat-item">
                <div className="tentang-stat-label">Dengan</div>
                <div className="tentang-stat-value">100+</div>
                <div className="tentang-stat-desc">Klien Terpercaya</div>
              </div>
              <div className="tentang-stat-item">
                <div className="tentang-stat-label">Layanan Penuh</div>
                <div className="tentang-stat-value">24/7</div>
                <div className="tentang-stat-desc">Konsultasi</div>
              </div>
            </div>
          </div>

          <div
            className="tentang-scroll-indicator"
            onClick={handleScrollToContent}
          >
            <FaChevronDown />
          </div>
        </section>

        {/* Main Content */}
        <div
          className={`tentang-main-content ${showMainContent ? "tentang-main-content-visible" : ""}`}
        >
          {/* Tentang Kami Section */}
          <section className="tentang-section-about">
            <div className="tentang-container">
              <div className="tentang-section-layout">
                <div className="tentang-section-left">
                  <h2 className="tentang-section-title">Tentang Kami</h2>
                  <div className="tentang-title-divider"></div>
                </div>
                <div className="tentang-section-right">
                  <div className="tentang-text-content">
                    <p>
                      <strong>PT Infoduta Computindo Perkasa</strong> adalah
                      perusahaan yang bergerak di bidang Teknologi Informasi
                      (IT), yang menyediakan layanan pengadaan serta penyewaan
                      produk IT (hardware, software, dan produk pendukung
                      lainnya). Selain itu, Infoduta juga memberikan layanan
                      pemeliharaan dan dukungan teknis untuk memastikan
                      operasional sistem IT pada setiap klien berjalan optimal.
                      Saat ini, PT Infoduta Computindo Perkasa telah dipercaya
                      oleh berbagai perusahaan terkemuka di Indonesia sebagai
                      mitra dalam pemenuhan kebutuhan teknologi informasi.
                    </p>
                    <p>
                      <strong>PT Infoduta Computindo Perkasa</strong> telah
                      berdiri sejak tahun 1996 hingga saat ini, dan telah
                      dipercaya sebagai mitra tetap produk IT di perusahaan
                      besar di Indonesia seperti: Pertamina Group, Telkom Group,
                      Telkom Malaysia, Perbankan, dan perusahaan-perusahaan
                      swasta lainnya.
                    </p>
                    <p>
                      <strong>PT Infoduta Computindo Perkasa</strong> memiliki
                      team solid yang selalu siap dalam memberikan layanan
                      terbaik untuk mendukung setiap proses bisnis perusahaan
                      Anda dengan orientasi solusi dan pelayanan maksimal. Kami
                      menyediakan produk-produk dari brand high-end dengan harga
                      yang sangat terjangkau. Kami menjual produk-produk IT
                      seperti Laptop, PC, Printer, UPS, Server, Software,
                      Hardware serta sparepart dari berbagai macam brand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visi Misi Section */}
          <section className="tentang-section-visi-misi">
            <div className="tentang-container">
              <div className="tentang-section-layout">
                <div className="tentang-section-left">
                  <h2 className="tentang-section-title">Visi dan Misi Kami</h2>
                  <div className="tentang-title-divider"></div>
                </div>
                <div className="tentang-section-right">
                  <div className="tentang-visi-misi-content">
                    <div className="tentang-visi-box">
                      <h3>Visi</h3>
                      <p>
                        Menjadi Perusahaan Vendor Produk Teknologi Informasi
                        (IT) terbaik yang berguna dalam mendukung proses
                        pengembangan bisnis perusahaan klien kami.
                      </p>
                    </div>
                    <div className="tentang-misi-box">
                      <h3>Misi</h3>
                      <ol>
                        <li>
                          Memberikan solusi serta pelayanan yang cepat, hangat
                          dan proses transaksi dengan mudah.
                        </li>
                        <li>
                          Jaminan layanan purna jual (After sales service).
                        </li>
                        <li>
                          Memiliki Teknisi komputer professional yang selalu
                          siap dalam memperbaiki produk IT yang bermasalah.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Struktur Organisasi Section */}
          <section className="tentang-section-struktur">
            <div className="tentang-container">
              <div className="tentang-section-layout">
                <div className="tentang-section-left">
                  <h2 className="tentang-section-title">Struktur Organisasi</h2>
                  <div className="tentang-title-divider"></div>
                </div>
                <div className="tentang-section-right">
                  <div className="tentang-struktur-image-wrapper">
                    <img
                      src={strukturImage}
                      alt="Struktur Organisasi PT Infoduta Computindo Perkasa"
                      className="tentang-struktur-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Partner Section */}
          <section className="tentang-section-brands">
            <div className="tentang-container">
              <div className="tentang-section-layout">
                <div className="tentang-section-left">
                  <h2 className="tentang-section-title">
                    Brand Partner Support
                  </h2>
                  <div className="tentang-title-divider"></div>
                </div>
                <div className="tentang-section-right">
                  <div className="tentang-brands-grid">
                    {brandLogos.map((brand, index) => (
                      <div key={index} className="tentang-brand-item">
                        <img src={brand.src} alt={brand.alt} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rekan Kerja Section */}
          <section className="tentang-section-partners">
            <div className="tentang-container">
              <div className="tentang-section-layout">
                <div className="tentang-section-left">
                  <h2 className="tentang-section-title">
                    Rekan Kerja Perusahaan
                  </h2>
                  <div className="tentang-title-divider"></div>
                </div>
                <div className="tentang-section-right">
                  <div className="tentang-partners-grid">
                    {partnerLogos.map((partner, index) => (
                      <div key={index} className="tentang-partner-item">
                        <img src={partner.src} alt={partner.alt} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Kontak dan FAQ */}
          <KontakContainer />
          <FAQ />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Tentang;
