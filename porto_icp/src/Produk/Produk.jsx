import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navigation/Navbar";
import "./produk.css";
import "./manual_additions.css";
import Footer from "../Navigation/footer";
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
      <div className="product-header">
        <div className="header-text">
          <h1>Produk Komputer</h1>
          <p>Temukan berbagai pilihan Komputer dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda.</p>
        </div>
        <div className="search-filter-bar">
          <h5 style={{ marginRight: "10px", color: "#1434a4" }}>Cari:</h5>
          <input
            type="text"
            placeholder="Cari barang..."
            value={searchQuery}
            onChange={onSearchChange}
            className="search-input"
          />
          <select
            value={selectedBrand}
            onChange={onBrandChange}
            className="brand-select"
          >
            <option value="">Semua Merek</option>
            {brandOptions.map((brand, idx) => (
              <option key={idx} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <div className="page-content max-w-7xl mx-auto">
          <ProductHeader
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            selectedBrand={selectedBrand}
            onBrandChange={(e) => setSelectedBrand(e.target.value)}
            brandOptions={brands.map(brand => brand.name)}
          />

          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white" style={{ marginLeft: "10px", marginTop: "30px" }}>
            {selectedBrand ? `Produk ${selectedBrand}` : "Produk Populer"} ({filteredProducts.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="product-card bg-blue-900 rounded-3xl p-8 flex flex-row text-white items-start shadow-xl hover:shadow-2xl transition-shadow duration-300"
                style={{ width: "80%" }}
                onClick={() => openModal(product)}
              >
                <div className="flex flex-col items-center mr-8">
                  <img
                    src={product.images?.[0] || ""}
                    alt={product.name}
                    style={isMobile ? { width: "80px", height: "80px" } : { width: "auto", height: "200px" }}
                    className={`mb-4 rounded-lg object-contain transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <h4 className={`font-semibold ${isMobile ? "text-base" : "text-2xl"}`}>{product.name}</h4>
                  <h4 className={`font-medium text-gray-300 ${isMobile ? "text-xs" : "text-md"}`}>{product.brand}</h4>
                  {isMobile && (
                    <ul className="space-y-2 text-sm border-t border-white pt-2 mt-2 w-full">
                      <li>🧠 {product.specs.cpu}</li>
                      <li>🎮 {product.specs.gpu}</li>
                      <li>💾 {product.specs.ram}</li>
                      <li>🗄️ {product.specs.storage}</li>
                      <li>🖥️ {product.specs.os}</li>
                    </ul>
                  )}
                </div>

                {!isMobile && (
                  <div className="flex-1">
                    <ul className="space-y-3 text-sm">
                      <li>🧠 {product.specs.cpu}</li>
                      <li>🎮 {product.specs.gpu}</li>
                      <li>💾 {product.specs.ram}</li>
                      <li>🗄️ {product.specs.storage}</li>
                      <li>🖥️ {product.specs.os}</li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

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
                  <button onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }}>
                    <img src={PrevIcon} alt="Previous" className="w-12" />
                  </button>
                )}
                <img
                  src={selectedProduct.images[currentImageIndex] || ""}
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
                  <button onClick={(e) => { e.stopPropagation(); goToNextImage(); }}>
                    <img src={NextIcon} alt="Next" className="w-12" />
                  </button>
                )}
              </div>
              <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
              <p className="font-semibold">Brand: {selectedProduct.brand}</p>
              <ul className="space-y-2 text-sm">
                <li>🧠 {selectedProduct.specs.cpu}</li>
                <li>🎮 {selectedProduct.specs.gpu}</li>
                <li>💾 {selectedProduct.specs.ram}</li>
                <li>🗄️ {selectedProduct.specs.storage}</li>
                <li>🖥️ {selectedProduct.specs.os}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
