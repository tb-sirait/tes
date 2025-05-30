
import React, { useState, useEffect } from "react";
import produkData from "../produk.json";
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

import Optiplex1 from "../../assets/produk/Dell/Optiplex/3000_Tower/1.png";
import Optiplex2 from "../../assets/produk/Dell/Optiplex/7010_Plus_SFF/1.png";

const imageMap = {
  "OptiPlex 3000 Tower": Optiplex1,
  "Optiplex 7010 PLUS SFF": Optiplex2,
};

const ProductCard = ({ product, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError
    ? "/api/placeholder/200/150"
    : imageMap[product.name] || "/api/placeholder/200/150";

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
          {product.specs?.cpu && <SpecItem icon={<Cpu />} label="Prosesor" value={product.specs.cpu} />}
          {product.specs?.ram && <SpecItem icon={<MemoryStick />} label="RAM" value={product.specs.ram} />}
          {product.specs?.storage && <SpecItem icon={<HardDrive />} label="Penyimpanan" value={product.specs.storage} />}
          {product.specs?.gpu && <SpecItem icon={<Monitor />} label="GPU" value={product.specs.gpu} />}
        </div>
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
        <h1>Produk Komputer</h1>
        <p>
          Temukan berbagai pilihan Komputer dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda.
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
              <span> | </span>
              <span className="type-tag">{product.jenis}</span>
            </div>
            <div className="modal-specs">
              {product.specs?.cpu && <SpecItem icon={<Cpu />} label="Prosesor (CPU)" value={product.specs.cpu} />}
              {product.specs?.ram && <SpecItem icon={<MemoryStick />} label="RAM" value={product.specs.ram} />}
              {product.specs?.storage && <SpecItem icon={<HardDrive />} label="Penyimpanan" value={product.specs.storage} />}
              {product.specs?.gpu && <SpecItem icon={<Monitor />} label="GPU" value={product.specs.gpu} />}
              {product.specs?.os && <SpecItem icon={<div className="os-icon" />} label="Sistem Operasi" value={product.specs.os} />}
            </div>
            <div className="modal-actions">
              <a className="contact-button" href={`https://wa.me/628975808407?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}><MessageCircle /> Hubungi Kami</a>
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


const Computer = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const pcProducts = produkData
      .filter(p => p.jenis?.toLowerCase() === 'pc')
      .sort((a, b) => a.name.localeCompare(b.name));
    setProducts(pcProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  return (
    <div className="computer-page">
      <Navbar />
      <ProductHeader
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedBrand={selectedBrand}
        onBrandChange={(e) => setSelectedBrand(e.target.value)}
        brandOptions={[...new Set(products.map(p => p.brand))].sort()}
      />

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

export default Computer;
