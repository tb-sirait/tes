import React, { useState, useEffect } from "react";

const COOKIE_NAME = "cookie_consent";

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulasi pengecekan cookie (karena js-cookie tidak tersedia)
    const consent = localStorage.getItem(COOKIE_NAME);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (choice) => {
    // Simulasi set cookie
    localStorage.setItem(COOKIE_NAME, choice);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <div style={styles.bannerText}>
            <p style={styles.title}>🍪 Kami menghargai privasi Anda</p>
            <p style={styles.description}>
              Website ini menggunakan cookies untuk meningkatkan pengalaman,
              keamanan, dan analitik penggunaan.
              <button
                onClick={() => setShowModal(true)}
                style={styles.linkButton}
              >
                Pelajari lebih lanjut
              </button>
            </p>
          </div>
          <div style={styles.buttons}>
            <button
              onClick={() => handleConsent("declined")}
              style={styles.buttonDecline}
            >
              Tolak
            </button>
            <button
              onClick={() => handleConsent("accepted")}
              style={styles.buttonAccept}
            >
              Setujui Semua
            </button>
          </div>
        </div>
      </div>

      {/* Modal Kebijakan Privasi */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className="modal-content-wrapper"
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={styles.closeButtonTop}
            >
              ✕
            </button>

            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>🔒 Kebijakan Privasi</h2>
              <p style={styles.modalSubtitle}>
                Kami transparan tentang bagaimana kami menggunakan data Anda
              </p>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>
                  Jenis-jenis Cookie yang Kami Gunakan
                </h3>
                <div style={styles.cookiesList}>
                  <div style={styles.cookieItem}>
                    <span style={styles.cookieIcon}>✅</span>
                    <div>
                      <p style={styles.cookieItemTitle}>Cookies Esensial</p>
                      <p style={styles.cookieItemDesc}>
                        Memastikan website berfungsi dengan baik dan aman untuk
                        Anda
                      </p>
                    </div>
                  </div>

                  <div style={styles.cookieItem}>
                    <span style={styles.cookieIcon}>📊</span>
                    <div>
                      <p style={styles.cookieItemTitle}>Cookies Analitik</p>
                      <p style={styles.cookieItemDesc}>
                        Membantu kami memahami bagaimana pengunjung menggunakan
                        website
                      </p>
                    </div>
                  </div>

                  <div style={styles.cookieItem}>
                    <span style={styles.cookieIcon}>🎯</span>
                    <div>
                      <p style={styles.cookieItemTitle}>Cookies Marketing</p>
                      <p style={styles.cookieItemDesc}>
                        Menampilkan iklan dan konten yang lebih relevan untuk
                        Anda
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Privasi & Kontrol Anda</h3>
                <p style={styles.sectionText}>
                  Anda memiliki kontrol penuh atas cookie. Anda dapat mengubah
                  atau menarik persetujuan kapan saja melalui:
                </p>
                <ul style={styles.controlList}>
                  <li>Pengaturan privasi browser Anda</li>
                  <li>Preferensi akun Anda</li>
                  <li>Menghubungi tim support kami</li>
                </ul>
              </div>

              <div style={styles.footer}>
                <p style={styles.footerText}>
                  Dengan mengklik "Setujui Semua", Anda setuju dengan penggunaan
                  semua cookie sebagaimana dijelaskan di atas.
                </p>
              </div>
            </div>

            <div style={styles.modalActions}>
              <button
                onClick={() => handleConsent("declined")}
                style={styles.modalButtonDecline}
              >
                Tolak
              </button>
              <button
                onClick={() => {
                  handleConsent("accepted");
                  setShowModal(false);
                }}
                style={styles.modalButtonAccept}
              >
                Setujui Semua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animasi */}
      <style>
        {`
          @keyframes slideInUp {
            from {
              transform: translateY(100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes popUp {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          /* Hide scrollbar but allow scrolling */
          .modal-content-wrapper {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .modal-content-wrapper::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </>
  );
}

const styles = {
  banner: {
    position: "fixed",
    bottom: "24px",
    left: "24px",
    right: "auto",
    maxWidth: "420px",
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    backdropFilter: "blur(10px)",
    color: "#1a1a1a",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    fontSize: "0.95rem",
    animation: "slideInUp 0.5s ease-out",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  bannerText: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  description: {
    margin: 0,
    fontSize: "0.9rem",
    lineHeight: "1.5",
    color: "#555",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#0066cc",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "0.9rem",
    padding: "0 4px",
    fontWeight: "500",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  buttonAccept: {
    backgroundColor: "#0066cc",
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  buttonDecline: {
    backgroundColor: "transparent",
    border: "1.5px solid #ddd",
    color: "#555",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    animation: "fadeIn 0.3s ease-out",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "85vh",
    overflow: "auto",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    position: "relative",
    animation: "popUp 0.4s ease-out",
  },
  closeButtonTop: {
    position: "absolute",
    top: "16px",
    right: "16px",
    backgroundColor: "#f0f0f0",
    border: "none",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
    color: "#666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    zIndex: 10,
  },
  modalHeader: {
    padding: "32px 24px 24px",
    borderBottom: "1px solid #f0f0f0",
    background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
    borderRadius: "20px 20px 0 0",
  },
  modalTitle: {
    margin: "0 0 8px 0",
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  modalSubtitle: {
    margin: 0,
    fontSize: "0.95rem",
    color: "#888",
    fontWeight: "400",
  },
  modalBody: {
    padding: "24px",
  },
  section: {
    marginBottom: "28px",
  },
  sectionTitle: {
    margin: "0 0 16px 0",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  sectionText: {
    margin: "0 0 12px 0",
    fontSize: "0.95rem",
    color: "#555",
    lineHeight: "1.6",
  },
  cookiesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  cookieItem: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    border: "1px solid #efefef",
  },
  cookieIcon: {
    fontSize: "1.5rem",
    minWidth: "32px",
    display: "flex",
    alignItems: "center",
  },
  cookieItemTitle: {
    margin: "0 0 4px 0",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  cookieItemDesc: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#777",
    lineHeight: "1.4",
  },
  controlList: {
    margin: "12px 0 0 0",
    paddingLeft: "20px",
    fontSize: "0.9rem",
    color: "#666",
    lineHeight: "1.8",
  },
  footer: {
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    marginTop: "12px",
  },
  footerText: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#888",
    lineHeight: "1.5",
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    padding: "24px",
    borderTop: "1px solid #f0f0f0",
    justifyContent: "flex-end",
  },
  modalButtonAccept: {
    backgroundColor: "#0066cc",
    border: "none",
    color: "white",
    padding: "12px 28px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  modalButtonDecline: {
    backgroundColor: "transparent",
    border: "1.5px solid #ddd",
    color: "#555",
    padding: "12px 28px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

export default CookieConsent;
