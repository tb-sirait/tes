import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Filter,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
} from "lucide-react";
import "./subproduk.css";

// Import semua data sources
import produkData from "../produk.json";
import hardwareData from "../hardware.json";
import softwareData from "../software.json";
import sparepartData from "../../Produk/sparepart.json";
import serverData from "../server.json";

// Import gambar dengan glob patterns
const produkImages = import.meta.glob(
  "../../assets/produk/**/*.{png,jpg,jpeg,svg}",
  {
    eager: true,
  },
);

// Software images - explicit imports
import microsoft1 from "../../assets/software/microsoft/1.png";
import microsoft2 from "../../assets/software/microsoft/2.png";
import microsoft3 from "../../assets/software/microsoft/3.png";
import microsoft4 from "../../assets/software/microsoft/4.png";
import microsoft5 from "../../assets/software/microsoft/5.png";
import microsoft6 from "../../assets/software/microsoft/6.png";
import windows1 from "../../assets/software/windows/1.png";
import adobe1 from "../../assets/software/adobe/1.png";
import adobe2 from "../../assets/software/adobe/2.png";
import adobe3 from "../../assets/software/adobe/3.png";
import sql1 from "../../assets/software/sql/1.png";
import sql2 from "../../assets/software/sql/2.png";
import heimdal1 from "../../assets/software/heimdal/1.png";
import pdf1 from "../../assets/software/pdf/1.png";
import autocad1 from "../../assets/software/autocad/1.png";
import autocad2 from "../../assets/software/autocad/2.png";
import thinkcell1 from "../../assets/software/thinkcell/1.png";
import sketchup1 from "../../assets/software/sketchup/1.png";
import enscape1 from "../../assets/software/enscape/1.png";
import chatgpt1 from "../../assets/software/chatgpt/1.png";
import hootsuite1 from "../../assets/software/hootsuite/1.png";
import sid1 from "../../assets/software/sid/1.png";
import figma1 from "../../assets/software/figma/1.svg";
import vmware1 from "../../assets/software/vmware/1.png";
import fortitoken1 from "../../assets/software/fortitoken/1.svg";
import canva1 from "../../assets/software/canva/1.svg";

const softwareImageMap = {
  "Microsoft Office 365 Family": microsoft1,
  "Microsoft Office 365 Personal": microsoft2,
  "Microsoft Office 2024 Home and Student": microsoft3,
  "Microsoft Office 2024 Home and Business": microsoft4,
  "Microsoft Office Professional Plus 2024": microsoft6,
  "Microsoft Office Standard 2024": microsoft5,
  "Windows 11 Pro": windows1,
  "Acrobat Pro for teams Subscription New": adobe1,
  "Windows Server 2025 Standard - 16 Core License Pack": microsoft2,
  "Microsoft SQL Server 2022 Standard Edition": sql1,
  "Heimdal EPDR Plus & Ransomware Encryption Protection": heimdal1,
  "PDF Exchange Pro": pdf1,
  "AutoCAD LT 2024 Commercial New Single-user": autocad1,
  "AutoCAD LT 2026 Commercial New Single-user ELD Annual Subscription":
    autocad2,
  "Thinkcell Annual Subscription": thinkcell1,
  "Software SketchUp Pro For Professional Use, ANN TRM CTR": sketchup1,
  "SketchUp Pro For Professional Use": sketchup1,
  "Software Enscape Fixed Seat License": enscape1,
  "ChatGPT Team": chatgpt1,
  "Hootsuite Professional": hootsuite1,
  "S.id – Pro": sid1,
  "Figma Organization Dev Seat": figma1,
  "License Figma Full Seat": figma1,
  "Adobe Illustrator": adobe2,
  "Adobe Photoshop": adobe3,
  "Windows Server 2025  - CAL": microsoft3,
  "Windows Server 2025 Standard": microsoft4,
  "SQL Server Standard Edition": sql2,
  "Vmware Cloud Foundation 5": vmware1,
  FortiToken: fortitoken1,
  "Canva PRO": canva1,
};

