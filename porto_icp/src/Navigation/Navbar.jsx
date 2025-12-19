import "./navbar.css";
import React, { useState, useEffect } from "react";
import logoICP from "../assets/logo_icp.svg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Gunakan Intersection Observer untuk detect hero section
    const heroSection = document.querySelector('.homepage-hero-section');
    
    if (heroSection) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Ketika hero section TIDAK terlihat (keluar dari viewport)
          // berarti user sudah scroll melewati hero
          console.log('Hero visible:', entry.isIntersecting, 'Intersection ratio:', entry.intersectionRatio);
          
          // Jika hero section kurang dari 30% terlihat, set scrolled = true
          if (entry.intersectionRatio < 0.3) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        },
        {
          // Threshold: trigger saat 30% hero masih terlihat
          threshold: [0, 0.3, 0.5, 0.7, 1.0],
          rootMargin: '0px'
        }
      );

      observer.observe(heroSection);

      return () => {
        observer.disconnect();
      };
    } else {
      // Jika tidak ada hero section, set scrolled = true (halaman lain)
      setIsScrolled(true);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDropdownEnter = () => {
    setDropdownVisible(true);
  };

  const handleDropdownLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div 
      className={`navbar ${isScrolled ? "navbar-scrolled" : "navbar-hero"}`}
      style={!isScrolled ? {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      } : {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="navbar-container">
        <a
          href="/"
          className="logo-with-text"
          onClick={() => setMenuOpen(false)}
        >
          <img src={logoICP} alt="Logo ICP" className="logo" />
          <div className="teks">
            <p 
              className="nick-name"
              style={{ color: isScrolled ? '#1f2937' : 'white' }}
            >
              Infoduta
            </p>
            <p 
              className="nick-name"
              style={{ color: isScrolled ? '#1f2937' : 'white' }}
            >
              Computindo Perkasa
            </p>
          </div>
        </a>

        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{ color: isScrolled ? '#1f2937' : 'white' }}
        >
          &#9776;
        </button>

        <nav className="nav-menu">
          <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{ color: isScrolled ? '#1f2937' : 'white' }}
              >
                Beranda
              </a>
            </li>

            <li
              className="nav-item dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <a 
                className="nav-link" 
                href="/produk"
                style={{ color: isScrolled ? '#1f2937' : 'white' }}
              >
                Produk
              </a>
              <ul className={`dropdown-menu ${dropdownVisible ? "show" : ""}`}>
                <li>
                  <a href="/produk/software">Software</a>
                </li>
                <li>
                  <a href="/produk/hardware">Hardware</a>
                </li>
                <li>
                  <a href="/produk/sparepart">Sparepart</a>
                </li>
                <li>
                  <a href="/produk/Computer">Komputer</a>
                </li>
                <li>
                  <a href="/produk/laptop">Laptop</a>
                </li>
                <li>
                  <a href="/produk/smartphone">Smartphone</a>
                </li>
                <li>
                  <a href="/produk/server">Server</a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/layanan"
                onClick={() => setMenuOpen(false)}
                style={{ color: isScrolled ? '#1f2937' : 'white' }}
              >
                Layanan
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/tentang"
                onClick={() => setMenuOpen(false)}
                style={{ color: isScrolled ? '#1f2937' : 'white' }}
              >
                Tentang
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/karir"
                onClick={() => setMenuOpen(false)}
                style={{ color: isScrolled ? '#1f2937' : 'white' }}
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