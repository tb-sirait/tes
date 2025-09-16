import React, { useState, useEffect } from "react";
import produkData from "../hardware.json";
import "./Laptop.css";
import { X, Search, MessageCircle } from "lucide-react";
import "./Laptop.css";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

import { useNavigate, useParams } from "react-router-dom";

// Dynamically import all images from assets folder using Vite's import.meta.glob
const images = import.meta.glob(
  "../../assets/produk/hardware/**/*.{png,jpg,jpeg,svg}",
  { eager: true, as: "url" },
);
const hpInkImages = import.meta.glob(
  "../../assets/produk/hp_ink/*.{png,jpg,jpeg,svg}",
  { eager: true, as: "url" },
);
const hpTonerImages = import.meta.glob(
  "../../assets/produk/hp_toner/*.{png,jpg,jpeg,svg}",
  { eager: true, as: "url" },
);

// Merge all images into one object
const allImages = { ...images, ...hpInkImages, ...hpTonerImages };

// Helper function to get image URL from JSON image path string
const getImageUrl = (imagePath) => {
  // The imagePath in JSON is like "/src/assets/produk/hp_toner/1.png"
  // We need to convert it to relative path from this file to match keys in allImages
  // Remove leading "/src/" from path
  const relativePath = imagePath.replace(/^\/src\//, "../../");
  return allImages[relativePath] || "/api/placeholder/200/150";
};

const HardwareCard = ({ product, onViewDetails }) => {
  const imgSrc = getImageUrl(product.images);

  return (
    <div className="filter-product-card" onClick={() => onViewDetails(product)}>
      <div className="filter-product-image">
        <img src={imgSrc} alt={product.name} />
      </div>
      <div className="filter-product-info">
        <h3>{product.name}</h3>
        <div className="filter-product-meta">
          <span className="brand">{product.brand}</span>
          <span className="type">{product.type}</span>
        </div>
      </div>
    </div>
  );
};

const ProductHeader = ({
  searchQuery,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  brandOptions,
}) => {
  return (
    <div className="filter-product-header">
      <div className="header-text">
        <h1>Produk Hardware</h1>
        <p>
          Temukan berbagai pilihan Hardware dengan spesifikasi terbaik yang
          sesuai dengan kebutuhan perusahaan Anda.
        </p>
      </div>

      <div className="laptop-search-filter-bar">
        <h5 style={{ marginRight: "10px", color: "#1434a4" }}>Cari:</h5>
        <input
          type="text"
          placeholder="Cari barang..."
          value={searchQuery}
          onChange={onSearchChange}
          className="laptop-search-input"
        />
        <select
          value={selectedBrand}
          onChange={onBrandChange}
          className="brand-select"
        >
          <option value="">Semua Merek</option>
          {brandOptions.map((brand, idx) => (
            <option key={idx} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const HardwareModal = ({ product, isOpen, onClose }) => {
  useEffect(() => {
      const handleEsc = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }, [onClose]);
  useEffect(() => {
      if (isOpen) {
        document.documentElement.style.overflow = "hidden"; // kunci scroll
      } else {
        document.documentElement.style.overflow = "auto"; // hidupkan lagi
      }
  
      return () => {
        document.documentElement.style.overflow = "auto"; // cleanup
      };
    }, [isOpen]);
  
    if (!isOpen) return null;
  const imgSrc = getImageUrl(product.images);

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div
        className="filter-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="filter-modal-body">
          <div className="filter-modal-image">
            <img src={imgSrc} alt={product.name} />
          </div>
          <div className="filter-modal-details">
            <h2>{product.name}</h2>
            <div className="meta">
              <span className="brand-tag">{product.brand}</span>
              <span> | </span>
              <span className="type-tag">{product.type}</span>
            </div>
            <p className="filter-product-description">{product.description}</p>
            <div className="filter-modal-actions">
              <div className="contact-options">
                <a
                  className="contact-button"
                  href={`https://wa.me/6285545031039?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}
                >
                  <MessageCircle className="chat-icon" />
                  Hubungi Kami
                </a>
              </div>
              <div className="extra-info">
                <p>
                  <strong>✨ Penawaran spesial:</strong> Gratis konsultasi dan
                  bantuan instalasi produk.
                </p>
                <p>
                  <strong>🚚 Pesan Antar:</strong> Tersedia antar barang untuk
                  Jakarta dan Sekitarnya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hardware = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    // Update URL tanpa reload halaman
    navigate(`/produk/hardware/${product.brand}/${product.id}`);
  };
  
  const handleCloseModal = () => { 
    setSelectedProduct(null);
    // Kembalikan URL ke /produk tanpa reload halaman
    navigate('/produk/hardware');
  };

  useEffect(() => {
    setProducts(produkData.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const filteredProducts = products.filter((product) => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  const { id } = useParams();

useEffect(() => {
  if (id && products.length > 0) {
    const found = products.find((p) => String(p.id) === id);
    if (found) {
      setSelectedProduct(found);
    }
  } else {
    setSelectedProduct(null);
  }
}, [id, products]);


  return (
    <div className="laptop-page">
      <Navbar />
      <ProductHeader
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedBrand={selectedBrand}
        onBrandChange={(e) => setSelectedBrand(e.target.value)}
        brandOptions={[...new Set(products.map((p) => p.brand))].sort()}
      />

      <div className="filter-product-grid" style={{ marginTop: "30px" }}>
        {filteredProducts.map((product) => (
          <HardwareCard
            key={product.name}
            product={product}
            onViewDetails={handleOpenModal}
          />
        ))}
      </div>

      <HardwareModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />

      <Footer />
    </div>
  );
};

export default Hardware;
