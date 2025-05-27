import React, { useState, useEffect } from "react";
import produkData from "../hardware.json";
import "./Laptop.css";
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  X,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";
import "./Laptop.css";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

const HardwareCard = ({ product, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError || !product.images || product.images.length === 0
    ? "/api/placeholder/200/150"
    : `/src/assets/${product.images[0]}`;

  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgError(true)}
        />
      </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="product-meta">
            <span className="brand">{product.brand}</span>
            <span className="type">{product.type}</span>
          </div>
          {/* Removed specs and spec-text-summary since hardware.json does not have specs */}
          {/* Removed the View Details button as requested */}
        </div>
      </div>
  );
};


const SpecItem = ({ icon, label, value }) => (
  <div className="spec-item">
    <div className="icon-box">{icon}</div>
    <div className="spec-text">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  </div>
);

const HardwareModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img
              src={product.images?.[0] ? `/src/assets/${product.images[0]}` : '/api/placeholder/200/150'}
              alt={product.name}
            />
          </div>
          <div className="modal-details">
            <h2>{product.name}</h2>
            <div className="meta">
              <span className="brand-tag">{product.brand}</span>
              <span> | </span>
              <span className="type-tag">{product.type}</span>
            </div>
            <div className="modal-actions">
              <div className="contact-options">
                <button className="contact-button"><MessageCircle /> Hubungi Kami</button>
              </div>
              <div className="extra-info">
                <p><strong>✨ Penawaran spesial:</strong> Gratis konsultasi dan bantuan instalansi produk.</p>
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
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProducts(produkData.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const filteredProducts = products.filter(product => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  return (
    <div className="hardware-page">
      <Navbar />

      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search hardware..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="brand-select"
        >
          <option value="">All Brands</option>
          {[...new Set(products.map(p => p.brand))].map((brand, i) => (
            <option key={i} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

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