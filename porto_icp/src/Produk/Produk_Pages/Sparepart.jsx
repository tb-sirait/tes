import React, { useState, useEffect } from "react";
import produkData from "../../Produk/sparepart.json";
import "./laptop.css";
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
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

const ProductCard = ({ product, onViewDetails }) => {
  const [setImgError] = useState(false);

  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image">
        <img
          src={product.images}
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
      </div>
    </div>
  );
};

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
              src={product.images}
              alt={product.name}
            />
          </div>
          <div className="modal-details">
            <h2>{product.name}</h2>
            <div className="meta">
              <span className="brand-tag">{product.brand}</span>
              <span> | </span>
              <span className="type-tag">{product.jenis}</span>
            </div>
            <p className="product-description">{product.description}</p>
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

const Sparepart = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const sparepartProducts = produkData
      //.filter(p => p.jenis?.toLowerCase() === 'sparepart')
      .sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sparepartProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  return (
    <div className="sparepart-page">
      <Navbar />

      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search spare parts..."
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

export default Sparepart;
