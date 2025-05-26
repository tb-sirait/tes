import './navbar.css'
import React, { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    <>
      <div className="navbar">
        <a href="/" className="logo-with-text" onClick={() => setMenuOpen(false)}>
        <img src="../src/assets/logo_icp.svg" alt="Logo ICP" className="logo" />
          <div className="teks">
            <p className='nick-name'>Infoduta</p>
            <p className='nick-name'>Computindo Perkasa</p>
          </div>
        </a>
        
        <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          &#9776;
        </button>
        
        <nav>
          <ul className={`container ${menuOpen ? 'open' : 'closed'}`}>
            <li className="item-navbar">
              <a className="item-hover" href="/" onClick={() => setMenuOpen(false)}>
                Beranda
              </a>
            </li>
            
            <li
              className="dropdown item-navbar"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <a className="item-hover" href="/produk">
                Produk
              </a>
              <ul className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                <li><a href="/produk/software">Software</a></li>
                <li><a href="/produk/hardware">Hardware</a></li>
                <li><a href="/produk/sparepart">Sparepart</a></li>
                <li><a href="/produk/komputer">Komputer</a></li>
                <li><a href="/produk/laptop">Laptop</a></li>
                <li><a href="/produk/smartphone">Smartphone</a></li>
              </ul>
            </li>
            
            <li className="item-navbar">
              <a className="item-hover" href="/layanan" onClick={() => setMenuOpen(false)}>
                Layanan
              </a>
            </li>
            
            <li className="item-navbar">
              <a className="item-hover" href="/tentang" onClick={() => setMenuOpen(false)}>
                Tentang
              </a>
            </li>
            
            <li className="item-navbar">
              <a className="item-hover" href="/karir" onClick={() => setMenuOpen(false)}>
                Karir
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
