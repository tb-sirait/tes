import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { FaEnvelope, FaWhatsapp, FaPhone, FaMapMarkerAlt, FaCheck, FaCogs, FaServer, FaNetworkWired, FaHeadset, FaShieldAlt, FaRocket} from 'react-icons/fa';
import "./layanan.css"

import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import FAQ from "../Tentang/faq";
import KontakContainer from "../Tentang/kontakContainer";

import kantorIcp from "../assets/kantor_icp(landscape1).webp";
import aiGeneratifProduk from "../assets/layanan/ai_generatif_produk.png";
import aiGeneratifService from "../assets/layanan/ai_generatif_service.png";

function Layanan() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const target = document.querySelector('.services-container');
        if (target) observer.observe(target);
        return () => observer.disconnect();
    }, []);

    const services = [
        {
            icon: <FaCogs className="text-4xl text-blue-500" />,
            title: "Konsultasi IT",
            description: "Solusi konsultasi teknologi informasi terpadu untuk mengoptimalkan infrastruktur bisnis Anda",
            features: ["Analisis Kebutuhan", "Perencanaan Strategis", "Implementasi Solusi"]
        },
        {
            icon: <FaServer className="text-4xl text-green-500" />,
            title: "Hardware IT",
            description: "Penyediaan perangkat keras IT berkualitas tinggi dengan spesifikasi sesuai kebutuhan bisnis",
            features: ["Server Enterprise", "Workstation", "Networking Equipment"]
        },
        {
            icon: <FaNetworkWired className="text-4xl text-purple-500" />,
            title: "Procurement IT",
            description: "Layanan pengadaan perangkat IT dengan proses yang efisien dan harga kompetitif",
            features: ["Vendor Management", "Cost Optimization", "Quality Assurance"]
        },
        {
            icon: <FaHeadset className="text-4xl text-orange-500" />,
            title: "Service IT",
            description: "Dukungan teknis dan maintenance komprehensif untuk menjaga performa optimal sistem IT",
            features: ["24/7 Support", "Preventive Maintenance", "Remote Assistance"]
        }
    ];

    return (
        <>
        <Navbar />
        <div className="layanan-hero">
            {/*style={{backgroundImage: `url(${kantorIcp})`}}*/}
            <div></div>
            <div className="service-hero-content">
                <h1 className="layanan-hero-title">Layanan</h1>
                <div className="hero-divider"></div>
                <p className="hero-subtitle">Infoduta hadir sebagai solusi untuk bisnis anda dengan melayani Pengadaan atau Penyewaan Produk IT.</p>
            </div>
        </div>

        <div className="services-container">
            <h2 className="services-title">Layanan Kami</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div 
                        key={index}
                        className={`service-card ${isVisible ? 'visible' : ''}`}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        <div className="service-icon">
                            {service.icon}
                        </div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                        <ul className="service-features">
                            {service.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        
        <section className="highlight-section">
            <div className="highlight-container">
                <div className="highlight-content">
                    <h2 className="highlight-title">Penjualan & Penyewaan Produk IT</h2>
                    <p className="highlight-text">
                        Infoduta menyediakan layanan penjualan dan penyewaan produk IT terkini, mulai dari perangkat keras komputer, server, hingga berbagai solusi jaringan dan teknologi informasi. Kami berkomitmen memberikan produk berkualitas dengan harga kompetitif yang dapat memenuhi kebutuhan bisnis dan individu Anda.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#e8f5e8', padding: '0.5rem 1rem', borderRadius: '25px' }}>
                            <FaRocket style={{ color: '#48bb78', marginRight: '0.5rem' }} />
                            <span style={{ color: '#2d6e3e', fontSize: '0.9rem', fontWeight: '500' }}>Produk Terbaru</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#e8f4fd', padding: '0.5rem 1rem', borderRadius: '25px' }}>
                            <FaShieldAlt style={{ color: '#3182ce', marginRight: '0.5rem' }} />
                            <span style={{ color: '#2b5d8a', fontSize: '0.9rem', fontWeight: '500' }}>Garansi Resmi</span>
                        </div>
                    </div>
                </div>
                <img src={aiGeneratifProduk} alt="Penjualan dan Penyewaan Produk IT" className="highlight-image" />
            </div>
        </section>

        <section className="highlight-section">
            <div className="highlight-container reverse">
                <img src={aiGeneratifService} alt="Layanan Purnajual Unggulan" className="highlight-image" />
                <div className="highlight-content">
                    <h2 className="highlight-title">Layanan Purnajual Unggulan</h2>
                    <p className="highlight-text">
                        Sebagai bentuk komitmen kami terhadap kualitas dan kepuasan pelanggan, layanan purnajual Infoduta menyediakan:
                    </p>
                    <ul className="highlight-list">
                        <li>
                            <FaCheck className="check-icon" />
                            <div>
                                <strong>Servis Bergaransi:</strong> Setiap produk yang Anda beli atau sewa mendapatkan layanan servis bergaransi untuk memastikan performa optimal tanpa biaya tambahan selama masa garansi.
                            </div>
                        </li>
                        <li>
                            <FaCheck className="check-icon" />
                            <div>
                                <strong>Konsultasi Alat IT Gratis:</strong> Kami menyediakan konsultasi profesional tentang peralatan dan solusi IT yang sesuai dengan kebutuhan Anda tanpa biaya tambahan.
                            </div>
                        </li>
                        <li>
                            <FaCheck className="check-icon" />
                            <div>
                                <strong>Pengiriman dan Instalasi:</strong> Kami menawarkan layanan pengiriman dan instalasi produk IT di lokasi Anda untuk memastikan semua perangkat siap digunakan.
                            </div>
                        </li>
                        <li>
                            <FaCheck className="check-icon" />
                            <div>
                                <strong>Pelatihan Penggunaan:</strong> Kami memberikan pelatihan penggunaan produk IT yang Anda beli atau sewa, sehingga Anda dapat memaksimalkan manfaat untuk perusahaan Anda dari teknologi yang diterima.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <KontakContainer/>
        <FAQ />
        <Footer />
        </>
    )
}

export default Layanan