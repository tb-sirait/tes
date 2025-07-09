
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import Navbar from "../Navigation/Navbar";
import "./karir.css";
import Footer from "../Navigation/footer";
import { sendForm } from "emailjs-com";

//import kantorIcpLandscapeImage from "../assets/kantor_icp(landscape).png";
import KantorImage from "../assets/kantor_icp(landscape1).png";

const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY"; // Replace with your actual site key

function Karir() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_phone: "",
    from_email: "",
    cv: null,
  });
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Removed reCAPTCHA state
  const formRef = useRef();
  // Removed reCAPTCHA ref

  const openModal = (title) => {
    setJobTitle(title);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      from_name: "",
      from_phone: "",
      from_email: "",
      cv: null,
    });
    setJobTitle("");
    document.body.style.overflow = 'unset'; // Restore scrolling
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
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [modalOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData((prev) => ({ ...prev, cv: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.from_name.trim()) {
      alert("Nama harus diisi.");
      return false;
    }
    if (!formData.from_phone.trim()) {
      alert("Nomor telepon harus diisi.");
      return false;
    }
    if (!formData.from_email.trim()) {
      alert("Email harus diisi.");
      return false;
    }
    if (!formData.cv) {
      alert("CV harus diupload.");
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      alert("Format email tidak valid.");
      return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(formData.from_phone)) {
      alert("Format nomor telepon tidak valid.");
      return false;
    }

    // if (!recaptchaValue) {
    //   alert("Mohon verifikasi reCAPTCHA.");
    //   return false;
    // }

    return true;
  };

  // Removed handleRecaptchaChange function

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Set the message field value to include name, phone, and CV file name
    if (formRef.current) {
      const messageInput = formRef.current.querySelector('input[name="message"]');
      if (messageInput) {
        messageInput.value = `Posisi: ${jobTitle}, Nama: ${formData.from_name}, Nomor Telpon: ${formData.from_phone}, File CV: ${formData.cv ? formData.cv.name : ''}`;
      }
    }

    try {
      await sendForm(
        "service_9e0ngq3", 
        "template_rjxaunz", 
        formRef.current,
        "nYM60UZycO9ExRaZF"
      );
      
      alert("Lamaran berhasil terkirim! Terima kasih atas minat Anda. Tim HRD kami akan menghubungi Anda segera.");
      closeModal();
    } catch (error) {
      console.error("Gagal mengirim:", error);
      alert("Gagal mengirim lamaran. Silakan periksa koneksi internet Anda dan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const jobPositions = [
    {
      title: "Marketing",
      requirements: [
        "Lulusan S1, dengan pengalaman marketing minimal 2 tahun",
        "Usia maksimal 30 tahun",
        "Mahir menggunakan gadget, komputer dan aplikasi Microsoft Office",
        "Terbiasa menggunakan platform marketplace (Shopee, TikTok, Tokopedia, Blibli, Lazada)",
        "Bisa Live Streaming / Shop Live",
        "Luwes, cekatan, mampu bekerja sama dengan tim",
        "Bersedia bekerja dengan target dan dalam situasi yang dinamis",
        "Komunikatif dan memiliki kemampuan layanan pelanggan yang baik",
        "Memiliki minat di dunia e-commerce dan pemasaran digital"
      ],
      description: "Bergabunglah dengan tim marketing kami untuk mengembangkan strategi pemasaran digital yang inovatif."
    },
    {
      title: "Customer Service",
      requirements: [
        "Minimal lulusan SMA/SMK",
        "Pengalaman customer service minimal 1 tahun",
        "Komunikatif dan sabar dalam melayani pelanggan",
        "Mahir menggunakan komputer dan aplikasi office",
        "Mampu multitasking dan bekerja di bawah tekanan",
        "Memiliki kemampuan problem solving yang baik",
        "Bersedia bekerja shift"
      ],
      description: "Berikan pelayanan terbaik kepada pelanggan dan jadilah wajah perusahaan yang ramah."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="career-page">
        <img
          className="background-image mobile-background"
          src={KantorImage}
          alt="Background"
        />
        <div className="blue-overlay"></div>
        
        <main className="main-content">
          <div className="hero-section">
            <h1 className="page-title">Karir Bersama Infoduta</h1>
            <p className="page-description">
              PT. Infoduta Computindo Perkasa membuka berbagai lowongan kerja untuk mengembangkan tim profesional, 
              demi membangun masa depan yang lebih baik bersama-sama.
            </p>
          </div>

          <div className="jobs-section">
            <h2 className="section-title">Lowongan Terbuka</h2>
            <div className="jobs-grid">
              {jobPositions.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-header">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-description">{job.description}</p>
                  </div>
                  
                  <div className="job-requirements">
                    <h4 className="requirements-title">Persyaratan:</h4>
                    <ul className="requirements-list">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="requirement-item">{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => openModal(job.title)}
                    className="apply-button"
                  >
                    <span>Lamar Sekarang</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />

        {modalOpen && (
          <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  Form Lamaran {jobTitle && `- ${jobTitle}`}
                </h2>
                <button 
                  className="modal-close-btn"
                  onClick={closeModal}
                  type="button"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="application-form">
                <input type="hidden" name="message" value="" />
                <input type="hidden" name="to_email" value="tbsintheworld@gmail.com" />
                
                <div className="form-group">
                  <label htmlFor="from_name" className="form-label">
                    Nama Lengkap <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="from_phone" className="form-label">
                    Nomor Telepon <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="from_phone"
                    name="from_phone"
                    value={formData.from_phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Contoh: +62812345678"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="from_email" className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="contoh@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cv" className="form-label">
                    Upload CV <span className="required">*</span>
                  </label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      onChange={handleChange}
                      required
                      className="file-input"
                      accept=".pdf,.doc,.docx"
                    />
                    <label htmlFor="cv" className="file-input-label">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {formData.cv ? formData.cv.name : 'Pilih file CV (PDF, DOC, DOCX)'}
                    </label>
                  </div>
                  <small className="form-help">Maksimal ukuran file 5MB</small>
                </div>

                {/* Removed reCAPTCHA component */}

                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={closeModal} 
                    className="cancel-btn"
                    disabled={isLoading}
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="spinner"></div>
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Lamaran'
                    )}
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
