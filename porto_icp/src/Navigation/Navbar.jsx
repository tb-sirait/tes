import "./navbar.css";
import React, { useState, useEffect } from "react";
import logoICP from "../assets/logo_icp.svg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector(".home-hero-section");

    if (heroSection) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio < 0.3) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        },
        {
          threshold: [0, 0.3, 0.5, 0.7, 1.0],
          rootMargin: "0px",
        },
      );

      observer.observe(heroSection);

      return () => {
        observer.disconnect();
      };
    } else {
      setIsScrolled(true);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Reset dropdown saat menu ditutup
    if (menuOpen) {
      setDropdownVisible(false);
    }
  };

  const toggleDropdown = (e) => {
    // Stop propagation agar tidak trigger link
    e.preventDefault();
    e.stopPropagation();
    console.log("Toggle dropdown, current state:", dropdownVisible);
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownEnter = () => {
    // Hanya untuk desktop - set state untuk sinkronisasi
    if (window.innerWidth > 1024) {
      setDropdownVisible(true);
    }
  };

  const handleDropdownLeave = () => {
    // Hanya untuk desktop - set state untuk sinkronisasi
    if (window.innerWidth > 1024) {
      setDropdownVisible(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownVisible(false);
  };

  return (
    <div
      className={`navbar ${isScrolled ? "navbar-scrolled" : "navbar-hero"}`}
      style={
        !isScrolled
          ? {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }
          : {
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }
      }
    >
      <div className="navbar-container">
        <a href="/" className="logo-with-text" onClick={closeMenu}>
          <img src={logoICP} alt="Logo ICP" className="logo" />
          <div className="teks">
            <p
              className="nick-name"
              style={{ color: isScrolled ? "#1f2937" : "white" }}
            >
              Infoduta
            </p>
            <p
              className="nick-name"
              style={{ color: isScrolled ? "#1f2937" : "white" }}
            >
              Computindo Perkasa
            </p>
          </div>
        </a>

        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{ color: isScrolled ? "#1f2937" : "white" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className="nav-menu">
          <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={closeMenu}
                style={{ color: isScrolled ? "#1f2937" : "white" }}
              >
                Beranda
              </a>
            </li>

            <li
              className="nav-item dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="dropdown-toggle-wrapper">
                <a
                  className="nav-link"
                  href="/produk"
                  style={{ color: isScrolled ? "#1f2937" : "white" }}
                >
                  Produk
                </a>
                <button
                  className="dropdown-arrow-btn"
                  onClick={toggleDropdown}
                  aria-label="Toggle dropdown produk"
                  style={{ color: isScrolled ? "#1f2937" : "white" }}
                >
                  {dropdownVisible ? "▲" : "▼"}
                </button>
              </div>
              <ul
                className={`dropdown-menu ${dropdownVisible ? "show" : ""}`}
                style={{ display: dropdownVisible ? "block" : "none" }}
              >
                <li>
                  <a href="/produk/software" onClick={closeMenu}>
                    Software
                  </a>
                </li>
                <li>
                  <a href="/produk/hardware" onClick={closeMenu}>
                    Hardware
                  </a>
                </li>
                <li>
                  <a href="/produk/sparepart" onClick={closeMenu}>
                    Sparepart
                  </a>
                </li>
                <li>
                  <a href="/produk/Computer" onClick={closeMenu}>
                    Komputer
                  </a>
                </li>
                <li>
                  <a href="/produk/laptop" onClick={closeMenu}>
                    Laptop
                  </a>
                </li>
                <li>
                  <a href="/produk/smartphone" onClick={closeMenu}>
                    Smartphone
                  </a>
                </li>
                <li>
                  <a href="/produk/server" onClick={closeMenu}>
                    Server
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/layanan"
                onClick={closeMenu}
                style={{ color: isScrolled ? "#1f2937" : "white" }}
              >
                Layanan
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/tentang"
                onClick={closeMenu}
                style={{ color: isScrolled ? "#1f2937" : "white" }}
              >
                Tentang
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/karir"
                onClick={closeMenu}
                style={{ color: isScrolled ? "#1f2937" : "white" }}
              >
                Karir
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
