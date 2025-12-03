import React, { useState } from "react";
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

  return (
    <>
      <section className="kontak" style={{ padding: "50px 0" }}>
        <h2 style={{ fontSize: "45px" }}>Our Contact</h2>
        <div className="section-divider" style={{ marginBottom: "20px" }}></div>
        <p style={{ marginBottom: "18px", fontSize: "18px" }}>
          Untuk informasi lebih lanjut, silakan hubungi kami melalui:
        </p>

        <div className="kontak-container" style={{ maxWidth: "1200px" }}>
          {/* Kotak Map */}
          <div className="map-box">
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

          {/* Kotak Kontak */}
          <div className="kontak-box">
            <div className="kontak-item">
              <FaEnvelope className="icon" />
              <span>dewi.handayani@infoduta.com</span>
            </div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
                gap: "10px",
                display: "flex",
                alignItems: "left",
              }}
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              <FaEnvelope className="icon" />
              <span>Hubungi Admin Sales</span>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSalesModalOpen(true);
              }}
              style={{
                textDecoration: "none",
                color: "white",
                gap: "10px",
                display: "flex",
                alignItems: "left",
                cursor: "pointer"
              }}
            >
              <FaWhatsapp className="icon" />
              <span>Hubungi Tim Sales WhatsApp</span>
            </a>
            <div className="kontak-item">
              <FaPhone className="icon" />
              <span>(021) 3983-1939</span>
            </div>
            <div className="kontak-item">
              <FaMapMarkerAlt className="icon" />
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
      {modalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Daftar Email Admin Sales</h2>
            <ul className="email-list">
              <li>
                <a href="mailto:sales.1@infoduta.com" className="email-link">
                  sales.1@infoduta.com
                </a>
              </li>
              <li>
                <a href="mailto:sales.2@infoduta.com" className="email-link">
                  sales.2@infoduta.com
                </a>
              </li>
              <li>
                <a href="mailto:sales.3@infoduta.com" className="email-link">
                  sales.3@infoduta.com
                </a>
              </li>
              <li>
                <a href="mailto:sales.6@infoduta.com" className="email-link">
                  sales.6@infoduta.com
                </a>
              </li>
              <li>
                <a href="mailto:sales.7@infoduta.com" className="email-link">
                  sales.7@infoduta.com
                </a>
              </li>
            </ul>
            <div className="modal-footer">
              <button onClick={closeModal} className="cancel-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <SalesModal isOpen={salesModalOpen} onClose={() => setSalesModalOpen(false)} />
    </>
  );
}

export default KontakContainer;
