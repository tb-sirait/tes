import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  const { brand, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  if (isModalOpen) {
    document.documentElement.style.overflow = "hidden";   // kunci scroll di <html>
  } else {
    document.documentElement.style.overflow = "auto";     // hidupkan scroll lagi
  }

  // cleanup
  return () => {
    document.documentElement.style.overflow = "auto";
  };
}, [isModalOpen]);


  // Import gambar dari JSON
  function importImagesFromJson(jsonData) {
    const images = import.meta.glob("../assets/produk/**/*.{png,jpg,jpeg,svg}", {
      eager: true,
    });
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

  const products = useMemo(() => importImagesFromJson(produkData), []);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter produk
  const handleSearchSubmit = (e) => {
    e.preventDefault();
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

  // === ROUTE SYNC ===
  useEffect(() => {
    if (brand && id) {
      const found = products.find(
        (p) =>
          p.id.toString() === id &&
          p.brand.toLowerCase() === brand.toLowerCase()
      );
      if (found) {
        setSelectedProduct(found);
        setCurrentImageIndex(0);
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  }, [brand, id, products]);

  const [isClosing, setIsClosing] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    navigate(`/produk/${product.brand}/${product.id}`);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedProduct(null);
      setIsClosing(false);
      navigate("/produk");
    }, 300);
  };

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
        prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
      );
    } else if (distance < -minSwipeDistance) {
      setSlideDirection("left");
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
      );
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // HEADER
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
              Temukan berbagai pilihan Komputer, Laptop, Smartphone, dan barang IT lainnya.
            </p>
          </div>

          <form onSubmit={onSearchSubmit} className="search-filter-container">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Cari produk..."
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
                  </div>
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
