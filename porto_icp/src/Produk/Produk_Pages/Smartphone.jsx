import React, { useState, useEffect } from "react";
import produkData from "../produk.json";
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

const ProductCard = ({ product, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError
    ? "/api/placeholder/200/150"
    : `/src/assets/${product.images?.[0]}`;

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
          <span className="type">{product.jenis}</span>
        </div>
        <div className="specs">
          {product.specs?.cpu && <SpecItem icon={<Cpu />} label="Processor" value={product.specs.cpu} />}
          {product.specs?.ram && <SpecItem icon={<MemoryStick />} label="Memory" value={product.specs.ram} />}
          {product.specs?.storage && <SpecItem icon={<HardDrive />} label="Storage" value={product.specs.storage} />}
          {product.specs?.gpu && <SpecItem icon={<Monitor />} label="Graphics" value={product.specs.gpu} />}
        </div>
        <div className="spec-text-summary">
          {product.specs?.cpu && <span>{product.specs.cpu}</span>}
          {product.specs?.ram && <span>{product.specs.ram}</span>}
          {product.specs?.storage && <span>{product.specs.storage}</span>}
          {product.specs?.gpu && <span>{product.specs.gpu}</span>}
        </div>
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

const ProductModal = ({ product, isOpen, onClose }) => {
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
              <span className="type-tag">{product.jenis}</span>
            </div>
            <div className="rating">
              {[...Array(5)].map((_, i) => <Star key={i} className="rating-star" />)}
              <span>(4.8/5 rating)</span>
            </div>
            <div className="modal-specs">
              {product.specs?.cpu && <SpecItem icon={<Cpu />} label="Processor" value={product.specs.cpu} />}
              {product.specs?.ram && <SpecItem icon={<MemoryStick />} label="Memory" value={product.specs.ram} />}
              {product.specs?.storage && <SpecItem icon={<HardDrive />} label="Storage" value={product.specs.storage} />}
              {product.specs?.gpu && <SpecItem icon={<Monitor />} label="Graphics" value={product.specs.gpu} />}
              {product.specs?.os && <SpecItem icon={<div className="os-icon" />} label="Operating System" value={product.specs.os} />}
            </div>
            <div className="modal-actions">
              <button className="contact-button"><Phone /> Hubungi Kami</button>
              <div className="contact-options">
                <button className="whatsapp"><MessageCircle /> WhatsApp</button>
                <button className="email"><Mail /> Email</button>
              </div>
              <div className="extra-info">
                <p><strong>✨ Special Offer:</strong> Free consultation and installation support</p>
                <p><strong>🚚 Delivery:</strong> Available in Jakarta and surrounding areas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Laptop = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const smartphoneProducts = produkData
      .filter(p => p.jenis?.toLowerCase() === 'smartphone')
      .sort((a, b) => a.name.localeCompare(b.name));
    setProducts(smartphoneProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  return (
    <div className="laptop-page">
      <Navbar />

      <div className="search-filter-bar">
        <input
          type="text"SX
          placeholder="Search laptops..."
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
          <ProductCard key={product.name} product={product} onViewDetails={setSelectedProduct} />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Footer />
    </div>
  );
};

export default Laptop;
