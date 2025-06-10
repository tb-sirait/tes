import React, { useEffect } from "react";
import { FaEnvelope, FaWhatsapp, FaPhone, FaMapMarkerAlt, FaUsers, FaHandshake, FaTrophy } from 'react-icons/fa';
import FAQ from "./faq";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import KontakContainer from "./kontakContainer";
import "./tentang.css";

import { activateScrollAnimation } from "./scrollAnimation";

// Import images
import kantorImage from "../assets/kantor_icp.png";
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

function Tentang() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    activateScrollAnimation();
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
    { src: infocusLogo, alt: "InFocus" }
  ];

  const partnerLogos = [
    { src: pertaminaLogo, alt: "Pertamina" },
    { src: telkomLogo, alt: "Telkom Indonesia" },
    { src: tmLogo, alt: "TM" },
    { src: plnLogo, alt: "PLN" }
  ];

  const achievements = [
    {
      icon: <FaTrophy />,
      title: "29+ Tahun Pengalaman",
      description: "Melayani sejak 1995 hingga kini"
    },
    {
      icon: <FaUsers />,
      title: "100+ Klien Terpercaya",
      description: "Perusahaan besar di Indonesia"
    },
    {
      icon: <FaHandshake />,
      title: "Layanan 24/7",
      description: "Support dan konsultasi penuh"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="tentang">
        {/* Hero Section */}
        <section className="hero-section-ttg">
              <h1 className="hero-title-ttg">PT. Infoduta Computindo Perkasa</h1>
              <p className="hero-subtitle-ttg">"Solusi Kebutuhan Hardware dan Software Pilihan Anda"</p>
          <div className="hero-content-ttg">
            <div className="hero-text-ttg">
              <div className="hero-stats-ttg">
                {achievements.map((achievement, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-icon">{achievement.icon}</div>
                    <div className="stat-content">
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-image-ttg">
              <div className="image-container">
                <img src={kantorImage} alt="Kantor PT Infoduta Computindo Perkasa" />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="container">
            <div className="section-header" style={{marginRight: "70px"}}>
              <h2>Tentang Perusahaan</h2>
              <div className="section-divider"></div>
            </div>
            <div className="about-content">
              <div className="about-text">
                <div className="text-block">
                  <p className="teks-konten">
                    <strong>PT Infoduta Computindo Perkasa</strong> adalah perusahaan yang bergerak di bidang Teknologi Informasi (IT) untuk memenuhi kebutuhan hardware dan software yang dimiliki oleh perusahaan-perusahaan di Indonesia, serta memberikan solusi untuk memenuhi kebutuhan alat IT pada perusahaan-perusahaan tersebut.
                  </p>
                </div>
                <div className="text-block">
                  <p className="teks-konten">
                    <strong>PT Infoduta Computindo Perkasa</strong> telah berdiri sejak tahun 1995 hingga saat ini, dan telah dipercaya sebagai mitra tetap produk IT di perusahaan besar di Indonesia seperti: Pertamina Group, Telkom Group, Telkom Malaysia, Perbankan, dan perusahaan-perusahaan swasta lainnya.
                  </p>
                </div>
                <div className="text-block">
                  <p className="teks-konten">
                    <strong>PT Infoduta Computindo Perkasa</strong> memiliki team solid yang selalu siap dalam memberikan layanan terbaik untuk mendukung setiap proses bisnis perusahaan Anda dengan orientasi solusi dan pelayanan maksimal. Kami menyediakan produk-produk dari brand high-end dengan harga yang sangat terjangkau. Kami menjual produk-produk IT seperti Laptop, PC, Printer, UPS, Server, Software, Hardware serta sparepart dari berbagai macam brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organizational Structure */}
        <section className="struktur-section">
          <div className="container">
            <div className="section-header">
              <h2>Struktur Organisasi</h2>
              <div className="section-divider"></div>
            </div>
          </div>
          <div className="struktur-container">
            <img src={strukturImage} alt="Struktur Organisasi" className="struktur-image" />
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="visi-misi-section">
          <div className="container">
            <div className="section-header">
              <h6 style={{fontSize: "40px", fontWeight: "700"}}>Visi Misi Perusahaan</h6>
              <div className="section-divider"></div>
            </div>
            <div className="visi-misi-content">
              <div className="visi-card">
                <div className="card-header">
                  <h3>Visi</h3>
                </div>
                <div className="card-content">
                  <p>Menjadi Perusahaan Vendor Produk Teknologi Informasi (IT) terbaik yang berguna dalam mendukung proses pengembangan bisnis perusahaan klien kami.</p>
                </div>
              </div>
              <div className="misi-card">
                <div className="card-header">
                  <h3>Misi</h3>
                </div>
                <div className="card-content">
                  <ol>
                    <li>Memberikan solusi serta pelayanan yang cepat, hangat dan proses transaksi dengan mudah.</li>
                    <li>Jaminan layanan purna jual (After sales service).</li>
                    <li>Memiliki Teknisi komputer professional yang selalu siap dalam memperbaiki produk IT yang bermasalah.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Partners */}
        <section className="brand-section">
          <div className="container">
            <div className="section-header">
              <h2>Brand Partner Support</h2>
              <div className="section-divider"></div>
            </div>
          </div>
          <div className="brand-logos">
            {brandLogos.map((brand, index) => (
              <div key={index} className="brand-item">
                <img src={brand.src} alt={brand.alt} />
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="partners-section">
          <div className="container">
            <div className="section-header">
              <h6 style={{fontSize: "40px", fontWeight: "700"}}>Rekan Kerja Perusahaan</h6>
              <div className="section-divider"></div>
            </div>
          </div>
          <div className="partner-logos">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="partner-item">
                <img src={partner.src} alt={partner.alt} />
              </div>
            ))}
          </div>
        </section>
        <KontakContainer />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}

export default Tentang;
