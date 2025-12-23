import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import jobsData from "./jobsData.json";
import kantorICP from "../assets/kantor_icp(landscape1).webp";
import "./karir.css";

function Karir() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    // Trigger hero animation on mount
    const timer = setTimeout(() => {
      setHeroLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    mainContentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: ""
    });
    setSelectedJob(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Nama harus diisi.");
      return false;
    }
    if (!formData.phone.trim()) {
      alert("Nomor telepon harus diisi.");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Email harus diisi.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Format email tidak valid.");
      return false;
    }

    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Format nomor telepon tidak valid.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Generate WhatsApp message
    const message = `*Lamaran Pekerjaan - ${selectedJob.title}*%0A%0A` +
      `Nama: ${formData.name}%0A` +
      `Nomor Telepon: ${formData.phone}%0A` +
      `Email: ${formData.email}%0A` +
      `Pesan: ${formData.message || "-"}%0A%0A` +
      `Saya tertarik untuk melamar posisi ${selectedJob.title} di PT. Infoduta Computindo Perkasa.`;

    // WhatsApp number (ganti dengan nomor WhatsApp perusahaan)
    const whatsappNumber = "6282122334455"; // Ganti dengan nomor yang sesuai
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    closeModal();
  };

  const toggleExpand = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  // Filter jobs based on search and filter
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || job.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Helmet>
        <title>Karir | Infoduta Computindo Perkasa</title>
        <meta
          name="description"
          content="Bergabunglah dengan tim profesional kami di PT. Infoduta Computindo Perkasa dan kembangkan karir Anda bersama kami."
        />
        <meta
          name="keywords"
          content="Karir, Lowongan Kerja, Peluang Karir, Tim Profesional, PT Infoduta Computindo Perkasa"
        />
        <meta name="author" content="PT Infoduta Computindo Perkasa" />
        <link rel="canonical" href="https://infoduta.com/karir" />
      </Helmet>

      <Navbar />

      <div className="karir-page">
        {/* Hero Section */}
        <section className={`karir-hero-section home-hero-section ${heroLoaded ? 'karir-hero-loaded' : ''}`}>
          <img 
            src={kantorICP} 
            alt="Kantor Infoduta Computindo Perkasa" 
            className="karir-hero-background"
          />
          <div className="karir-hero-overlay"></div>
          <div className="karir-hero-content">
            <h1 className="karir-hero-title">Karir di Infoduta</h1>
            <p className="karir-hero-description">
              Mari bergabung untuk bertumbuh dan berkembang bersama dengan Infoduta
            </p>
            <button className="karir-hero-button" onClick={scrollToContent}>
              Jelajahi Karir Infoduta
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </section>

        {/* Main Content */}
        <main className="karir-main-content" ref={mainContentRef}>
          <div className="karir-content-container">
            <div className="karir-header">
              <h2 className="karir-title">Karir di Infoduta</h2>
              <p className="karir-subtitle">Carilah potensi mu di Infoduta</p>
            </div>

            {/* Search and Filter Section */}
            <div className="karir-search-filter">
              <div className="karir-search-box">
                <svg className="karir-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  className="karir-search-input"
                  placeholder="Cari pekerjaan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="karir-filter-box">
                <label className="karir-filter-label">
                  <span>Urutkan berdasarkan</span>
                  <select
                    className="karir-filter-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">Semua</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Kontrak</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Jobs List Section */}
            <div className="karir-jobs-list">
              {filteredJobs.length === 0 ? (
                <div className="karir-no-results">
                  <p>Tidak ada lowongan yang sesuai dengan pencarian Anda.</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div key={job.id} className="karir-job-card">
                    <div className="karir-job-header" onClick={() => toggleExpand(job.id)}>
                      <div className="karir-job-header-left">
                        <h3 className="karir-job-title">{job.title}</h3>
                        <p className="karir-job-meta">
                          {job.type} • {job.location}
                        </p>
                      </div>
                      <button className="karir-expand-button">
                        <svg
                          className={`karir-expand-icon ${expandedJob === job.id ? 'karir-expanded' : ''}`}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    {expandedJob === job.id && (
                      <div className="karir-job-details">
                        <div className="karir-job-description">
                          <p>{job.description}</p>
                        </div>

                        <div className="karir-job-requirements">
                          <h4 className="karir-requirements-title">Persyaratan:</h4>
                          <ul className="karir-requirements-list">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="karir-requirement-item">
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          className="karir-apply-button"
                          onClick={() => openModal(job)}
                        >
                          Lamar Sekarang
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

        <Footer />

        {/* Modal */}
        {modalOpen && (
          <div className="karir-modal-backdrop" onClick={closeModal}>
            <div className="karir-modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="karir-modal-header">
                <h2 className="karir-modal-title">
                  Form Lamaran - {selectedJob?.title}
                </h2>
                <button className="karir-modal-close" onClick={closeModal}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="karir-form">
                <div className="karir-form-group">
                  <label htmlFor="name" className="karir-form-label">
                    Nama Lengkap <span className="karir-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="karir-form-input"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div className="karir-form-group">
                  <label htmlFor="phone" className="karir-form-label">
                    Nomor Telepon <span className="karir-required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="karir-form-input"
                    placeholder="Contoh: +62812345678"
                  />
                </div>

                <div className="karir-form-group">
                  <label htmlFor="email" className="karir-form-label">
                    Email <span className="karir-required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="karir-form-input"
                    placeholder="contoh@email.com"
                  />
                </div>

                <div className="karir-form-group">
                  <label htmlFor="message" className="karir-form-label">
                    Pesan (Opsional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="karir-form-textarea"
                    placeholder="Ceritakan tentang diri Anda..."
                    rows="4"
                  />
                </div>

                <div className="karir-form-actions">
                  <button type="button" onClick={closeModal} className="karir-cancel-button">
                    Batal
                  </button>
                  <button type="submit" className="karir-submit-button">
                    Kirim via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Karir;