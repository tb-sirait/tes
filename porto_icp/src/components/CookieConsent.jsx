import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "cookie_consent";

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (choice) => {
    Cookies.set(COOKIE_NAME, choice, { expires: 365, sameSite: "Strict" });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner */}
      <div style={styles.banner}>
        <p style={styles.text}>
          Kami menggunakan cookies untuk meningkatkan pengalaman, keamanan, dan
          analitik penggunaan website.{" "}
          <button onClick={() => setShowModal(true)} style={styles.linkButton}>
            Lihat Kebijakan Privasi
          </button>
        </p>
        <div style={styles.buttons}>
          <button
            onClick={() => handleConsent("accepted")}
            style={styles.buttonAccept}
          >
            Setujui Semua
          </button>
          <button
            onClick={() => handleConsent("declined")}
            style={styles.buttonDecline}
          >
            Tolak
          </button>
        </div>
      </div>

      {/* Modal Kebijakan Privasi */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            style={{
              ...styles.modalContent,
              animation: "popUp 0.4s ease forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#1a4ed8", marginBottom: "10px" }}>
              Kebijakan Privasi
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Kami menghargai privasi Anda. Website ini menggunakan cookies
              untuk:
            </p>
            <ul style={styles.list}>
              <li>
                <span>✅</span> Cookies esensial: memastikan website berfungsi
                dengan baik
              </li>
              <li>
                <span>📊</span> Cookies analitik: membantu kami memahami
                penggunaan website
              </li>
              <li>
                <span>🎯</span> Cookies marketing: menampilkan iklan yang
                relevan
              </li>
            </ul>
            <p style={{ fontSize: "0.9rem", marginBottom: "30px" }}>
              Anda dapat mengubah pengaturan cookies kapan saja melalui browser
              atau preferensi akun Anda.
            </p>

            {/* Tombol Close di pojok kanan bawah */}
            <button
              style={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Animasi */}
      <style>
        {`
          @keyframes popUp {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes popDown {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0.8);
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
}

const styles = {
  banner: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    maxWidth: "340px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(12px)",
    color: "#003554",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    zIndex: 1000,
    fontSize: "0.9rem",
    animation: "fadeInUp 0.5s ease-in-out",
  },
  text: {
    marginBottom: "0.8rem",
    lineHeight: "1.4",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#0066cc",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "0.9rem",
    padding: 0,
  },
  buttons: {
    display: "flex",
    gap: "0.5rem",
    justifyContent: "flex-end",
  },
  buttonAccept: {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "0.4rem 0.9rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
  buttonDecline: {
    backgroundColor: "#f44336",
    border: "none",
    color: "white",
    padding: "0.4rem 0.9rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    position: "relative",
    transform: "scale(0.8)",
    opacity: 0,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 15px 0",
    lineHeight: "1.5",
  },
  closeButton: {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    backgroundColor: "#1a4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
};

export default CookieConsent;
