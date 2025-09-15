import React, { useState, useEffect, useRef, useMemo } from "react";

import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import produkData from "./produk.json";
import { FaFilter, FaSearch } from "react-icons/fa";
import "./Produk.css";

import DellLogoWhite from "../assets/Dell_logo_white.png";
import XiaomiLogo from "../assets/xiaomi_logo.webp";
import LenovoLogo from "../assets/lenovo_logo.png";
import CiscoLogo from "../assets/Cisco_logo.png";
import SamsungLogo from "../assets/samsung_logo.png";
import AsusLogoWhite from "../assets/Asus_logo_white.png";
import HpLogoWhite from "../assets/hp_logo_white.png";
import InfocusLogo from "../assets/Infocus_logo.png";
import AppleLogo from "../assets/Apple_logo.png";
import AcerLogo from "../assets/Acer_logo.png";
import PrevIcon from "../assets/produk/icon/prev.png";
import NextIcon from "../assets/produk/icon/next.png";

import { MemoryStick, Gpu, Cpu, AppWindow, HardDrive, X } from "lucide-react";

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
    const images = import.meta.glob(
      "../assets/produk/**/*.{png,jpg,jpeg,svg}",
      { eager: true },
    );
    const imageMap = {};
    for (const path in images) {
      const key = path.replace("../assets/", "");
      imageMap[key] = images[path].default;
    }
    return jsonData.map((product) => ({
      ...product,
      images: product.images.map((imagePath) => imageMap[imagePath] || ""),
    }));
  }

  // simpan hasil import sekali saja
  const products = useMemo(() => importImagesFromJson(produkData), []);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // cegah reload halaman
    const results = products.filter((product) => {
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });
    setFilteredProducts(results);
  };

  const brands = [
    { name: "Dell", logo: DellLogoWhite },
    { name: "Lenovo", logo: LenovoLogo },
    { name: "Cisco", logo: CiscoLogo },
    { name: "Samsung", logo: SamsungLogo },
    { name: "Asus", logo: AsusLogoWhite },
    { name: "HP", logo: HpLogoWhite },
    { name: "InFocus", logo: InfocusLogo },
    { name: "Apple", logo: AppleLogo },
    { name: "Acer", logo: AcerLogo },
    { name: "Xiaomi", logo: XiaomiLogo },
  ];

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedProduct(null);
      setIsClosing(false);
    }, 300); // match animation duration
  };

  const goToPreviousImage = () => {
    setSlideDirection("left");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1,
    );
  };

  const goToNextImage = () => {
    setSlideDirection("right");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1,
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
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1,
      );
    } else if (distance < -minSwipeDistance) {
      setSlideDirection("left");
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1,
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
    onSearchSubmit,
  }) => {
    return (
      <div className="header-product">
        <div className="header-content">
          <div className="header-text">
            <h1>Produk</h1>
            <p>
              Temukan berbagai pilihan Komputer, Laptop, Smartphone, dan
              berbagai barang IT lainnya dengan spesifikasi terbaik yang sesuai
              dengan kebutuhan perusahaan Anda.
            </p>
          </div>

          {/* Form Search */}
          <form onSubmit={onSearchSubmit} className="search-filter-container">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
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
                <option key={idx} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <button type="submit" className="btn-search">
              Cari
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main className="main-container">
        <div className="page-content">
          <ProductHeader
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            selectedBrand={selectedBrand}
            onBrandChange={(e) => setSelectedBrand(e.target.value)}
            brandOptions={brands.map((brand) => brand.name)}
            onSearchSubmit={handleSearchSubmit}
          />

          <h2 className="product-section-title">
            {selectedBrand ? `Produk ${selectedBrand}` : "Produk Populer"} (
            {filteredProducts.length})
          </h2>

          <div className="products-grid">
            {filteredProducts.map((product) => (
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
                      className={`product-image ${fade ? "fade" : ""}`}
                    />
                    <h4 className="product-title">{product.name}</h4>
                    {(() => {
                      const brandObj = brands.find(
                        (b) => b.name === product.brand,
                      );
                      if (brandObj && brandObj.logo) {
                        if (product.brand === "Dell") {
                          return (
                            <img
                              src={DellLogoWhite}
                              alt={product.brand}
                              className="product-brand-logo"
                            />
                          );
                        } else if (product.brand === "HP") {
                          return (
                            <img
                              src={HpLogoWhite}
                              alt={product.brand}
                              className="product-brand-logo"
                            />
                          );
                        } else if (product.brand === "Asus") {
                          return (
                            <img
                              src={AsusLogoWhite}
                              alt={product.brand}
                              className="product-brand-logo"
                            />
                          );
                        } else if (product.brand === "Acer") {
                          return (
                            <img
                              src={AcerLogo}
                              alt={product.brand}
                              className="product-brand-logo"
                            />
                          );
                        } else if (product.brand === "Xiaomi") {
                          return (
                            <img
                              src={XiaomiLogo}
                              alt={product.brand}
                              className="product-brand-logo"
                            />
                          );
                        } else {
                          return (
                            <img
                              src={brandObj.logo}
                              alt={product.brand}
                              className="product-brand-logo"
                            />
                          );
                        }
                      } else {
                        return (
                          <div className="product-brand-text">
                            {product.brand}
                          </div>
                        );
                      }
                    })()}

                    {isMobile && (
                      <div className="mobile-specs">
                        <div className="mobile-spec-item">
                          <span className="spec-icon">
                            <Cpu />
                          </span>{" "}
                          {product.specs.cpu}
                        </div>
                        <div className="mobile-spec-item">
                          <span className="spec-icon">
                            <Gpu />
                          </span>{" "}
                          {product.specs.gpu}
                        </div>
                        <div className="mobile-spec-item">
                          <span className="spec-icon">
                            <MemoryStick />
                          </span>{" "}
                          {product.specs.ram}
                        </div>
                        <div className="mobile-spec-item">
                          <span className="spec-icon">
                            <HardDrive />
                          </span>{" "}
                          {product.specs.storage}
                        </div>
                        <div className="mobile-spec-item">
                          <span className="spec-icon">
                            <AppWindow />
                          </span>{" "}
                          {product.specs.os}
                        </div>
                      </div>
                    )}
                  </div>

                  {!isMobile && (
                    <div className="product-specs">
                      <ul className="specs-list">
                        <li className="spec-item">
                          <span className="spec-icon">
                            <Cpu />
                          </span>{" "}
                          {product.specs.cpu}
                        </li>
                        <li className="spec-item">
                          <span className="spec-icon">
                            <Gpu />
                          </span>{" "}
                          {product.specs.gpu}
                        </li>
                        <li className="spec-item">
                          <span className="spec-icon">
                            <MemoryStick />
                          </span>{" "}
                          {product.specs.ram}
                        </li>
                        <li className="spec-item">
                          <span className="spec-icon">
                            <HardDrive />
                          </span>{" "}
                          {product.specs.storage}
                        </li>
                        <li className="spec-item">
                          <span className="spec-icon">
                            <AppWindow />
                          </span>{" "}
                          {product.specs.os}
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
        <div
          className={`modal-overlay ${isClosing ? "fade-out" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`modal-content ${isClosing ? "fade-out" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="closeModalButton">
              {isMobile && (
                <button className="product-close-button" onClick={closeModal}>
                  <X />
                </button>
              )}
            </div>
            <div className="modal-image-container">
              {!isMobile && (
                <button
                  className="nav-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousImage();
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                >
                  <img src={NextIcon} alt="Next" />
                </button>
              )}
            </div>

            <h3 className="modal-title">{selectedProduct.name}</h3>
            <div className="modal-brand">Brand: {selectedProduct.brand}</div>

            <div className="modal-specs">
              <div className="modal-spec-item">
                <span className="spec-icon">
                  <Cpu />
                </span>{" "}
                {selectedProduct.specs.cpu}
              </div>
              <div className="modal-spec-item">
                <span className="spec-icon">
                  <Gpu />
                </span>{" "}
                {selectedProduct.specs.gpu}
              </div>
              <div className="modal-spec-item">
                <span className="spec-icon">
                  <MemoryStick />
                </span>{" "}
                {selectedProduct.specs.ram}
              </div>
              <div className="modal-spec-item">
                <span className="spec-icon">
                  <HardDrive />
                </span>{" "}
                {selectedProduct.specs.storage}
              </div>
              <div className="modal-spec-item">
                <span className="spec-icon">
                  <AppWindow />
                </span>{" "}
                {selectedProduct.specs.os}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
