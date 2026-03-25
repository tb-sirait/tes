import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

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

import PrevIcon from "../assets/produk/icon/prev.png";
import NextIcon from "../assets/produk/icon/next.png";
import kantorICP from "../assets/kantor_icp(landscape1).webp";

import { MemoryStick, Gpu, Cpu, AppWindow, HardDrive, X } from "lucide-react";

// ─── SEO constants ────────────────────────────────────────────────────────────
const BASE_URL = "https://www.infoduta.com";
const SITE_NAME = "Infoduta Computindo Perkasa";

// ─── Static data ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: "Software", path: "software" },
  { name: "Hardware", path: "hardware" },
  { name: "Server", path: "server" },
  { name: "Komputer", path: "computer" },
  { name: "Laptop", path: "laptop" },
  { name: "Sparepart", path: "sparepart" },
  { name: "Smartphone", path: "smartphone" },
];

// ─── SEO config per kategori ──────────────────────────────────────────────────
const CATEGORY_SEO = {
  software: {
    title: `Produk Software Terbaik untuk Bisnis & Produktivitas | ${SITE_NAME}`,
    description:
      "Temukan berbagai pilihan Software terbaik — Microsoft Office, Windows, Adobe, AutoCAD — dengan lisensi resmi dan harga kompetitif.",
    keywords:
      "software bisnis, Microsoft Office 365, Windows 11, Adobe, AutoCAD, lisensi resmi, Infoduta Computindo Perkasa",
    canonicalUrl: `${BASE_URL}/produk/software`,
  },
  hardware: {
    title: `Produk Hardware Terbaik untuk Bisnis & Kantor | ${SITE_NAME}`,
    description:
      "Temukan berbagai pilihan Hardware terbaik — printer, scanner, networking, UPS, proyektor — dengan harga kompetitif.",
    keywords:
      "hardware komputer, printer bisnis, scanner kantor, networking, UPS, proyektor, Infoduta Computindo Perkasa",
    canonicalUrl: `${BASE_URL}/produk/hardware`,
  },
  server: {
    title: `Produk Server Terbaik untuk Bisnis & Enterprise | ${SITE_NAME}`,
    description:
      "Temukan berbagai pilihan Server terbaik — rack server, tower server, blade server — dari brand terpercaya Dell, HP, dan Lenovo.",
    keywords:
      "server bisnis, rack server, tower server, Dell server, HP server, Lenovo server, Infoduta Computindo Perkasa",
    canonicalUrl: `${BASE_URL}/produk/server`,
  },
  computer: {
    title: `Produk Computer & PC Terbaik untuk Bisnis | ${SITE_NAME}`,
    description:
      "Temukan berbagai pilihan PC dan Desktop terbaik — komputer bisnis, workstation, all-in-one — dengan harga kompetitif.",
    keywords:
      "computer bisnis, PC desktop, komputer kantor, workstation, all-in-one PC, Infoduta Computindo Perkasa",
    canonicalUrl: `${BASE_URL}/produk/computer`,
  },
  laptop: {
    title: `Produk Laptop Terbaik untuk Bisnis & Gaming | ${SITE_NAME}`,
    description:
      "Temukan berbagai pilihan Laptop terbaik — laptop bisnis, gaming, ultrabook — dengan harga kompetitif.",
    keywords:
      "laptop bisnis, laptop gaming, ultrabook, laptop HP, laptop Dell, laptop Lenovo, Infoduta Computindo Perkasa",
    canonicalUrl: `${BASE_URL}/produk/laptop`,
  },
  sparepart: {
    title: `Produk Sparepart Komputer Terbaik & Terlengkap | ${SITE_NAME}`,
    description:
      "Temukan berbagai pilihan Sparepart komputer — SSD, RAM, HDD, processor, VGA, motherboard — dengan kualitas terjamin.",
    keywords:
      "sparepart komputer, SSD, RAM laptop, HDD, processor Intel, processor AMD, VGA card, Infoduta Computindo Perkasa",
    canonicalUrl: `${BASE_URL}/produk/sparepart`,
  },
  smartphone: {
    title: `Produk Smartphone Terbaik untuk Bisnis & Personal | ${SITE_NAME}`,
    description:
      "Temukan berbagai pilihan Smartphone terbaik — iPhone, Samsung, dan brand terpercaya — dengan harga kompetitif.",
    keywords:
      "smartphone bisnis, iPhone, Samsung Galaxy, mobile phone kantor, Infoduta Computindo Perkasa",
    canonicalUrl: `${BASE_URL}/produk/smartphone`,
  },
};

