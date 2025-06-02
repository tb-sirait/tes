import React from "react"
import { FaEnvelope, FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import FAQ from "./faq"

import Navbar from "../Navigation/Navbar"
import "./tentang.css"
import Footer from "../Navigation/footer"
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

import { useEffect } from "react";

function Tentang() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const message = encodeURIComponent("Selamat pagi Ibu, saya ingin berdiskusi terkait pengadaan alat IT PT Infoduta Computindo Perkasa untuk perusahaan saya. Bisakah kita berdiskusi terlebih dahulu?. Terima kasih!");
  const phoneNumber = "6281314118264";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  const phoneNumber2 = "628975808407";
  const whatsappLink2 = `https://wa.me/${phoneNumber2}?text=${message}`;

  return (
    <>
      <Navbar />
      <div className="Tentang">
        <div className="container" style={{ marginTop: "0px" , display: "flex", flexDirection: "column", alignItems: "center"}}>
          <header className="header">
            <h2>Profil PT. Infoduta Computindo Perkasa</h2>
            <h3>“Solusi Kebutuhan Hardware dan Software Pilihan Anda”</h3>
          </header>

          <div className="about-us" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div className="intro">

              <div className="kantor-overlay-container">
                <img src={kantorImage} alt="Gedung" className="intro-image" style={{width: "300px", height: "auto"}}/>
                <div className="kantor-overlay"></div>
              </div>
              <div className="intro-text">
                <p><strong>PT Infoduta Computindo Perkasa</strong> adalah perusahaan yang bergerak di bidang Teknologi Informasi (IT) untuk memenuhi kebutuhan hardware dan software yang dimiliki oleh perusahaan-perusahaan di Indonesia, serta memberikan solusi untuk memenuhi kebutuhan alat IT pada perusahaan-perusahaan tersebut.</p>
                <p><strong>PT Infoduta Computindo Perkasa</strong> telah berdiri sejak tahun 1995 hingga saat ini, dan telah dipercaya sebagai mitra tetap produk IT di perusahaan besar di Indonesia seperti: Pertamina Group, Telkom Group, Telkom Malaysia, Perbankan, dan perusahaan-perusahaan swasta lainnya.</p>
                <p><strong>PT Infoduta Computindo Perkasa</strong> memiliki team solid yang selalu siap dalam memberikan layanan terbaik untuk mendukung setiap proses bisnis perusahaan Anda dengan orientasi solusi dan pelayanan maksimal. Kami menyediakan produk-produk dari brand high-end dengan harga yang sangat terjangkau. Kami menjual produk-produk IT seperti Laptop, PC, Printer, UPS, Server, Software, Hardware serta sparepart dari berbagai macam brand.</p>
              </div>
            </div>
          </div>

          <div className="struktur-organisasi">
            <img src={strukturImage} alt="Struktur Organisasi" className="struktur-image" />
          </div>

          <section className="brand-support">
            <h3>Brand Partner Support</h3>
            <div className="brand-logos">
              <img src={dellLogo} alt="Dell" />
              <img src={lenovoLogo} alt="Lenovo" />
              <img src={ciscoLogo} alt="Cisco" />
              <img src={microsoftLogo} alt="Microsoft" />
              <img src={asusLogo} alt="Asus" />
              <img src={samsungLogo} alt="Samsung" />
              <img src={hpLogo} alt="HP" />
              <img src={appleLogo} alt="Apple" />
              <img src={wdLogo} alt="WD" />
              <img src={infocusLogo} alt="InFocus" />
            </div>
          </section>

          <section className="partners">
            <h3>Rekan Kerja Perusahaan</h3>
            <div className="partner-logos" style={{ display: "flex", justifyContent: "space-between", maxWidth: "1200px", gap: "40px", marginBottom: "50px"}}>
              <img src={pertaminaLogo} alt="Pertamina" />
              <img src={telkomLogo} alt="Telkom Indonesia" />
              <img src={tmLogo} alt="TM" />
              <img src={plnLogo} alt="PLN" />
            </div>
          </section>

          <section className="visi-misi" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h3>Visi Misi Perusahaan</h3>
            <div className="visi-misi-content" style={{ display: "flex", justifyContent: "space-between", width: "fi", maxWidth: "1200px", gap: "40px"}}>
              <div className="visi">
                <h4>Visi</h4>
                <p>Menjadi Perusahaan Vendor Produk Teknologi Informasi (IT) terbaik yang berguna dalam mendukung proses pengembangan bisnis perusahaan klien kami.</p>
              </div>
              <div className="misi">
                <h4>Misi</h4>
                <ol>
                  <li>Memberikan solusi serta pelayanan yang cepat, hangat dan proses transaksi dengan mudah.</li>
                  <li>Jaminan layanan purna jual (After sales service).</li>
                  <li>Memiliki Teknisi komputer professional yang selalu siap dalam memperbaiki produk IT yang bermasalah.</li>
                </ol>
              </div>
            </div>
          </section>

          <div className="section-kontak">
            
          </div>
          <section className="kontak">
            <h3>Our Contact</h3>
            <p style={{marginBottom: "10px"}}>Untuk informasi lebih lanjut, silakan hubungi kami melalui:</p>

            <div className="kontak-container">
              {/* Kotak Map */}
              <div className="map-box">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe 
                      className="gmap_iframe"
                      src="https://maps.google.com/maps?q=PT+infoduta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Kotak Kontak */}
              <div className="kontak-box">
                <div className="kontak-item">
                  <FaEnvelope className="icon" />
                  <span>dewi.handayani@infoduta.com</span>
                </div>
                <a 
                  href= {whatsappLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "white", gap: "10px", display: "flex", alignItems: "left" }}
                >
                  <FaWhatsapp className="icon" />
                  <span>0813-1411-8264</span>
                </a>
                <a 
                  href={whatsappLink2}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "white", gap: "10px", display: "flex", alignItems: "left" }}
                >
                  <FaWhatsapp className="icon" />
                  <span>0897-5808-407</span>
                </a>
                <div className="kontak-item">
                  <FaPhone className="icon" />
                  <span>(021) 3983-1939</span>
                </div>
                <div className="kontak-item">
                  <FaMapMarkerAlt className="icon" />
                <div>
                  <strong>PT. Infoduta Computindo Perkasa</strong><br />
                  HR Building, Jl. K.H. Wahid Hasyim No.5 G1 Floor,<br />
                  RT.12/RW.9, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat,<br />
                  Daerah Khusus Ibukota Jakarta 10340.
                </div>
              </div>
            </div>
            </div>
        </section>
        </div>
      <FAQ />
      </div>
    <Footer />
    </>
  )
}

export default Tentang

