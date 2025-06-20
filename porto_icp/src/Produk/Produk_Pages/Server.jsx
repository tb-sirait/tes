import React, { useState, useEffect } from "react";
import serverData from "../server.json";
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

// Import all images dynamically from assets/produk folder
const images = import.meta.glob('../../assets/produk/**', { eager: true, as: 'url' });

const getImageUrl = (imagePath) => {
  // Normalize path to start with ../../assets/produk/
  const normalizedPath = imagePath.startsWith('assets/produk') ? '../../' + imagePath : imagePath;
  return images[normalizedPath] || null;
};

const ProductCard = ({ product, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError
    ? "/api/placeholder/200/150"
    : getImageUrl(product.gambar) || "/api/placeholder/200/150";

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
        </div>
        <div className="specs">
          {product.processor && <SpecItem icon={<Cpu />} label="Processor" value={product.processor} />}
          {product.memory && <SpecItem icon={<MemoryStick />} label="Memory" value={product.memory} />}
          {product.storage && <SpecItem icon={<HardDrive />} label="Storage" value={Array.isArray(product.storage) ? product.storage.join(", ") : product.storage} />}
          {product.raid && <SpecItem icon={<Filter />} label="RAID" value={product.raid} />}
          {product.psu && <SpecItem icon={<Star />} label="PSU" value={product.psu} />}
          {product.os && <SpecItem icon={<Monitor />} label="OS" value={product.os} />}
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
        <h1>Produk Server</h1>
        <p>
          Temukan berbagai pilihan Server dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda.
        </p>
      </div>

      <div className="search-filter-bar">
        <h5 style={{marginRight: "10px",color: "#1434a4"}}>Cari:</h5>
        <input
          type="text"
          placeholder="Cari server..."
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

  const storageValue = Array.isArray(product.storage) ? product.storage.join(", ") : product.storage;

  const imgSrc = getImageUrl(product.gambar) || '/api/placeholder/200/150';

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
            </div>
            <div className="modal-specs">
              {product.processor && <SpecItem icon={<Cpu />} label="Processor" value={product.processor} />}
              {product.memory && <SpecItem icon={<MemoryStick />} label="Memory" value={product.memory} />}
              {storageValue && <SpecItem icon={<HardDrive />} label="Storage" value={storageValue} />}
              {product.raid && <SpecItem icon={<Filter />} label="RAID" value={product.raid} />}
              {product.psu && <SpecItem icon={<Star />} label="PSU" value={product.psu} />}
              {product.os && <SpecItem icon={<Monitor />} label="OS" value={product.os} />}
              {product.tpm && <SpecItem icon={<Mail />} label="TPM" value={product.tpm} />}
              {product.idrac && <SpecItem icon={<Phone />} label="iDRAC" value={product.idrac} />}
              {product.network && product.network.length > 0 && (
                <SpecItem icon={<Filter />} label="Network" value={product.network.join(", ")} />
              )}
              {product.accessories && product.accessories.length > 0 && (
                <SpecItem icon={<Star />} label="Accessories" value={product.accessories.join(", ")} />
              )}
            </div>
            <div className="modal-actions">
              <a className="contact-button" href={`https://wa.me/628975808407?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}><MessageCircle /> Hubungi Kami</a>
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

const Server = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const sortedServers = serverData.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sortedServers);
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
          <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
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

export default Server;
