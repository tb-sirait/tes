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
  AppWindow,
  MessageCircle,
  Mail,
} from "lucide-react";
import "./Laptop.css";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

// Dynamically import all images under src/assets/produk
const images = import.meta.glob("../../assets/produk/**/*.{png,jpg,jpeg,svg}", { eager: true });

const imageMap = {};
for (const path in images) {
  // Normalize path to match JSON image paths
  const normalizedPath = path.replace(/^..\/..\/assets\//, "").replace(/\\\\/g, "/").replace(/\\/g, "/");
  imageMap[normalizedPath] = images[path].default || images[path];
}

const ProductCard = ({ product, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);

  // Use first image path from product.images to get image src from imageMap
  const firstImagePath = product.images && product.images.length > 0 ? product.images[0] : null;
  const imgSrc = imgError
    ? "/api/placeholder/200/150"
    : (firstImagePath && imageMap[firstImagePath]) || "/api/placeholder/200/150";

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
        <h1>Produk Smartphone</h1>
        <p>
          Temukan berbagai pilihan Smartphone dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda.
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

  // Use first image path from product.images to get image src from imageMap
  const firstImagePath = product.images && product.images.length > 0 ? product.images[0] : null;
  const imgSrc = (firstImagePath && imageMap[firstImagePath]) || '/api/placeholder/200/150';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img
              src={imgSrc}
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
              {product.specs?.cpu && <SpecItem icon={<Cpu />} label="Processor" value={product.specs.cpu} />}
              {product.specs?.ram && <SpecItem icon={<MemoryStick />} label="Memory" value={product.specs.ram} />}
              {product.specs?.storage && <SpecItem icon={<HardDrive />} label="Storage" value={product.specs.storage} />}
              {product.specs?.gpu && <SpecItem icon={<Monitor />} label="Graphics" value={product.specs.gpu} />}
              {product.specs?.os && <SpecItem icon={<AppWindow/>} label="Operating System" value={product.specs.os} />}
            </div>
            <div className="modal-actions">
              <a className="contact-button"
              href={`https://wa.me/6285545031039?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}><MessageCircle className="chat-icon"/> Hubungi Kami</a>
              <div className="extra-info">
                <p><strong>✨ Penawaran Spesial:</strong> Gratis konsultasi dan bantuan instalasi produk</p>
                <p><strong>🚚 Pesan Antar:</strong> Tersedia antar barang untuk Jakarta dan Sekitarnya</p>
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

export default Laptop;
