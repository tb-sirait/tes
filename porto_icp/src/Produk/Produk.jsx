import React, { useState, useEffect, useRef } from "react"

import Navbar from "../Navigation/Navbar"
import "./produk.css"
import "./manual_additions.css"
import Footer from "../Navigation/footer"
import produkData from "./produk.json";
import { FaFilter } from 'react-icons/fa';

import DellLogo from "../assets/Dell_logo.png";
import LenovoLogo from "../assets/lenovo_logo.png";
import CiscoLogo from "../assets/Cisco_logo.png";
import SamsungLogo from "../assets/samsung_logo.png";
import AsusLogo from "../assets/Asus_logo.png";
import HpLogo from "../assets/hp_logo.png";
import InfocusLogo from "../assets/Infocus_logo.png";
import AppleLogo from "../assets/Apple_logo.png";
import PrevIcon from "../assets/produk/icon/prev.png";
import NextIcon from "../assets/produk/icon/next.png";

export default function Produk() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [brandClickCount, setBrandClickCount] = useState(0)
  const [isNoProductModalOpen, setIsNoProductModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])


const images = import.meta.glob('../assets/produk/**/*.{png,jpg,jpeg,svg}', { eager: true });

const imageMap = {};
for (const path in images) {
  const key = path.replace('../assets/', '');
  imageMap[key] = images[path].default;
}

