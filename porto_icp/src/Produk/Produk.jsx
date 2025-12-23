import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/footer";
import produkData from "./produk.json";
import { FaFilter, FaSearch, FaWhatsapp, FaTimes } from "react-icons/fa";
import "./Produk.css";

import { Helmet } from "react-helmet";

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
import kantorICP from "../assets/kantor_icp(landscape1).webp";

import { MemoryStick, Gpu, Cpu, AppWindow, HardDrive, X } from "lucide-react";

export default function Produk() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const [fade, setFade] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortByRelease, setSortByRelease] = useState(false);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");

  const { brand, id, category } = useParams();
  const navigate = useNavigate();

  const searchTimeout = useRef(null);
  const mainContentRef = useRef(null);

  // Function to check if product is new (released in current year)
  const isNewProduct = (releaseDate) => {
    if (!releaseDate) return false;
    const currentYear = new Date().getFullYear();
    const productYear = new Date(releaseDate).getFullYear();
    return productYear === currentYear;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Trigger hero animation
    setTimeout(() => {
      setHeroAnimated(true);
    }, 100);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Wrap closeModal in useCallback to prevent unnecessary re-renders
  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedProduct(null);
      setIsClosing(false);
      // Kembali ke halaman sebelumnya (kategori atau /produk)
      const basePath = category ? `/produk/${category}` : "/produk";
      navigate(basePath);
    }, 300);
  }, [navigate, category]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen, closeModal]);

  // Import gambar dari JSON
  function importImagesFromJson(jsonData) {
    const images = import.meta.glob(
      "../assets/produk/**/*.{png,jpg,jpeg,svg}",
      {
        eager: true,
      },
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

  const products = useMemo(() => importImagesFromJson(produkData), []);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter produk
  const filterProducts = useCallback(() => {
    let results = [...products];

    // Filter by category
    if (selectedCategory) {
      results = results.filter(
        (product) =>
          product.jenis.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Filter by brand
    if (selectedBrand) {
      results = results.filter(
        (product) =>
          product.brand.toLowerCase() === selectedBrand.toLowerCase(),
      );
    }

    // Filter by type
    if (selectedType) {
      results = results.filter(
        (product) =>
          product.type &&
          product.type.toLowerCase() === selectedType.toLowerCase(),
      );
    }

    // Filter by search query
    if (searchQuery) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by release date
    if (sortByRelease) {
      results.sort((a, b) => {
        const dateA = new Date(a.released_date || 0);
        const dateB = new Date(b.released_date || 0);
        return dateB - dateA; // Newest first
      });
    }

    // Sort by selected option
    if (sortBy === "nama") {
      results.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    } else if (sortBy === "tanggal") {
      results.sort((a, b) => {
        const dateA = new Date(a.released_date || 0);
        const dateB = new Date(b.released_date || 0);
        if (sortOrder === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    }

    setFilteredProducts(results);
  }, [
    products,
    selectedCategory,
    selectedBrand,
    selectedType,
    searchQuery,
    sortByRelease,
    sortBy,
    sortOrder,
  ]);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    setIsLoading(true);
    searchTimeout.current = setTimeout(() => {
      filterProducts();
      setIsLoading(false);
    }, 1000);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedType,
    sortByRelease,
    sortBy,
    sortOrder,
    filterProducts,
  ]);

  const categories = [
    { name: "Software", path: "software" },
    { name: "Hardware", path: "hardware" },
    { name: "Server", path: "server" },
    { name: "Komputer", path: "komputer" },
    { name: "Laptop", path: "laptop" },
    { name: "Sparepart", path: "sparepart" },
    { name: "Smartphone", path: "smartphone" },
  ];

  // Get unique types from products
  const uniqueTypes = useMemo(() => {
    const types = new Set();
    products.forEach((product) => {
      if (product.type) {
        types.add(product.type);
      }
    });
    return Array.from(types);
  }, [products]);

  // Get unique brands from products
  const uniqueBrands = useMemo(() => {
    const brands = new Set();
    products.forEach((product) => {
      if (product.brand) {
        brands.add(product.brand);
      }
    });
    return Array.from(brands);
  }, [products]);

  // === ROUTE SYNC ===
  useEffect(() => {
    // Set kategori dari URL jika ada
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("");
    }

    // Cek apakah ada brand dan id di URL untuk membuka modal
    if (brand && id) {
      const found = products.find(
        (p) =>
          p.id.toString() === id &&
          p.brand.toLowerCase() === brand.toLowerCase(),
      );
      if (found) {
        setSelectedProduct(found);
        setCurrentImageIndex(0);
        setIsModalOpen(true);
      } else {
        // Jika produk tidak ditemukan, redirect ke halaman produk
        setIsModalOpen(false);
        setSelectedProduct(null);
      }
    } else {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  }, [brand, id, category, products]);

  useEffect(() => {
    document.title = "Produk | Infoduta Computindo Perkasa";

    if (selectedProduct) {
      document.title = `${selectedProduct.name} | Infoduta Computindo Perkasa`;

      const metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          `Dapatkan ${selectedProduct.name} resmi bergaransi dengan spesifikasi lengkap di Infoduta Computindo Perkasa`,
        );
      }
    }

    return () => {
      document.title = "Produk | Infoduta Computindo Perkasa";
      const metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "Solusi IT terbaik, server, storage, dan perangkat komputer resmi bergaransi.",
        );
      }
    };
  }, [selectedProduct]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    // Jika sudah di halaman kategori, tetap di kategori tersebut
    // Jika di halaman /produk, buka modal tanpa menambah kategori ke URL
    const basePath = category ? `/produk/${category}` : "/produk";
    navigate(`${basePath}/${product.brand}/${product.id}`);
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

  const handleCategoryClick = (categoryPath) => {
    navigate(`/produk/${categoryPath}`);
    setSelectedCategory(categoryPath);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedType("");
    setSortByRelease(false);
    setSearchQuery("");
    setSortBy("nama");
    setSortOrder("asc");
    navigate("/produk");
  };

  const scrollToMainContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Temukan berbagai pilihan Komputer, Laptop, Smartphone, dan barang IT lainnya di Infoduta Computindo Perkasa."
        />
        <meta
          name="keywords"
          content="Produk IT, Komputer, Laptop, Smartphone, Hardware, Software, Perangkat Keras, Perangkat Lunak, Teknologi Informasi, Penjualan IT, Penyewaan IT, Solusi Bisnis IT"
        />
        <meta name="author" content="PT Infoduta Computindo Perkasa" />
        <link rel="canonical" href="https://infoduta.com/produk" />
        <meta
          property="og:title"
          content="Produk | Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Komputer, Laptop, Smartphone, dan barang IT lainnya di Infoduta Computindo Perkasa."
        />
        <meta property="og:image" content="/api/og-image/produk" />
        <meta property="og:url" content="https://infoduta.com/produk" />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main className="produk-main-container">
        {/* Hero Section */}
        <div
          className={`produk-hero-section home-hero-section ${heroAnimated ? "produk-hero-animated" : ""}`}
        >
          <img
            src={kantorICP}
            alt="Kantor Infoduta Computindo Perkasa"
            className="produk-hero-image"
          />
          <div
            className={`produk-hero-overlay ${heroAnimated ? "produk-overlay-animated" : ""}`}
          ></div>
          <div
            className={`produk-hero-content ${heroAnimated ? "produk-content-animated" : ""}`}
          >
            <h1>Produk Infoduta</h1>
            <p>
              Kami menyediakan segala solusi produk IT untuk kebutuhan Bisnis
              Anda
            </p>
            <button className="produk-hero-btn" onClick={scrollToMainContent}>
              Jelajahi Produk
            </button>
          </div>
        </div>

        <div className="produk-page-content" ref={mainContentRef}>
          {/* Search and Sort Bar */}
          <div className="produk-search-sort-container">
            <div className="produk-search-wrapper">
              <FaSearch className="produk-search-icon" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="produk-search-input"
              />
            </div>

            <div className="produk-sort-wrapper">
              <label>urut berdasarkan:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="produk-sort-select"
              >
                <option value="nama">Nama</option>
                <option value="tanggal">Tanggal Rilis</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="produk-order-select"
              >
                <option value="asc">A-Z / Terlama</option>
                <option value="desc">Z-A / Terbaru</option>
              </select>
            </div>
          </div>

          <div className="produk-content-wrapper">
            {/* Sidebar Filter */}
            <aside className="produk-sidebar-filter">
              <h3>Kategori</h3>
              <ul className="produk-category-list">
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    className={
                      selectedCategory === cat.path ? "produk-active" : ""
                    }
                    onClick={() => handleCategoryClick(cat.path)}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>

              <h3 className="produk-filter-title">Filter</h3>

              <div className="produk-filter-group">
                <div className="produk-filter-header">
                  <span>Merk{selectedBrand ? `: ${selectedBrand}` : ""}</span>
                </div>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="produk-filter-select"
                >
                  <option value="">Semua Merk</option>
                  {uniqueBrands.map((brand, idx) => (
                    <option key={idx} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="produk-filter-group">
                <div className="produk-filter-header">
                  <span>Tanggal Keluaran</span>
                </div>
                <label className="produk-checkbox-label">
                  <input
                    type="checkbox"
                    checked={sortByRelease}
                    onChange={(e) => setSortByRelease(e.target.checked)}
                  />
                  Terbaru - Terlama
                </label>
              </div>

              <div className="produk-filter-group">
                <div className="produk-filter-header">
                  <span>Tipe{selectedType ? `: ${selectedType}` : ""}</span>
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="produk-filter-select"
                >
                  <option value="">Semua Tipe</option>
                  {uniqueTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="produk-reset-filter-btn"
                onClick={resetFilters}
              >
                Reset Filter
              </button>
            </aside>

            {/* Products Grid */}
            <div className="produk-products-section">
              <h2 className="produk-section-title">
                Menampilkan {filteredProducts.length} Produk
              </h2>

              {isLoading ? (
                <div className="produk-loading-container">
                  <div className="produk-spinner"></div>
                  <p>Memuat produk...</p>
                </div>
              ) : (
                <div className="produk-products-grid">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="produk-product-card"
                      onClick={() => openModal(product)}
                    >
                      <div className="produk-product-content">
                        <div className="produk-product-image-section">
                          {isNewProduct(product.released_date) && (
                            <div className="produk-new-stock-badge">
                              <span>NEW STOCK</span>
                            </div>
                          )}

                          <img
                            src={product.images?.[0] || ""}
                            alt={product.name}
                            className={`produk-product-image ${fade ? "produk-fade" : ""}`}
                          />
                          <h4 className="produk-product-title">
                            {product.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && selectedProduct && (
        <div
          className={`produk-modal-overlay ${isClosing ? "produk-fade-out" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`produk-modal-content ${isClosing ? "produk-fade-out" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="produk-closeModalButton">
              {isMobile && (
                <button
                  className="produk-product-close-button"
                  onClick={closeModal}
                >
                  <X style={{ fontSize: "20px" }} />
                </button>
              )}
            </div>
            <div className="produk-modal-image-container">
              {isNewProduct(selectedProduct.released_date) && (
                <div className="produk-modal-new-stock-badge">
                  <span>NEW STOCK</span>
                </div>
              )}

              {!isMobile && (
                <button
                  className="produk-nav-button"
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
                className={`produk-modal-image ${
                  slideDirection === "right"
                    ? "produk-slide-in-right"
                    : slideDirection === "left"
                      ? "produk-slide-in-left"
                      : ""
                }`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onAnimationEnd={() => setSlideDirection(null)}
              />

              {!isMobile && (
                <button
                  className="produk-nav-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                >
                  <img src={NextIcon} alt="Next" />
                </button>
              )}
            </div>

            <div className="produk-modal-name-brand">
              <div className="produk-modal-brand">{selectedProduct.brand}</div>
              <h3 className="produk-modal-title">{selectedProduct.name}</h3>
              <span>
                {"("}
                {selectedProduct.jenis}
                {")"}
              </span>
            </div>

            <div className="produk-modal-specs">
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <Cpu />
                </span>{" "}
                {selectedProduct.specs.cpu}
              </div>
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <Gpu />
                </span>{" "}
                {selectedProduct.specs.gpu}
              </div>
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <MemoryStick />
                </span>{" "}
                {selectedProduct.specs.ram}
              </div>
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <HardDrive />
                </span>{" "}
                {selectedProduct.specs.storage}
              </div>
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <AppWindow />
                </span>{" "}
                {selectedProduct.specs.os}
              </div>
              <div className="produk-modal-product-description">
                {selectedProduct.deskripsi}
              </div>
              <div className="produk-action-button">
                <span className="produk-logo-icon">
                  <FaWhatsapp />
                </span>
                <a
                  href={`https://wa.me/6285545031039?text=Saya%20tertarik%20dengan%20produk%20${encodeURIComponent(
                    selectedProduct.name,
                  )}%20dari%20Infoduta%20Computindo%20Perkasa.%20Apakah%20produk%20ini%20masih%20tersedia?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="produk-btn produk-btn-primary"
                >
                  Konsultasikan via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
