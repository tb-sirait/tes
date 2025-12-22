// KontakContainer.jsx
import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./kontakContainer.css";
import SalesModal from "../Navigation/SalesWhatsapp";

function KontakContainer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Fungsi untuk mengecek status aktif berdasarkan waktu
  const isActiveTime = () => {
    const now = new Date();
    const hour = now.getHours();
    // Aktif jika jam 8 pagi sampai sebelum jam 5 sore (08:00 - 16:59)
    return hour >= 8 && hour < 17;
  };

  const salesData = [
    { name: "Sales Admin 1", email: "sales.1@infoduta.com" },
    { name: "Sales Admin 2", email: "sales.2@infoduta.com" },
    { name: "Sales Admin 3", email: "sales.3@infoduta.com" },
    { name: "Sales Admin 6", email: "sales.6@infoduta.com" },
    { name: "Sales Admin 7", email: "sales.7@infoduta.com" },
  ];

  const [activeStatus, setActiveStatus] = useState(isActiveTime());

  useEffect(() => {
    // Update status setiap menit
    const interval = setInterval(() => {
      setActiveStatus(isActiveTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="con-section">
        <h2 className="con-title">Our Contact</h2>
        <div className="con-divider"></div>
        <p className="con-subtitle">
          Untuk informasi lebih lanjut, silakan hubungi kami melalui:
        </p>

        <div className="con-container">
          {/* Kotak Map */}
          <div className="con-map-box">
            <div className="con-gmap-canvas">
              <iframe
                className="con-gmap-iframe"
                src="https://maps.google.com/maps?q=PT+infoduta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                title="Google Maps PT Infoduta"
              ></iframe>
            </div>
          </div>

          {/* Kotak Kontak */}
          <div className="con-info-box">
            <div className="con-item">
              <FaEnvelope className="con-icon" />
              <span>dewi.handayani@infoduta.com</span>
            </div>
            <a
              href="#"
              className="con-link"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              <FaEnvelope className="con-icon" />
              <span>Hubungi Admin Sales</span>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSalesModalOpen(true);
              }}
              className="con-link"
            >
              <FaWhatsapp className="con-icon" />
              <span>Hubungi Tim Sales WhatsApp</span>
            </a>
            <div className="con-item">
              <FaPhone className="con-icon" />
              <span>(021) 3983-1939</span>
            </div>
            <div className="con-item">
              <FaMapMarkerAlt className="con-icon" />
              <div>
                <strong>PT. Infoduta Computindo Perkasa</strong>
                <br />
                HR Building, Jl. K.H. Wahid Hasyim No.5 G2 Floor,
                <br />
                RT.12/RW.9, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat,
                <br />
                Daerah Khusus Ibukota Jakarta 10340.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Daftar Email Admin Sales */}
      {modalOpen && (
        <div className="con-modal-backdrop" onClick={closeModal}>
          <div
            className="con-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="con-modal-title">Daftar Admin Sales</h2>
            <div className="con-sales-list">
              {salesData.map((sales, index) => (
                <a
                  key={index}
                  href={`mailto:${sales.email}`}
                  className="con-sales-card"
                >
                  <div className="con-sales-info">
                    <div className="con-sales-name">{sales.name}</div>
                    <div className="con-sales-email">{sales.email}</div>
                  </div>
                  <div className="con-sales-status">
                    <span
                      className={`con-status-badge ${
                        activeStatus ? "con-active" : "con-inactive"
                      }`}
                    >
                      {activeStatus ? "● Aktif" : "● Tidak Aktif"}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <div className="con-modal-footer">
              <button onClick={closeModal} className="con-close-btn">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sales WhatsApp */}
      <SalesModal
        isOpen={salesModalOpen}
        onClose={() => setSalesModalOpen(false)}
      />
    </>
  );
}

export default KontakContainer;
