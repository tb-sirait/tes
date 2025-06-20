import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import produkData from "./produk.json";
import { FaFilter, FaSearch } from 'react-icons/fa';

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const [fade, setFade] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to import images dynamically from JSON references
  function importImagesFromJson(jsonData) {
    const images = import.meta.glob('../assets/produk/**/*.{png,jpg,jpeg,svg}', { eager: true });
    const imageMap = {};
    for (const path in images) {
      const key = path.replace('../assets/', '');
      imageMap[key] = images[path].default;
    }
    return jsonData.map(product => ({
      ...product,
      images: product.images.map(imagePath => imageMap[imagePath] || '')
    }));
  }

  const products = importImagesFromJson(produkData);

  const filteredProducts = products.filter(product => {
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const brands = [
    { name: "Dell", logo: DellLogo },
    { name: "Lenovo", logo: LenovoLogo },
    { name: "Cisco", logo: CiscoLogo },
    { name: "Samsung", logo: SamsungLogo },
    { name: "Asus", logo: AsusLogo },
    { name: "HP", logo: HpLogo },
    { name: "InFocus", logo: InfocusLogo },
    { name: "Apple", logo: AppleLogo },
  ];

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const goToPreviousImage = () => {
    setSlideDirection("left");
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setSlideDirection("right");
    setCurrentImageIndex(prevIndex =>
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (selectedProduct) {
      setFade(true);
      const timer = setTimeout(() => setFade(false), 300);
      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, selectedProduct]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      setSlideDirection("right");
      setCurrentImageIndex(prevIndex =>
        prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
      );
    } else if (distance < -minSwipeDistance) {
      setSlideDirection("left");
      setCurrentImageIndex(prevIndex =>
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
      );
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const ProductHeader = ({
    searchQuery,
    onSearchChange,
    selectedBrand,
    onBrandChange,
    brandOptions,
  }) => {
    return (
      <>
        <style jsx>{`
          .product-header {
            background: linear-gradient(135deg, #667eea 0%, #1434a4 100%);
            border-radius: 24px;
            padding: 3rem 2rem;
            margin-bottom: 2rem;
            color: white;
            position: relative;
            overflow: hidden;
          }

          .product-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
          }

          .header-content {
            position: relative;
            z-index: 1;
          }

          .header-text h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
            background: linear-gradient(45deg, #ffffff, #e0e7ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .header-text p {
            font-size: 1.2rem;
            line-height: 1.6;
            opacity: 0.95;
            max-width: 800px;
            margin-bottom: 2rem;
          }

          .search-filter-container {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
            margin-top: 2rem;
          }

          .search-wrapper {
            position: relative;
            flex: 1;
            min-width: 300px;
          }

          .search-input {
            width: 100%;
            padding: 1rem 1rem 1rem 3rem;
            border: none;
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            font-size: 1rem;
            color: #333;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }

          .search-input:focus {
            outline: none;
            background: white;
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
            transform: translateY(-2px);
          }

          .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
            font-size: 1.1rem;
          }

          .brand-select {
            padding: 1rem 1.5rem;
            border: none;
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            font-size: 1rem;
            color: #333;
            min-width: 200px;
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }

          .brand-select:focus {
            outline: none;
            background: white;
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .product-header {
              padding: 2rem 1.5rem;
            }

            .header-text h1 {
              font-size: 2.5rem;
            }

            .header-text p {
              font-size: 1rem;
            }

            .search-filter-container {
              flex-direction: column;
              align-items: stretch;
            }

            .search-wrapper {
              min-width: auto;
            }
          }
        `}</style>
        
        <div className="product-header">
          <div className="header-content">
            <div className="header-text">
              <h1>Produk</h1>
              <p>Temukan berbagai pilihan Komputer, Laptop, Smartphone, dan berbagai barang IT lainnya dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda.</p>
            </div>
            
            <div className="search-filter-container">
              <div className="search-wrapper">
                <FaSearch className="search-icon"  />
                <input
                  type="text"
                  placeholder="Cari produk yang Anda butuhkan..."
                  value={searchQuery}
                  onChange={onSearchChange}
                  className="search-input"
                />
              </div>
              
              <select
                value={selectedBrand}
                onChange={onBrandChange}
                className="brand-select"
              >
                <option value="">🏷️ Semua Merek</option>
                {brandOptions.map((brand, idx) => (
                  <option key={idx} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <style jsx>{`
        .main-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
        }

        .page-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 2rem 0;
          text-align: center;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .product-card {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s ease;
        }

        .product-card:hover::before {
          left: 100%;
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .product-content {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }

        .product-image-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 200px;
        }

        .product-image {
          width: 180px;
          height: 180px;
          object-fit: contain;
          border-radius: 16px;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .product-image.fade {
          opacity: 0;
        }

        .product-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .product-brand {
          font-size: 1rem;
          color: #64748b;
          font-weight: 500;
          text-align: center;
          padding: 0.5rem 1rem;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border-radius: 50px;
          margin-bottom: 1rem;
        }

        .product-specs {
          flex: 1;
        }

        .specs-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 1rem;
        }

        .spec-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc, #ffffff);
          border-radius: 12px;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #374151;
        }

        .spec-item:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }

        .spec-icon {
          font-size: 1.2rem;
          margin-right: 0.75rem;
        }

        /* Mobile Styles */
        .mobile-specs {
          width: 100%;
          margin-top: 1rem;
        }

        .mobile-spec-item {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          background: linear-gradient(135deg, #f1f5f9, #ffffff);
          border-radius: 8px;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #374151;
          border-left: 3px solid #667eea;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          padding: 2.5rem;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
          position: relative;
        }

        .modal-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .modal-image {
          width: 300px;
          height: 300px;
          object-fit: contain;
          border-radius: 16px;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          padding: 1rem;
        }

        .nav-button {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .nav-button:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .nav-button img {
          width: 20px;
          filter: brightness(0) invert(1);
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          text-align: center;
          margin-bottom: 1rem;
        }

        .modal-brand {
          font-size: 1.1rem;
          color: white;
          background: linear-gradient(45deg, #667eea, #764ba2);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .modal-specs {
          display: grid;
          gap: 1rem;
        }

        .modal-spec-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc, #ffffff);
          border-radius: 12px;
          border-left: 4px solid #667eea;
          font-weight: 500;
          color: #374151;
        }

        /* Animations */
        .slide-in-right {
          animation: slideInRight 0.3s ease-in-out;
        }

        .slide-in-left {
          animation: slideInLeft 0.3s ease-in-out;
        }

        @keyframes slideInRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-content {
            padding: 1rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .product-content {
            flex-direction: column;
            text-align: center;
          }

          .product-image-section {
            min-width: auto;
          }

          .product-image {
            width: 120px;
            height: 120px;
          }

          .modal-content {
            padding: 1.5rem;
            margin: 1rem;
          }

          .modal-image {
            width: 250px;
            height: 250px;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <Navbar />
      <main className="main-container">
        <div className="page-content">
          <ProductHeader
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            selectedBrand={selectedBrand}
            onBrandChange={(e) => setSelectedBrand(e.target.value)}
            brandOptions={brands.map(brand => brand.name)}
          />

          <h2 className="section-title">
            {selectedBrand ? `Produk ${selectedBrand}` : "Produk Populer"} ({filteredProducts.length})
          </h2>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => openModal(product)}
              >
                <div className="product-content">
                  <div className="product-image-section">
                    <img
                      src={product.images?.[0] || ""}
                      alt={product.name}
                      className={`product-image ${fade ? 'fade' : ''}`}
                    />
                    <h4 className="product-title">{product.name}</h4>
                    <div className="product-brand">{product.brand}</div>
                    
                    {isMobile && (
                      <div className="mobile-specs">
                        <div className="mobile-spec-item">
                          <span className="spec-icon">🧠</span> {product.specs.cpu}
                        </div>
                        <div className="mobile-spec-item">
                          <span className="spec-icon">🎮</span> {product.specs.gpu}
                        </div>
                        <div className="mobile-spec-item">
                          <span className="spec-icon">💾</span> {product.specs.ram}
                        </div>
                        <div className="mobile-spec-item">
                          <span className="spec-icon">🗄️</span> {product.specs.storage}
                        </div>
                        <div className="mobile-spec-item">
                          <span className="spec-icon">🖥️</span> {product.specs.os}
                        </div>
                      </div>
                    )}
                  </div>

                  {!isMobile && (
                    <div className="product-specs">
                      <ul className="specs-list">
                        <li className="spec-item">
                          <span className="spec-icon">🧠</span> {product.specs.cpu}
                        </li>
                        <li className="spec-item">
                          <span className="spec-icon">🎮</span> {product.specs.gpu}
                        </li>
                        <li className="spec-item">
                          <span className="spec-icon">💾</span> {product.specs.ram}
                        </li>
                        <li className="spec-item">
                          <span className="spec-icon">🗄️</span> {product.specs.storage}
                        </li>
                        <li className="spec-item">
                          <span className="spec-icon">🖥️</span> {product.specs.os}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-container">
              {!isMobile && (
                <button 
                  className="nav-button"
                  onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }}
                >
                  <img src={PrevIcon} alt="Previous" />
                </button>
              )}
              
              <img
                src={selectedProduct.images[currentImageIndex] || ""}
                alt={selectedProduct.name}
                className={`modal-image ${
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
                  className="nav-button"
                  onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                >
                  <img src={NextIcon} alt="Next" />
                </button>
              )}
            </div>
            
            <h3 className="modal-title">{selectedProduct.name}</h3>
            <div className="modal-brand">Brand: {selectedProduct.brand}</div>
            
            <div className="modal-specs">
              <div className="modal-spec-item">
                <span className="spec-icon">🧠</span> {selectedProduct.specs.cpu}
              </div>
              <div className="modal-spec-item">
                <span className="spec-icon">🎮</span> {selectedProduct.specs.gpu}
              </div>
              <div className="modal-spec-item">
                <span className="spec-icon">💾</span> {selectedProduct.specs.ram}
              </div>
              <div className="modal-spec-item">
                <span className="spec-icon">🗄️</span> {selectedProduct.specs.storage}
              </div>
              <div className="modal-spec-item">
                <span className="spec-icon">🖥️</span> {selectedProduct.specs.os}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
}