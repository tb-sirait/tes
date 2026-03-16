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
import {
  FaFilter,
  FaSearch,
  FaWhatsapp,
  FaTimes,
  FaChevronRight, 
  FaChevronDown,
  FaSort,
  FaFileAlt as File,
} from "react-icons/fa";
import "./produk.css";

import { Helmet } from "react-helmet";
import PrevIcon from "../assets/produk/icon/prev.png";
import NextIcon from "../assets/produk/icon/next.png";
import kantorICP from "../assets/kantor_icp(landscape1).webp";

import { MemoryStick, Gpu, Cpu, AppWindow, HardDrive, X } from "lucide-react";

// Static data — defined outside component so it never causes stale-closure warnings
const CATEGORIES = [
  { name: "Software", path: "software" },
  { name: "Hardware", path: "hardware" },
  { name: "Server", path: "server" },
  { name: "Komputer", path: "computer" },
  { name: "Laptop", path: "laptop" },
  { name: "Sparepart", path: "sparepart" },
  { name: "Smartphone", path: "smartphone" },
];

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

  // Mobile collapse states
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const Breadcrumb = () => {
    return (
      <div className="produk-breadcrumb-container">
        <div className="produk-breadcrumb-wrapper">
          <button
            className="produk-breadcrumb-item"
            onClick={() => navigate("/")}
          >
            Beranda
          </button>

          <FaChevronRight className="produk-breadcrumb-separator" />

          {category ? (
            <>
              <button
                className="produk-breadcrumb-item"
                onClick={() => navigate("/produk")}
              >
                Produk
              </button>

              <FaChevronRight className="produk-breadcrumb-separator" />

              <span className="produk-breadcrumb-item produk-breadcrumb-active">
                {CATEGORIES.find((cat) => cat.path === category)?.name ||
                  category}
              </span>
            </>
          ) : (
            <>
              <span className="produk-breadcrumb-item produk-breadcrumb-active">
                Produk
              </span>
            </>
          )}
        </div>
      </div>
    );
  };

  // Filter produk
  const filterProducts = useCallback(() => {
    let results = [...products];

    if (selectedCategory) {
      results = results.filter(
        (product) =>
          product.jenis.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (selectedBrand) {
      results = results.filter(
        (product) =>
          product.brand.toLowerCase() === selectedBrand.toLowerCase(),
      );
    }

    if (selectedType) {
      results = results.filter(
        (product) =>
          product.type &&
          product.type.toLowerCase() === selectedType.toLowerCase(),
      );
    }

    if (searchQuery) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortByRelease) {
      results.sort((a, b) => {
        const dateA = new Date(a.released_date || 0);
        const dateB = new Date(b.released_date || 0);
        return dateB - dateA;
      });
    }

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
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("");
    }

    if (brand && id) {
      const found = products.find(
        (p) =>
          p.id.toString() === id &&
          p.brand.toLowerCase() === brand.toLowerCase(),
      );

      if (found) {
        if (category && found.jenis.toLowerCase() !== category.toLowerCase()) {
          navigate(`/produk/${found.jenis.toLowerCase()}/${brand}/${id}`);
        } else {
          setSelectedProduct(found);
          setCurrentImageIndex(0);
          setIsModalOpen(true);
        }
      } else {
        setIsModalOpen(false);
        setSelectedProduct(null);
        const basePath = category ? `/produk/${category}` : "/produk";
        navigate(basePath);
      }
    } else {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  }, [brand, id, category, products, navigate]);

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
    // Auto-collapse sidebar on mobile setelah pilih kategori
    if (isMobile) {
      setTimeout(() => setIsSidebarOpen(false), 150);
    }
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

  // Label for active filter summary (mobile sidebar toggle)
  const activeFilterLabel = useMemo(() => {
    const parts = [];
    if (selectedCategory) {
      const found = CATEGORIES.find((c) => c.path === selectedCategory);
      if (found) parts.push(found.name);
    }
    if (selectedBrand) parts.push(selectedBrand);
    if (selectedType) parts.push(selectedType);
    return parts.join(", ");
  }, [selectedCategory, selectedBrand, selectedType]);

  // Sort label for mobile toggle button
  const sortLabel = useMemo(() => {
    const byLabel = sortBy === "nama" ? "Nama" : "Tgl Rilis";
    const orderLabel = sortOrder === "asc" ? "A-Z" : "Z-A";
    return `Urut: ${byLabel} · ${orderLabel}`;
  }, [sortBy, sortOrder]);

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
          <Breadcrumb />

          {/* Search and Sort Bar */}
          <div className="produk-search-sort-container">
            {/* Search */}
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

            {/* Mobile: Sort toggle button */}
            <button
              className={`produk-sort-toggle-btn ${isSortOpen ? "open" : ""}`}
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-expanded={isSortOpen}
            >
              <span>
                <FaSort style={{ marginRight: 6, opacity: 0.7 }} />
                {sortLabel}
              </span>
              <FaChevronDown />
            </button>

            {/* Sort panel: collapsible on mobile, always visible on desktop */}
            <div className={`produk-sort-panel ${isSortOpen ? "open" : ""}`}>
              <div className="produk-sort-panel-inner">
                <label>Urut berdasarkan:</label>
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

            {/* Desktop sort wrapper (hidden on mobile via CSS) */}
            <div className="produk-sort-wrapper">
              <label>Urut berdasarkan:</label>
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
              {/* Mobile: collapsible header */}
              <div
                className="produk-sidebar-header"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                role="button"
                aria-expanded={isSidebarOpen}
              >
                <span className="produk-sidebar-header-title">
                  <FaFilter style={{ fontSize: 12, opacity: 0.7 }} />
                  Kategori &amp; Filter
                  {activeFilterLabel && (
                    <span className="produk-active-badge">
                      {activeFilterLabel}
                    </span>
                  )}
                </span>
                <FaChevronDown
                  className={`produk-sidebar-header-chevron ${isSidebarOpen ? "open" : ""}`}
                />
              </div>

              {/* Collapsible body (mobile), always visible (desktop) */}
              <div className={`produk-sidebar-body ${isSidebarOpen ? "open" : ""}`}>
                <div className="produk-sidebar-body-inner">
                  <h3>Kategori</h3>
                  <ul className="produk-category-list">
                    {CATEGORIES.map((cat, idx) => (
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
                </div>
              </div>

              {/* Desktop sidebar content (always rendered, shown via CSS) */}
              <div className="produk-sidebar-desktop-only">
                <h3>Kategori</h3>
                <ul className="produk-category-list">
                  {CATEGORIES.map((cat, idx) => (
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
              </div>
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
              <div className="produk-action-buttons-container">
                <button
                  className="produk-btn produk-btn-detail"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/produk/${selectedProduct.jenis.toLowerCase()}/${selectedProduct.brand}/${selectedProduct.id}`,
                    );
                  }}
                >
                  <span className="produk-btn-icon">
                    <File />
                  </span>
                  <span>Detail Selengkapnya</span>
                </button>

                <a
                  href={`https://wa.me/6285545031039?text=Saya%20tertarik%20dengan%20produk%20${encodeURIComponent(
                    selectedProduct.name,
                  )}%20dari%20Infoduta%20Computindo%20Perkasa.%20Apakah%20produk%20ini%20masih%20tersedia?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="produk-btn produk-btn-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="produk-logo-icon">
                    <FaWhatsapp />
                  </span>
                  <span>Konsultasi via WhatsApp</span>
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