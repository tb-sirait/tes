import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";
import ProductCard from "./element/ProductCard.jsx";
import produkData from "../produk.json";
import "./subproduk.css";

// Dynamically import all images
const images = import.meta.glob("../../assets/produk/**/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const imageMap = {};
for (const path in images) {
  const normalizedPath = path
    .replace(/^..\/..\/assets\//, "")
    .replace(/\\\\/g, "/")
    .replace(/\\/g, "/");
  imageMap[normalizedPath] = images[path].default || images[path];
}

const SubProduk = ({ jenisBarang, title, description }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("newest");
  const [products, setProducts] = useState([]);

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
    // Filter products by jenis
    let filtered = produkData.filter(
      (p) => p.jenis?.toLowerCase() === jenisBarang.toLowerCase(),
    );

    // Sort products
    if (selectedOrder === "newest") {
      filtered.sort(
        (a, b) => new Date(b.released_date) - new Date(a.released_date),
      );
    } else if (selectedOrder === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.released_date) - new Date(b.released_date),
      );
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filtered);
  }, [jenisBarang, selectedOrder]);

  // Get unique brands
  const brandOptions = [...new Set(products.map((p) => p.brand))].sort();

  // Filter products
  const filteredProducts = products.filter((product) => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  const handleProductClick = (product) => {
    const basePath = location.pathname.split("/")[2];
    navigate(`/produk/${basePath}/${product.brand}/${product.id}`);
  };

  // Breadcrumb
  const getBreadcrumb = () => {
    const paths = location.pathname.split("/").filter(Boolean);
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
    <>
      <div className="sub-produk-page">
        <Navbar />
        {/* Hero Section */}
        <div
          className="sub-produk-hero home-hero-section"
          style={{ maxHeight: "460px" }}
        >
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
                    imageMap={imageMap}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SubProduk;
