import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { FaEnvelope, FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

import Navbar from "../Navigation/Navbar"
import "../layanan/layanan.css"
import Footer from "../Navigation/footer"
import aiGeneratifProduk from "../assets/layanan/ai_generatif_produk.png";
import aiGeneratifService from "../assets/layanan/ai_generatif_service.png";

import consulIt from "../assets/layanan/consul_it.png";
import hardwareIt from "../assets/layanan/hardware_it.png";
import procureIt from "../assets/layanan/procure_it.png";
import serviceIt from "../assets/layanan/service_it.png";

import kantorIcp from "../assets/kantor_icp.png";

const images = [
    consulIt,
    hardwareIt,
    procureIt,
    serviceIt
  ];



function Layanan() {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const timeoutRef = useRef(null);

    const message = encodeURIComponent("Halo Infoduta, saya tertarik dengan layanan Perangkat IT yang Anda tawarkan. Mohon informasi lebih lanjut.");
    const phoneNumber = "6281314118264";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    const phoneNumber2 = "628975808407";
    const whatsappLink2 = `https://wa.me/${phoneNumber2}?text=${message}`;

    // New state for modal visibility
    const [modalOpen, setModalOpen] = useState(false);

    // Function to open modal
    const openModal = () => {
      setModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
      setModalOpen(false);
    };

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
            setNextIndex((prev) => (prev + 1) % images.length);
            setIsAnimating(false);
        }, 1000); // animation duration 1s
    }, 1500); // delay 1.5s

    return () => {
        clearTimeout(timeoutRef.current);
    }; }, [currentIndex]);
    return (
        <>
        <Navbar />
        <div className="bagian-atas" style={{backgroundImage: `url(${kantorIcp})`, backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed", backgroundSize: "cover"}}>
            <div className="overlay"></div>
            <div className="layanan-text">
                <h1>Layanan</h1>
                <div className="garis"></div>
                <p>Layanan yang ditawarkan oleh perusahaan kami:</p>
            </div>
            <section className="hero-page">
                <div className="slideshow-container">
                    <img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className={`slideshow-image ${
                        isAnimating ? "slide-out-right" : "active"
                    }`}
                    style={{ zIndex: isAnimating ? 1 : 2 }}
                    />
                    <img
                    key={nextIndex}
                    src={images[nextIndex]}
                    alt={`Slide ${nextIndex + 1}`}
                    className={`slideshow-image ${
                        isAnimating ? "slide-in-right" : "inactive"
                    }`}
                    style={{ zIndex: isAnimating ? 2 : 1 }}
                    />
                </div>
            </section>
        </div>
        
        <section className="highlight">
            <h2>Penjualan & Penyewaan Produk IT</h2>
            <div className="highlight-content-left">

                <img
                    src={aiGeneratifProduk}
                    alt="Penjualan dan Penyewaan Produk IT"
                    className="highlight-image"
                />
                <p>
                    Infoduta menyediakan layanan penjualan dan penyewaan produk IT terkini, mulai dari perangkat keras komputer, server, hingga berbagai solusi jaringan dan teknologi informasi. Kami berkomitmen memberikan produk berkualitas dengan harga kompetitif yang dapat memenuhi kebutuhan bisnis dan individu Anda.
                </p>
            </div>
        </section>
        <section className="highlight-2">
            <h2>Layanan Purnajual Unggulan</h2>
            <div className="highlight-content-right" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="highlight-content-right-text">
                    <p>
                        Sebagai bentuk komitmen kami terhadap kualitas dan kepuasan pelanggan, layanan purnajual Infoduta menyediakan:
                    </p>
                    <ul>
                        <li><strong>Servis Bergaransi:</strong> Setiap produk yang Anda beli atau sewa mendapatkan layanan servis bergaransi untuk memastikan performa optimal tanpa biaya tambahan selama masa garansi.</li>
                        <li><strong>Konsultasi Alat IT Gratis:</strong> Kami menyediakan konsultasi profesional tentang peralatan dan solusi IT yang sesuai dengan kebutuhan Anda tanpa biaya tambahan, baik sebelum maupun setelah pembelian.</li>
                        <li><strong>Pengiriman dan Instalasi:</strong> Kami menawarkan layanan pengiriman dan instalasi produk IT di lokasi Anda untuk memastikan semua perangkat siap digunakan dengan cepat dan efisien.</li>
                        <li><strong>Pelatihan Penggunaan:</strong> Kami memberikan pelatihan penggunaan produk IT yang Anda beli atau sewa, sehingga Anda dapat memaksimalkan manfaat dari teknologi yang ada.</li>
                    </ul>
                </div>    
                <img
                    src={aiGeneratifService}
                    alt="Layanan Purnajual Unggulan"
                    className="highlight-image"
                />
            </div>
        </section>
        <section className="kontak" style={{ marginTop: "50px" , width: "40%", marginLeft: "auto", marginRight: "auto"}}>
                    <h3>Contact Us</h3>
                    <p style={{marginBottom: "10px"}}>Informasi lebih lanjut, silahkan hubungi kami untuk berdiskusi.</p>
        
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
                          href= "" 
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "white", gap: "10px", display: "flex", alignItems: "left" }}
                          onClick={(e) => { e.preventDefault(); openModal(); }}
                        >
                          <FaEnvelope className="icon" />
                          <span>Hubungi Admin Sales</span>
                        </a>
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

        {/* Modal for Admin Sales Emails */}
        {modalOpen && (
          <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">Daftar Email Admin Sales</h2>
              <ul className="space-y-2 text-base">
                <li>sales.1@infoduta.com</li>
                <li>sales.2@infoduta.com</li>
                <li>sales.3@infoduta.com</li>
                <li>sales.6@infoduta.com</li>
                <li>sales.7@infoduta.com</li>
              </ul>
              <div className="flex justify-end space-x-2 mt-4">
                <button onClick={closeModal} className="cancel-btn">Close</button>
              </div>
            </div>
          </div>
        )}

        <Footer />
        </>
    )
}

export default Layanan