import React, { useState, useEffect, useRef } from "react";

import Navbar from "../Navigation/Navbar";
import "./karir.css";
import Footer from "../Navigation/footer";
import { sendForm } from "emailjs-com";

function Karir() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_phone: "",
    from_email: "",
    cv: null,
  });
  const [jobTitle, setJobTitle] = useState("");
  const formRef = useRef();

  const openModal = (title) => {
    setJobTitle(title);
    setModalOpen(true);
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
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData((prev) => ({ ...prev, cv: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.cv) {
      alert("CV harus diupload.");
      return;
    }

    // Set the message field value to include name, phone, and CV file name
    if (formRef.current) {
      const messageInput = formRef.current.querySelector('input[name="message"]');
      if (messageInput) {
        messageInput.value = `Nama: ${formData.from_name}, Nomor Telpon: ${formData.from_phone}, File CV: ${formData.cv ? formData.cv.name : ''}`;
      }
    }

    sendForm(
      "service_9e0ngq3", // Ganti dengan Service ID kamu
      "template_rjxaunz", // Ganti dengan Template ID kamu
      formRef.current,
      "nYM60UZycO9ExRaZF" // Ganti dengan Public Key kamu
    ).then(
      () => {
        alert("Lamaran terkirim! Terima kasih.");
        closeModal();
      },
      (error) => {
        console.error("Gagal mengirim:", error);
        alert("Gagal mengirim lamaran. Silakan coba lagi.");
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="background-image mobile-background"></div>
      <div className="blue-overlay"></div>
      <main className="max-w-5xl mx-auto px-6 py-10 relative z-10">
        <h1 className="context text-2xl font-extrabold mb-3">Karir</h1>
        <p className="text1 text-base mb-20 max-w-3xl">
          PT. Infoduta Computindo Perkasa membuka lowongan untuk mengembangkan tim, demi membantu masa depan yang lebih baik.
        </p>
        <h2 className="what-is text-center font-bold text-lg mb-6">Lowongan Terbuka</h2>
          <section className="karir-section shadow-md max-w-4xl mx-auto">
          <div className="flex-1 p-8">
            <h3 className="title2 font-bold text-lg mb-4">Marketing</h3>
            <ol className="list-decimal list-inside space-y-2 text-base" style={{ lineHeight: "1.6" }}>
              <li className="list-syarat">Lulusan S1, dengan pengalaman marketing Minimal 2 tahun</li>
              <li className="list-syarat">Usia max 30th</li>
              <li className="list-syarat">Mahir menggunakan gadget, komputer dan aplikasi Microsoft Office.</li>
              <li className="list-syarat">Terbiasa menggunakan platform marketplace Shopee, Tiktok, Tokopedia, Blibli, Lazada dan sejenisnya.</li>
              <li className="list-syarat">Bisa Live Streaming / Shop Live</li>
              <li className="list-syarat">Luwes, cekatan, mampu bekerja sama dengan tim</li>
              <li className="list-syarat">Bersedia bekerja dengan target dan dalam situasi yang dinamis</li>
              <li className="list-syarat">Komunikatif dan memiliki kemampuan layanan pelanggan yang baik.</li>
              <li className="list-syarat">Memiliki minat di dunia e-commerce dan pemasaran digital.</li>
            </ol>
            <button
              onClick={() => openModal("Marketing")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </section>
      </main>
      <Footer />

      {modalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Form Lamaran {jobTitle && `(${jobTitle})`}</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="message" value="" />
              <input type="hidden" name="to_email" value="hrd@infoduta.com" />
              <div>
                <label htmlFor="from_name" className="block font-semibold mb-1">Nama</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  className="w-full text-black"
                />
              </div>
              <div>
                <label htmlFor="from_phone" className="block font-semibold mb-1">Nomor Telpon</label>
                <input
                  type="text"
                  id="from_phone"
                  name="from_phone"
                  value={formData.from_phone}
                  onChange={handleChange}
                  required
                  className="w-full text-black"
                />
              </div>
              <div>
                <label htmlFor="from_email" className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  className="w-full text-black"
                />
              </div>
              <div>
                <label htmlFor="cv" className="block font-semibold mb-1">CV (file)</label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleChange}
                  required
                  className="w-full"
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
                <button type="submit" className="submit-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Karir;
