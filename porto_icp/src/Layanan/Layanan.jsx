import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { FaEnvelope, FaWhatsapp, FaPhone, FaMapMarkerAlt, FaCheck, FaCogs, FaServer, FaNetworkWired, FaHeadset, FaShieldAlt, FaRocket} from 'react-icons/fa';
import "./layanan.css"

import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import FAQ from "../Tentang/faq";
import KontakContainer from "../Tentang/kontakContainer";

// Mock images
const kantorIcp = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop";
const aiGeneratifProduk = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop";
const aiGeneratifService = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop";
const consulIt = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop";
const hardwareIt = "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop";
const procureIt = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop";
const serviceIt = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop";

const images = [consulIt, hardwareIt, procureIt, serviceIt];

function Layanan() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const timeoutRef = useRef(null); 
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

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setNextIndex((prev) => (prev + 1) % images.length);
                setIsAnimating(false);
            }, 1000);
        }, 1500);

        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex]);

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
        <div className="layanan-hero" style={{backgroundImage: `url(${kantorIcp})`}}>
            <div className="floating-elements"></div>
            <div className="service-hero-content">
                <h1 className="hero-title">Layanan</h1>
                <div className="hero-divider"></div>
                <p className="hero-subtitle">Solusi teknologi informasi terpadu untuk mengoptimalkan bisnis Anda dengan layanan berkualitas tinggi</p>
                
                <div className="slideshow-container">
                    <img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        className={`slideshow-image ${isAnimating ? "slide-out-right" : "active"}`}
                        style={{ zIndex: isAnimating ? 1 : 2 }}
                    />
                    <img
                        key={nextIndex}
                        src={images[nextIndex]}
                        alt={`Slide ${nextIndex + 1}`}
                        className={`slideshow-image ${isAnimating ? "slide-in-right" : "inactive"}`}
                        style={{ zIndex: isAnimating ? 2 : 1 }}
                    />
                </div>
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
                                <strong>Pelatihan Penggunaan:</strong> Kami memberikan pelatihan penggunaan produk IT yang Anda beli atau sewa, sehingga Anda dapat memaksimalkan manfaat dari teknologi yang ada.
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