// ─── Default SEO (halaman /produk tanpa kategori) ─────────────────────────────
const DEFAULT_SEO = {
  title: `Produk IT Terlengkap — Komputer, Laptop, Server, Software | ${SITE_NAME}`,
  description:
    "Temukan berbagai pilihan produk IT terlengkap — Komputer, Laptop, Smartphone, Server, Hardware, Software, dan Sparepart — dengan kualitas terbaik dan harga kompetitif di Infoduta Computindo Perkasa.",
  keywords:
    "produk IT, komputer, laptop, smartphone, server, hardware, software, sparepart, perangkat keras, perangkat lunak, teknologi informasi, solusi bisnis IT, Infoduta Computindo Perkasa",
  canonicalUrl: `${BASE_URL}/produk`,
};

// ─── Helper: konversi path gambar lokal → URL publik ─────────────────────────
const toPublicImageUrl = (imagePath) => {
  if (!imagePath) return null;
  const cleaned = imagePath.replace(/^\/src\//, "/").replace(/^(?!\/)/, "/");
  return `${BASE_URL}${cleaned}`;
};

// ─── Helper: buat brand slug untuk URL ───────────────────────────────────────
const toBrandSlug = (brand) => brand?.replace(/\s+/g, "-") || "";

// ─── Helper: serialize JSON-LD ────────────────────────────────────────────────
const toJsonLd = (obj) => JSON.stringify(obj);

// ─── JSON-LD: Organization (static) ──────────────────────────────────────────
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Indonesian",
  },
};