const products = produkData.map(product => ({
  ...product,
  images: product.images.map(imagePath => imageMap[imagePath] || '')
}));

  const brands = [
    { name: "Dell", logo: DellLogo },
    { name: "Lenovo", logo: LenovoLogo },
    { name: "Cisco", logo: CiscoLogo },
    { name: "Samsung", logo: SamsungLogo },
    { name: "Asus", logo: AsusLogo },
    { name: "HP", logo: HpLogo },
    { name: "InFocus", logo: InfocusLogo },
    { name: "Apple", logo: AppleLogo },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (product) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0);
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setIsModalOpen(false)
  }

  // Update image index with slide direction
  const goToPreviousImage = () => {
    setSlideDirection("left");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setSlideDirection("right");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Add fade slide effect for product image change
  const [fade, setFade] = useState(false);

  // New state to track slide direction: "left" or "right"
  const [slideDirection, setSlideDirection] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setFade(true);
      const timer = setTimeout(() => setFade(false), 300); // duration matches CSS animation
      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, selectedProduct]);

  const closeNoProductModal = () => {
    setIsNoProductModalOpen(false)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
  }

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = () => {
    setShowFilters(prev => !prev);
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50
    if (distance > minSwipeDistance) {
      // swipe left
      setSlideDirection("right");
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
      )
    } else if (distance < -minSwipeDistance) {
      // swipe right
      setSlideDirection("left");
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
      )
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <>
      <Navbar />
      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        <div className="page-content max-w-7xl mx-auto">
          <div className="content px-4">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">Produk</h1>
            <p className="mb-8 text-gray-700 dark:text-gray-300">
              Kami menjual dan menyewakan perangkat IT untuk kebutuhan bisnis mu
              dengan menawarkan beberapa merk terbaik:
            </p>

            {/* Brand Logos */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="brand-logo flex items-center justify-center w-24 h-16 p-2 bg-white rounded-lg shadow-md"
                  onClick={() => {
                    if (selectedBrand === brand.name) {
                      setBrandClickCount(brandClickCount + 1)
                      if (brandClickCount + 1 === 2) {
                        setSelectedBrand(null)
                        setBrandClickCount(0)
                      }
                    } else {
                      setSelectedBrand(brand.name)
                      setBrandClickCount(1)
                    }
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="filter-wrapper">
            <div className="search-bar">
              <select 
                className="category-select"
                value={selectedBrand || ""}
                onChange={(e) => {
                  const brandValue = e.target.value;
                  setSelectedBrand(brandValue === "" ? null : brandValue);
                  setBrandClickCount(0); // Reset click count when using dropdown
                }}
              >
                <option value="">Semua Merk</option>
                {brands.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
                </select>
                <input type="text" className="search-input" placeholder="Cari Produk" />
                <button className="filter-button" onClick={toggleFilter}>
                  Filter <FaFilter />
                </button>
              </div>

              {showFilters && (
                <div className="product-section">
                  <div className="product-filters">
                    <span style={{ marginLeft: "10px"}}>Filter Produk:</span>
                    <div className="filter-tags">
                      {['Hardware', 'Software', 'Computer', 'Laptop', 'Smartphone', 'Sparepart'].map(tag => (
                        <button key={tag} className="tag-button">{tag}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              {selectedBrand ? `Produk ${selectedBrand}` : "Produk Populer"} ({(selectedBrand ? products.filter(product => product.brand === selectedBrand) : products).length})
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(selectedBrand
                ? products.filter((product) => product.brand === selectedBrand)
                : products
              ).length > 0 ? (
                (selectedBrand
                  ? products.filter((product) => product.brand === selectedBrand)
                  : products
                ).map((product) => (
                  <div
                    key={product.id}
                    className="product-card bg-blue-900 rounded-3xl p-8 flex flex-row text-white items-start shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                    style={{ cursor: "pointer" }}
                    onClick={() => openModal(product)}
                  >
                  <div className="flex flex-col items-center mr-8 separator-line">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : ""}
                  alt={product.name}
                  style={isMobile ? { width: "80px", height: "80px", objectFit: "contain", opacity: fade ? 0 : 1, transition: "opacity 0.3s ease" } : { width: "300px", height: "300px", objectFit: "contain", opacity: fade ? 0 : 1, transition: "opacity 0.3s ease" }}
                  className="mb-4 rounded-lg"
                />
                    <h4 className={`font-semibold ${isMobile ? "text-base" : "text-2xl"}`} style={{fontSize: isMobile ? "14px" : "18px"}}>{product.name}</h4>
                    <h4 className={`font-medium text-gray-300 ${isMobile ? "text-xs" : "text-md"}`} style={{fontSize: isMobile ? "12px" : "14px"}}>{product.brand}</h4>
                    {isMobile && (
                      <ul className="space-y-2 text-sm border-t border-white pt-2 mt-2 w-full">
                        <li className="flex items-center gap-3">
                          <span style={{ marginRight: "0.5rem" }}>🧠</span> {product.specs.cpu}
                        </li>
                        <li className="flex items-center gap-3">
                          <span style={{ marginRight: "0.5rem" }}>🎮</span> {product.specs.gpu}
                        </li>
                        <li className="flex items-center gap-3">
                          <span style={{ marginRight: "0.5rem" }}>💾</span> {product.specs.ram}
                        </li>
                        <li className="flex items-center gap-3">
                          <span style={{ marginRight: "0.5rem" }}>🗄️</span> {product.specs.storage}
                        </li>
                        <li className="flex items-center gap-3">
                          <span style={{ marginRight: "0.5rem" }}>🖥️</span> {product.specs.os}
                        </li>
                      </ul>
                    )}
                  </div>
  
                  {!isMobile && (
                    <div className="flex-1">
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-4">
                          <span style={{ marginRight: "0.5rem" }}>🧠</span> {product.specs.cpu}
                        </li>
                        <li className="flex items-center gap-4">
                          <span style={{ marginRight: "0.5rem" }}>🎮</span> {product.specs.gpu}
                        </li>
                        <li className="flex items-center gap-4">
                          <span style={{ marginRight: "0.5rem" }}>💾</span> {product.specs.ram}
                        </li>
                        <li className="flex items-center gap-4">
                          <span style={{ marginRight: "0.5rem" }}>🗄️</span> {product.specs.storage}
                        </li>
                        <li className="flex items-center gap-4">
                          <span style={{ marginRight: "0.5rem" }}>🖥️</span> {product.specs.os}
                        </li>
                      </ul>
                    </div>
                  )}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
              {isModalOpen && selectedProduct && (
                <div
                  className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={closeModal}
                >
                  <div
                    className="modal-content bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full text-gray-900 dark:text-white shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center space-x-4">
                {!isMobile && (
                  <button
                  className="text-white rounded-lg transition-colors duration-300"
                  style={{ width: "80px", height: "80px", backgroundColor: "transparent", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(-20%) translateY(0)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousImage();
                  }}
                >
                  <img src={PrevIcon} alt="Previous" style={{ width: "60px", height: "60px", margin: 0, padding: 0 }} />
                </button>
                )}
                <img
                  src={selectedProduct.images && selectedProduct.images.length > 0 ? selectedProduct.images[currentImageIndex] : ""}
                  alt={selectedProduct.name}
                  className={`w-48 h-auto object-contain rounded-lg shadow-md ${
                    slideDirection === "right"
                      ? "slide-in-right"
                      : slideDirection === "left"
                      ? "slide-in-left"
                      : ""
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onAnimationEnd={() => setSlideDirection(null)}
                />
                {!isMobile && (
                  <button
                  className="text-white rounded-lg transition-colors duration-300"
                  style={{ width: "80px", height: "80px", backgroundColor: "transparent", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: "translateX(20%) translateY(0)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                >
                  <img src={NextIcon} alt="Next" style={{ width: "60px", height: "60px", margin: 0, padding: 0 }} />
                </button>
                )}
              </div>
              <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
              <p className="font-semibold">Brand: {selectedProduct.brand}</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-3">
                  <span style={{ marginRight: "0.5rem" }}>🧠</span> {selectedProduct.specs.cpu}
                </li>
                <li className="flex items-center gap-3">
                  <span style={{ marginRight: "0.5rem" }}>🎮</span> {selectedProduct.specs.gpu}
                </li>
                <li className="flex items-center gap-3">
                  <span style={{ marginRight: "0.5rem" }}>💾</span> {selectedProduct.specs.ram}
                </li>
                <li className="flex items-center gap-3">
                  <span style={{ marginRight: "0.5rem" }}>🗄️</span> {selectedProduct.specs.storage}
                </li>
                <li className="flex items-center gap-3">
                  <span style={{ marginRight: "0.5rem" }}>🖥️</span> {selectedProduct.specs.os}
                </li>
              </ul>
              <div className="flex space-x-6">
                <a
                  href={`https://wa.me/628975808407?text=${encodeURIComponent(`Saya berminat pada unit produk ${selectedProduct.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-blue-900 hover:bg-blue-700 hover:text-green-500 text-white rounded-lg transition-colors duration-300 inline-flex items-center justify-center ${isMobile ? "px-4 py-1 text-sm" : "px-6 py-2"}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#25D366"
                    viewBox="0 0 24 24"
                    strokeWidth="0"
                    stroke="none"
                    style={{ width: "16px", height: "16px", marginRight: "0.5rem" }}
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.04L0 24l6.04-1.64A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.5a9.5 9.5 0 01-4.84-1.38l-.35-.21-3.58.97.96-3.5-.23-.36A9.5 9.5 0 1121.5 12c0 5.25-4.25 9.5-9.5 9.5zm5.3-7.1c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.16.19-.32.21-.6.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.32.44-.48.15-.16.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.55-.46-.48-.64-.49-.16-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44 0 1.44 1.03 2.83 1.17 3.03.13.19 2.02 3.08 4.9 4.32.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
                  </svg>
                  Hubungi kami
                </a>
                <button
                  className={`bg-blue-900 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 ${isMobile ? "px-4 py-1 text-sm" : "px-6 py-2"}`}
                  style={{ marginLeft: "1rem" }}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* No Product Modal */}
      {isNoProductModalOpen && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeNoProductModal}
        >
          <div
            className="modal-content bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full text-gray-900 dark:text-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center space-y-6">
              <h3 className="text-2xl font-bold">Produk Tidak Ditemukan</h3>
              <p className="text-center">Maaf, produk dari merk ini tidak tersedia.</p>
              <button
                className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                onClick={closeNoProductModal}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
