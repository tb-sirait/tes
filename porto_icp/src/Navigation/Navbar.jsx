import React, { useState } from 'react';
import './navbar.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Navbar () {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-with-text" onClick={() => setMenuOpen(false)}>
        <img
          alt="null"
          src="logo_icp.svg"
          width="50"
          height="50"
        />
        <div className="teks">
          <p className='nick-name'>Infoduta</p>
          <p className='nick-name'>Computindo Perkasa</p>
        </div>
      </Link>
      <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
        &#9776;
      </button>
      <nav>
        <ul className={`container ${menuOpen ? 'open' : 'closed'}`}>
          <li className="item-navbar">
            <Link className="item-hover" to="/" onClick={() => setMenuOpen(false)}>
              Beranda
            </Link>
          </li>
          <li className="item-navbar">
            <Link className="item-hover" to="/produk" onClick={() => setMenuOpen(false)}>
              Produk
            </Link>
          </li>
          <li className="item-navbar">
            <Link className="item-hover" to="/layanan" onClick={() => setMenuOpen(false)}>
              Layanan
            </Link>
          </li>
          <li className="item-navbar">
            <Link className="item-hover" to="/tentang" onClick={() => setMenuOpen(false)}>
              Tentang
            </Link>
          </li>
          <li className="item-navbar">
            <Link className="item-hover" to="/karir" onClick={() => setMenuOpen(false)}>
              Karir
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};


export default Navbar;