// ─── JSON-LD: WebSite dengan SearchAction ─────────────────────────────────────
// Memungkinkan Google menampilkan search box langsung di hasil pencarian
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/produk?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Helmet Component ─────────────────────────────────────────────────────────
const ProdukHelmet = ({ category, selectedProduct }) => {
  // ── Halaman Detail Produk (modal open) ──
  if (selectedProduct) {
    const detailUrl = `${BASE_URL}/produk/${selectedProduct.jenis?.toLowerCase()}/${toBrandSlug(selectedProduct.brand)}/${selectedProduct.id}`;
    const productImage = selectedProduct.images?.[0]
      ? toPublicImageUrl(
          typeof selectedProduct.images[0] === "string"
            ? selectedProduct.images[0]
            : null,
        )
      : null;

    const productJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: selectedProduct.name,
      description:
        selectedProduct.deskripsi ||
        selectedProduct.description ||
        `${selectedProduct.name} dari ${selectedProduct.brand}`,
      brand: { "@type": "Brand", name: selectedProduct.brand },
      category: selectedProduct.jenis,
      url: detailUrl,
      ...(productImage && { image: productImage }),
      ...(selectedProduct.specs && {
        additionalProperty: [
          selectedProduct.specs.cpu && {
            "@type": "PropertyValue",
            name: "Processor",
            value: selectedProduct.specs.cpu,
          },
          selectedProduct.specs.gpu && {
            "@type": "PropertyValue",
            name: "GPU",
            value: selectedProduct.specs.gpu,
          },
          selectedProduct.specs.ram && {
            "@type": "PropertyValue",
            name: "RAM",
            value: selectedProduct.specs.ram,
          },
          selectedProduct.specs.storage && {
            "@type": "PropertyValue",
            name: "Storage",
            value: selectedProduct.specs.storage,
          },
          selectedProduct.specs.os && {
            "@type": "PropertyValue",
            name: "Operating System",
            value: selectedProduct.specs.os,
          },
        ].filter(Boolean),
      }),
      offers: {
        "@type": "Offer",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: SITE_NAME },
      },
    };

    const detailBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Produk",
          item: `${BASE_URL}/produk`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name:
            CATEGORIES.find(
              (c) => c.path === selectedProduct.jenis?.toLowerCase(),
            )?.name || selectedProduct.jenis,
          item: `${BASE_URL}/produk/${selectedProduct.jenis?.toLowerCase()}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: selectedProduct.name,
          item: detailUrl,
        },
      ],
    };

    return (
      <Helmet>
        <html lang="id" />
        <title>{`${selectedProduct.name} | ${SITE_NAME}`}</title>
        <meta
          name="description"
          content={
            selectedProduct.deskripsi ||
            selectedProduct.description ||
            `Dapatkan ${selectedProduct.name} resmi bergaransi dengan spesifikasi lengkap di Infoduta Computindo Perkasa.`
          }
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={detailUrl} />

        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta
          property="og:title"
          content={`${selectedProduct.name} | ${SITE_NAME}`}
        />
        <meta
          property="og:description"
          content={
            selectedProduct.deskripsi ||
            `Dapatkan ${selectedProduct.name} resmi bergaransi di Infoduta Computindo Perkasa.`
          }
        />
        <meta property="og:url" content={detailUrl} />
        <meta property="og:locale" content="id_ID" />
        {productImage && <meta property="og:image" content={productImage} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${selectedProduct.name} | ${SITE_NAME}`}
        />
        <meta
          name="twitter:description"
          content={
            selectedProduct.deskripsi ||
            `Dapatkan ${selectedProduct.name} resmi bergaransi di Infoduta Computindo Perkasa.`
          }
        />
        {productImage && <meta name="twitter:image" content={productImage} />}

        <script type="application/ld+json">{toJsonLd(productJsonLd)}</script>
        <script type="application/ld+json">{toJsonLd(detailBreadcrumb)}</script>
        <script type="application/ld+json">
          {toJsonLd(organizationJsonLd)}
        </script>
      </Helmet>
    );
  }

  // ── Halaman Kategori (/produk/:category) atau halaman utama (/produk) ──
  const seo = CATEGORY_SEO[category] || DEFAULT_SEO;

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Beranda", item: BASE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Produk",
      item: `${BASE_URL}/produk`,
    },
  ];

  if (category && CATEGORY_SEO[category]) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: CATEGORIES.find((c) => c.path === category)?.name || category,
      item: seo.canonicalUrl,
    });
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": category ? "CollectionPage" : "WebPage",
    name: seo.title,
    description: seo.description,
    url: seo.canonicalUrl,
    inLanguage: "id-ID",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: BASE_URL },
    breadcrumb: breadcrumbJsonLd,
  };

  return (
    <Helmet>
      <html lang="id" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={`PT ${SITE_NAME}`} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={seo.canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonicalUrl} />
      <meta
        property="og:image"
        content={`${BASE_URL}/og/${category || "produk"}-catalog.jpg`}
      />
      <meta property="og:locale" content="id_ID" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta
        name="twitter:image"
        content={`${BASE_URL}/og/${category || "produk"}-catalog.jpg`}
      />

      <script type="application/ld+json">{toJsonLd(webPageJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(breadcrumbJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(websiteJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
    </Helmet>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
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

  const isNewProduct = (releaseDate) => {
    if (!releaseDate) return false;
    const currentYear = new Date().getFullYear();
    const productYear = new Date(releaseDate).getFullYear();
    return productYear === currentYear;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    setTimeout(() => setHeroAnimated(true), 100);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isModalOpen]);

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
      if (event.key === "Escape" && isModalOpen) closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, closeModal]);

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

  const products = useMemo(() => importImagesFromJson(produkData), []);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const Breadcrumb = () => (
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
          <span className="produk-breadcrumb-item produk-breadcrumb-active">
            Produk
          </span>
        )}
      </div>
    </div>
  );

  const filterProducts = useCallback(() => {
    let results = [...products];
    if (selectedCategory) {
      results = results.filter(
        (p) => p.jenis.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }
    if (selectedBrand) {
      results = results.filter(
        (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase(),
      );
    }
    if (selectedType) {
      results = results.filter(
        (p) => p.type && p.type.toLowerCase() === selectedType.toLowerCase(),
      );
    }
    if (searchQuery) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (sortByRelease) {
      results.sort(
        (a, b) =>
          new Date(b.released_date || 0) - new Date(a.released_date || 0),
      );
    }
    if (sortBy === "nama") {
      results.sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
    } else if (sortBy === "tanggal") {
      results.sort((a, b) => {
        const dA = new Date(a.released_date || 0);
        const dB = new Date(b.released_date || 0);
        return sortOrder === "asc" ? dA - dB : dB - dA;
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
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    setIsLoading(true);
    searchTimeout.current = setTimeout(() => {
      filterProducts();
      setIsLoading(false);
    }, 1000);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
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

  const uniqueTypes = useMemo(() => {
    const types = new Set();
    products.forEach((p) => {
      if (p.type) types.add(p.type);
    });
    return Array.from(types);
  }, [products]);

  const uniqueBrands = useMemo(() => {
    const brands = new Set();
    products.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands);
  }, [products]);

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
        navigate(category ? `/produk/${category}` : "/produk");
      }
    } else {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  }, [brand, id, category, products, navigate]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const goToPreviousImage = () => {
    setSlideDirection("left");
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1,
    );
  };

  const goToNextImage = () => {
    setSlideDirection("right");
    setCurrentImageIndex((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1,
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
    if (Math.abs(distance) >= 50) {
      if (distance > 0) {
        setSlideDirection("right");
        setCurrentImageIndex((prev) =>
          prev === selectedProduct.images.length - 1 ? 0 : prev + 1,
        );
      } else {
        setSlideDirection("left");
        setCurrentImageIndex((prev) =>
          prev === 0 ? selectedProduct.images.length - 1 : prev - 1,
        );
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleCategoryClick = (categoryPath) => {
    navigate(`/produk/${categoryPath}`);
    setSelectedCategory(categoryPath);
    if (isMobile) setTimeout(() => setIsSidebarOpen(false), 150);
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
    mainContentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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

  const sortLabel = useMemo(() => {
    const byLabel = sortBy === "nama" ? "Nama" : "Tgl Rilis";
    const orderLabel = sortOrder === "asc" ? "A-Z" : "Z-A";
    return `Urut: ${byLabel} · ${orderLabel}`;
  }, [sortBy, sortOrder]);

  return (
    <>
      {/* ── SEO Helmet — reaktif terhadap kategori & produk yang dipilih ── */}
      <ProdukHelmet category={category} selectedProduct={selectedProduct} />

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
          />
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

              <div
                className={`produk-sidebar-body ${isSidebarOpen ? "open" : ""}`}
              >
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
                      <span>
                        Merk{selectedBrand ? `: ${selectedBrand}` : ""}
                      </span>
                    </div>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="produk-filter-select"
                    >
                      <option value="">Semua Merk</option>
                      {uniqueBrands.map((b, idx) => (
                        <option key={idx} value={b}>
                          {b}
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
                      {uniqueTypes.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
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

              {/* Desktop sidebar */}
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
                    {uniqueBrands.map((b, idx) => (
                      <option key={idx} value={b}>
                        {b}
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
                    {uniqueTypes.map((t, idx) => (
                      <option key={idx} value={t}>
                        {t}
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

      {/* Modal */}
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
              <span>({selectedProduct.jenis})</span>
            </div>

            <div className="produk-modal-specs">
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <Cpu />
                </span>
                {selectedProduct.specs.cpu}
              </div>
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <Gpu />
                </span>
                {selectedProduct.specs.gpu}
              </div>
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <MemoryStick />
                </span>
                {selectedProduct.specs.ram}
              </div>
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <HardDrive />
                </span>
                {selectedProduct.specs.storage}
              </div>
              <div className="produk-modal-spec-item">
                <span className="produk-spec-icon">
                  <AppWindow />
                </span>
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
                  href={`https://wa.me/6285545031039?text=Saya%20tertarik%20dengan%20produk%20${encodeURIComponent(selectedProduct.name)}%20dari%20Infoduta%20Computindo%20Perkasa.%20Apakah%20produk%20ini%20masih%20tersedia?`}
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