// Create imageMap for produkImages
const imageMap = {};
for (const path in produkImages) {
  const normalizedPath = path
    .replace(/^..\/..\/assets\//, "")
    .replace(/\\\\/g, "/")
    .replace(/\\/g, "/");
  imageMap[normalizedPath] = produkImages[path].default || produkImages[path];
}

// ProductCard Component - Dengan kondisi berbeda per kategori
const ProductCard = ({ product, imageSrc, onClick, category }) => {
  const [imgError, setImgError] = useState(false);
  const finalImgSrc = imgError ? "/api/placeholder/200/150" : imageSrc;

  return (
    <div className="sub-produk-card" onClick={onClick}>
      <div className="sub-produk-card-image">
        <img
          src={finalImgSrc}
          alt={product.name}
          onError={() => setImgError(true)}
        />
      </div>
      <div className="sub-produk-card-info">
        <h3>{product.name}</h3>
        <div className="sub-produk-card-meta">
          <span className="sub-produk-brand">{product.brand}</span>
          <span className="sub-produk-type">
            {category === "server"
            ? "Server"
            : category === "hardware"
            ? product.type || "Hardware"
            : category === "software"
            ? "Software"
            : category === "sparepart"
            ? product.jenis || "Sparepart"
            : product.jenis || product.type || "Product"}
          </span>
        </div>

        {/* Specs untuk Server */}
        {category === "server" && (
          <div className="sub-produk-specs">
            {product.processor && (
              <div className="sub-produk-spec-item">
                <Cpu size={16} />
                <span>
                  {product.processor.length > 40
                    ? product.processor.substring(0, 40) + "..."
                    : product.processor}
                </span>
              </div>
            )}
            {product.memory && (
              <div className="sub-produk-spec-item">
                <MemoryStick size={16} />
                <span>
                  {product.memory.length > 40
                    ? product.memory.substring(0, 40) + "..."
                    : product.memory}
                </span>
              </div>
            )}
            {product.chassis && (
              <div className="sub-produk-spec-item">
                <Monitor size={16} />
                <span>{product.chassis}</span>
              </div>
            )}
            {product.os && (
              <div className="sub-produk-spec-item">
                <HardDrive size={16} />
                <span>
                  {product.os.length > 30
                    ? product.os.substring(0, 30) + "..."
                    : product.os}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Specs untuk Laptop/PC/Smartphone */}
        {!["server", "hardware", "software", "sparepart"].includes(category) &&
          product.specs &&
          Object.keys(product.specs).length > 0 && (
            <div className="sub-produk-specs">
              {product.specs.cpu && (
                <div className="sub-produk-spec-item">
                  <Cpu size={16} />
                  <span>{product.specs.cpu}</span>
                </div>
              )}
              {product.specs.ram && (
                <div className="sub-produk-spec-item">
                  <MemoryStick size={16} />
                  <span>{product.specs.ram}</span>
                </div>
              )}
              {product.specs.storage && (
                <div className="sub-produk-spec-item">
                  <HardDrive size={16} />
                  <span>{product.specs.storage}</span>
                </div>
              )}
              {product.specs.gpu && (
                <div className="sub-produk-spec-item">
                  <Monitor size={16} />
                  <span>{product.specs.gpu}</span>
                </div>
              )}
            </div>
          )}

        {/* Info untuk Software - tampilkan usage jika ada */}
        {category === "software" && product.usage && (
          <div className="sub-produk-info-text">
            <small>{product.usage}</small>
          </div>
        )}

        {/* Info untuk Hardware/Sparepart - tampilkan deskripsi singkat */}
        {(category === "hardware" || category === "sparepart") &&
          product.description && (
            <div className="sub-produk-info-text">
              <small>{product.description.substring(0, 60)}...</small>
            </div>
          )}
      </div>
    </div>
  );
};

const SubProduk = ({ jenisBarang, title, description, dataSource }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("newest");
  const [products, setProducts] = useState([]);

  // Determine category from dataSource
  const getCategory = () => {
    if (dataSource === "../server.json") return "server";
    if (dataSource === "../hardware.json") return "hardware";
    if (dataSource === "../software.json") return "software";
    if (dataSource === "../../Produk/sparepart.json") return "sparepart";
    return jenisBarang; // laptop, PC, smartphone
  };

  const category = getCategory();

  // Get image resolver based on category
  const getImageSrc = (product) => {
    // Software: gunakan mapping khusus
    if (category === "software") {
      return softwareImageMap[product.name] || "/api/placeholder/200/150";
    }

    // Hardware: images field adalah string, bukan array
    if (category === "hardware") {
      const imagePath = product.images;
      if (!imagePath) return "/api/placeholder/200/150";

      // Convert /src/assets/... ke ../../assets/...
      const normalizedPath = imagePath
        .replace(/^\/src\/assets\//, "")
        .replace(/\\/g, "/");

      return imageMap[normalizedPath] || "/api/placeholder/200/150";
    }

    // Sparepart: images adalah array
    if (category === "sparepart") {
      const imagePath = product.images?.[0];
      if (!imagePath) return "/api/placeholder/200/150";

      // Convert /assets/... ke produk/...
      const normalizedPath = imagePath
        .replace(/^\/assets\//, "")
        .replace(/\\/g, "/");

      return imageMap[normalizedPath] || "/api/placeholder/200/150";
    }

    // Server: gambar field
    if (category === "server") {
      const imagePath = product.gambar;
      if (!imagePath) return "/api/placeholder/200/150";

      const normalizedPath = imagePath
        .replace(/^assets\//, "")
        .replace(/\\/g, "/");

      return imageMap[normalizedPath] || "/api/placeholder/200/150";
    }

    // Default: produk.json (laptop, PC, smartphone)
    const firstImagePath = product.images?.[0];
    return (
      (firstImagePath && imageMap[firstImagePath]) || "/api/placeholder/200/150"
    );
  };

  // Active category tabs
  const categories = [
    { label: "Software", path: "/produk/software", jenis: "software" },
    { label: "Hardware", path: "/produk/hardware", jenis: "hardware" },
    { label: "Sparepart", path: "/produk/sparepart", jenis: "sparepart" },
    { label: "Computer", path: "/produk/computer", jenis: "PC" },
    { label: "Smartphone", path: "/produk/smartphone", jenis: "smartphone" },
    { label: "Laptop", path: "/produk/laptop", jenis: "laptop" },
    { label: "Server", path: "/produk/server", jenis: "server" },
  ];

  const activeCategory = categories.find((cat) =>
    location.pathname.includes(cat.path.split("/").pop()),
  );

  useEffect(() => {
    // Get data based on dataSource prop
    const getData = () => {
      if (dataSource === "../hardware.json") return hardwareData;
      if (dataSource === "../software.json") return softwareData;
      if (dataSource === "../../Produk/sparepart.json") return sparepartData;
      if (dataSource === "../server.json") return serverData;
      return produkData;
    };

    const data = getData();
    let filtered = [];

    if (Array.isArray(data)) {
      // Untuk server, software, hardware, sparepart - ambil semua
      if (["server", "hardware", "software", "sparepart"].includes(category)) {
        filtered = data;
      } else {
        // Untuk laptop/PC/smartphone - filter by jenis
        filtered = data.filter(
          (p) => p.jenis?.toLowerCase() === jenisBarang.toLowerCase(),
        );
      }
    }

    // Sort products
    if (selectedOrder === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.released_date || 0) - new Date(a.released_date || 0),
      );
    } else if (selectedOrder === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.released_date || 0) - new Date(b.released_date || 0),
      );
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filtered);
  }, [jenisBarang, selectedOrder, dataSource, category]);

  // Get unique brands
  const brandOptions = [...new Set(products.map((p) => p.brand))]
    .filter(Boolean)
    .sort();

  // Filter products
  const filteredProducts = products.filter((product) => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  const handleProductClick = (product) => {
    const basePath = location.pathname.split("/")[2]; // software, hardware, dll
    const brandSlug = product.brand.replace(/\s+/g, "-"); // Handle brand dengan spasi
    navigate(`/produk/${basePath}/${brandSlug}/${product.id}`);
  };

  // Breadcrumb
  const getBreadcrumb = () => {
    return (
      <div className="sub-produk-breadcrumb">
        <span
          onClick={() => navigate("/")}
          className="sub-produk-breadcrumb-link"
        >
          Beranda
        </span>
        <span className="sub-produk-breadcrumb-separator">/</span>
        <span
          onClick={() => navigate("/produk")}
          className="sub-produk-breadcrumb-link"
        >
          Produk
        </span>
        <span className="sub-produk-breadcrumb-separator">/</span>
        <span className="sub-produk-breadcrumb-current">
          {activeCategory?.label || title}
        </span>
      </div>
    );
  };

  return (
    <div className="sub-produk-page">
      {/* Hero Section */}
      <div className="sub-produk-hero">
        <div className="sub-produk-hero-content">
          <h1>{title}</h1>
          <p>{description}</p>

          {/* Search and Filter Bar */}
          <div className="sub-produk-search-bar">
            <div className="sub-produk-search-input-wrapper">
              <Search className="sub-produk-search-icon" />
              <input
                type="text"
                placeholder="Cari barang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sub-produk-search-input"
              />
            </div>

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="sub-produk-filter-select"
            >
              <option value="">Semua Merk</option>
              {brandOptions.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Category Tabs */}
          <div className="sub-produk-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.jenis}
                className={`sub-produk-category-tab ${
                  activeCategory?.jenis === cat.jenis ? "active" : ""
                }`}
                onClick={() => navigate(cat.path)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      {getBreadcrumb()}

      {/* Main Content */}
      <div className="sub-produk-main-content">
        {/* Left Sidebar - Filter */}
        <aside className="sub-produk-sidebar">
          <div className="sub-produk-filter-box">
            <h3 className="sub-produk-filter-title">
              <Filter size={20} /> Filter
            </h3>

            <div className="sub-produk-filter-section">
              <h4>Urutan</h4>
              <select
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="sub-produk-filter-select"
              >
                <option value="newest">Terbaru hingga Terlama</option>
                <option value="oldest">Terlama hingga Terbaru</option>
                <option value="name">Nama (A-Z)</option>
              </select>
            </div>

            <div className="sub-produk-filter-section">
              <h4>Merk</h4>
              <div className="sub-produk-filter-options">
                <label className="sub-produk-filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value=""
                    checked={selectedBrand === ""}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <span>Semua Merk</span>
                </label>
                {brandOptions.map((brand) => (
                  <label key={brand} className="sub-produk-filter-option">
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={selectedBrand === brand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sub-produk-filter-section">
              <h4>Urutan Rilis Produk</h4>
              <div className="sub-produk-filter-options">
                <label className="sub-produk-filter-option">
                  <input
                    type="radio"
                    name="order"
                    value="newest"
                    checked={selectedOrder === "newest"}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                  />
                  <span>Terbaru hingga terlama</span>
                </label>
                <label className="sub-produk-filter-option">
                  <input
                    type="radio"
                    name="order"
                    value="oldest"
                    checked={selectedOrder === "oldest"}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                  />
                  <span>Terlama hingga terbaru</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content - Product Grid */}
        <div className="sub-produk-content">
          {filteredProducts.length === 0 ? (
            <div className="sub-produk-empty">
              <p>Barang belum tersedia</p>
            </div>
          ) : (
            <div className="sub-produk-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageSrc={getImageSrc(product)}
                  onClick={() => handleProductClick(product)}
                  category={category}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubProduk;
