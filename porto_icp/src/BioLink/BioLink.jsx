import React from "react";
import "./biolink.css";

import logoICP from "../assets/infoduta.png";
import kantorICP from "../assets/kantor_hr.webp";

import { Helmet } from "react-helmet";

// import icon dari react-icons
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillProduct,
  AiFillCustomerService,
  AiOutlineInfo,
} from "react-icons/ai";

import { FaTiktok, FaWhatsapp } from "react-icons/fa";

import { MdOutlineWork } from "react-icons/md";

export default function BioLinks() {
  const websiteLinks = [
    {
      name: "Produk",
      url: "https://www.infoduta.com/produk",
      icon: <AiFillProduct />,
      color: "#6C5CE7",
      description: "Jelajahi produk kami",
    },
    {
      name: "Layanan",
      url: "https://www.infoduta.com/layanan",
      icon: <AiFillCustomerService />,
      color: "#00B894",
      description: "Layanan yang kami tawarkan",
    },
    {
      name: "Tentang kami",
      url: "https://www.infoduta.com/tentang",
      icon: <AiOutlineInfo />,
      color: "#FF6B6B",
      description: "Pelajari lebih lanjut tentang kami",
    },
    {
      name: "Karir",
      url: "https://www.infoduta.com/karir",
      icon: <MdOutlineWork />,
      color: "#FFA726",
      description: "Gabung bersama tim kami",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/infoduta_computindo",
      icon: <AiFillInstagram />,
      color: "#E4405F",
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@infoduta_computind0",
      icon: <FaTiktok />,
      color: "#000000",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@infoduta_computindo",
      icon: <AiFillYoutube />,
      color: "#FF0000",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/ptinfodutacp",
      icon: <AiOutlineTwitter />,
      color: "#1DA1F2",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/search/results/all/?keywords=PT%20Infoduta%20Computindo%20Perkasa&origin=GLOBAL_SEARCH_HEADER&sid=Sbs",
      icon: <AiFillLinkedin />,
      color: "#0077B5",
    },
    {
      name: "Hubungi Kami",
      url: `https://wa.me/6285545031039?text=${encodeURIComponent(`Saya ingin menghubungi PT Infoduta Computindo Perkasa untuk informasi lebih lanjut. Apakah bisa?`)}`,
      icon: <FaWhatsapp />,
      color: "#333333",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Telusuri Kami | Infoduta Computindo Perkasa</title>
        <meta
          name="description"
          content="Kunjungi website dan sosial media resmi PT Infoduta Computindo Perkasa."
        />
        <meta
          name="keywords"
          content="Infoduta, Infoduta Computindo Perkasa, BioLink Infoduta, Sosial Media Infoduta, Website Resmi Infoduta, Produk IT, Layanan IT, Karir IT, Tentang Infoduta"
        />
        <meta name="author" content="PT Infoduta Computindo Perkasa" />
        <link rel="canonical" href="https://infoduta.co.id/biolink" />
        <meta
          property="og:title"
          content="BioLink | Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Kunjungi website dan sosial media resmi PT Infoduta Computindo Perkasa."
        />
        <meta property="og:image" content="/api/og-image/biolink" />
        <meta property="og:url" content="https://infoduta.co.id/biolink" />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="bio-wrapper">
        {/* Background with city overlay */}
        {/* Background with kantor ICP */}
        <div
          className="background-container"
          style={{
            backgroundImage: `url(${kantorICP})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="overlay"></div>
        </div>

        {/* Floating particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Main content */}
        <div className="bio-container">
          {/* Profile section */}
          <div className="profile-section">
            <div className="profile-image-wrapper">
              <div className="profile-ring"></div>
              <img
                src={logoICP}
                alt="Developer Infoduta"
                className="profile-image"
              />
              <div className="online-indicator"></div>
            </div>

            <div className="profile-info">
              <h1 className="profile-name">PT Infoduta Computindo Perkasa</h1>
              <p className="profile-title">
                Solusi Hardware dan Software Pilihan Bisnis Anda
              </p>
              <p className="profile-description">
                Menyediakan produk Hardware, Software,
                <br />
                Laptop, Smartphone, Server, dan Komputer dengan layanan purna
                jual terbaik.
              </p>
              <p className="profile-location">
                📍 Jl. KH. Wahid Hasyim No. 5 RT.12/RW.9. Kb. Sirih, Kec.
                Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta.
                10340.
              </p>
            </div>
          </div>

          {/* Website Links Section */}
          <div className="bio-section-header">
            <div className="bio-section-icon">🌐</div>
            <h2 className="bio-section-title">Kunjungi Website Kami</h2>
            <div className="bio-section-divider"></div>
          </div>

          <div className="links-grid website-links">
            {websiteLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="website-link"
                style={{ "--hover-color": link.color }}
              >
                <div className="link-icon">{link.icon}</div>
                <div className="link-content">
                  <span className="link-text">{link.name}</span>
                  <span className="link-description">{link.description}</span>
                </div>
                <div className="link-arrow">→</div>
              </a>
            ))}
          </div>

          {/* Social Media Section */}
          <div className="bio-section-header">
            <div className="bio-section-icon">📱</div>
            <h2 className="bio-section-title">Ikuti Sosial Media Kami</h2>
            <div className="bio-section-divider"></div>
          </div>

          <div className="links-grid social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ "--hover-color": link.color }}
              >
                <div className="link-icon">{link.icon}</div>
                <span className="link-text">{link.name}</span>
                <div className="link-arrow">→</div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="bio-footer">
            <p>© 2025 PT Infoduta Computindo Perkasa</p>
          </div>
        </div>
      </div>
    </>
  );
}
