import React, { useState, useEffect } from "react";
import produkData from "../hardware.json";
import "./Laptop.css";
import {
  X,
  Search,
  MessageCircle,
} from "lucide-react";
import "./Laptop.css";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

// Dynamically import all images from assets folder using Vite's import.meta.glob
const images = import.meta.glob('../../assets/produk/hardware/**/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' });
const hpInkImages = import.meta.glob('../../assets/produk/hp_ink/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' });
const hpTonerImages = import.meta.glob('../../assets/produk/hp_toner/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' });

// Merge all images into one object
const allImages = { ...images, ...hpInkImages, ...hpTonerImages };

// Helper function to get image URL from JSON image path string
const getImageUrl = (imagePath) => {
  // The imagePath in JSON is like "/src/assets/produk/hp_toner/1.png"
  // We need to convert it to relative path from this file to match keys in allImages
  // Remove leading "/src/" from path
  const relativePath = imagePath.replace(/^\/src\//, '../../');
  return allImages[relativePath] || "/api/placeholder/200/150";
};

const HardwareCard = ({ product, onViewDetails }) => {
  const imgSrc = getImageUrl(product.images);

  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image">
        <img src={imgSrc}
        alt={product.name}
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-meta">
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
    <div className="product-header">
      <div className="header-text">
        <h1>Produk Hardware</h1>
        <p>
          Temukan berbagai pilihan Hardware dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda.
        </p>
      </div>

      <div className="search-filter-bar">
        <h5 style={{marginRight: "10px",color: "#1434a4"}}>Cari:</h5>
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

const HardwareModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;
  const imgSrc = getImageUrl(product.images);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img src={imgSrc} alt={product.name} />
          </div>
          <div className="modal-details">
            <h2>{product.name}</h2>
            <div className="meta">
              <span className="brand-tag">{product.brand}</span>
              <span> | </span>
              <span className="type-tag">{product.type}</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="modal-actions">
              <div className="contact-options">
                <a 
                  className="contact-button"
                  href={`https://wa.me/6285545031039?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}
                >
                  <MessageCircle /> 
                  Hubungi Kami
                </a>
              </div>
              <div className="extra-info">
                <p><strong>✨ Penawaran spesial:</strong> Gratis konsultasi dan bantuan instalasi produk.</p>
                <p><strong>🚚 Pesan Antar:</strong> Tersedia antar barang untuk Jakarta dan Sekitarnya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hardware = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(produkData.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const filteredProducts = products.filter(product => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  return (
    <div className="laptop-page">
      <Navbar />
      <ProductHeader
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedBrand={selectedBrand}
        onBrandChange={(e) => setSelectedBrand(e.target.value)}
        brandOptions={[...new Set(products.map(p => p.brand))].sort()}/>

      <div className="product-grid" style={{ marginTop: '30px' }}>
        {filteredProducts.map(product => (
          <HardwareCard key={product.name} product={product} onViewDetails={setSelectedProduct} />
        ))}
      </div>

      <HardwareModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Footer />
    </div>
  );
};

export default Hardware;
