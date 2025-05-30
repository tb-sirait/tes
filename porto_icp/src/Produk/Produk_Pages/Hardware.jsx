/* eslint-disable react-hooks/rules-of-hooks */
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

// Import images explicitly
import hp_ink1 from "../../assets/produk/hp_ink/1.png";
import hp_ink2 from "../../assets/produk/hp_ink/2.png";
import hp_ink3 from "../../assets/produk/hp_ink/3.png";
import hp_ink4 from "../../assets/produk/hp_ink/4.png";
import hp_toner1 from "../../assets/produk/hp_toner/1.png";
import logitech1 from "../../assets/produk/hardware/logitech/1.png";
import seagate1 from "../../assets/produk/hardware/seagate/1.png";
import apc1 from "../../assets/produk/hardware/APC/1.png";
import tplink1 from "../../assets/produk/hardware/tplink/1.png";
import canon1 from "../../assets/produk/hardware/canon/1.png";
import lg1 from "../../assets/produk/hardware/LG/1.png";
import epson1 from "../../assets/produk/hardware/epson/1.png";
import benq1 from "../../assets/produk/hardware/benq/1.png";
import apple1 from "../../assets/produk/hardware/apple/1.png";
import apple2 from "../../assets/produk/hardware/apple/2.png";

const imageMap = {
  "Toner HP 119 A Black": hp_toner1,
  "Toner HP 119 A Cyan": hp_toner1,
  "Toner HP 119 A Magenta": hp_toner1,
  "Toner HP 119 A Yellow": hp_toner1,
  "Tinta HP GT53 Black": hp_ink3,
  "Tinta HP GT52 Cyan": hp_ink4,
  "Tinta HP GT52 Magenta": hp_ink2,
  "Tinta HP GT52 Yellow": hp_ink1,
  "K400 Plus Wireless Touch Keyboard": logitech1,
  "HDD 16TB Seagate Iron Wolf Pro ST16000NT001": seagate1,
  "UPS APC BV1000IMS": apc1,
  "TP Link - SG2008": tplink1,
  "Scanner Canon Lide 300": canon1,
  "Monitor LG 24MR400-B 24” FULL HD DISPLAY WITH AMD FREESYNC 100HZ": lg1,
  "Printer Epson L3210": epson1,
  "Projector BenQ MX560 4000 lumens, XGA, DLP": benq1,
  "Apple Magic Mouse Black Multitouch": apple2,
  "Apple Adapter 20W USB-C": apple1,
};



const HardwareCard = ({ product, onViewDetails }) => {
  const [setImgError] = useState(false);
  const imgSrc = imageMap[product.name] || "";

  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image">
        <img src={imgSrc} alt={product.name} onError={() => setImgError(true)} />
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
  const [setImgError] = useState(false);
  const imgSrc = imageMap[product.name] || "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img src={imgSrc} alt={product.name} onError={() => setImgError(true)} />
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
                href={`https://wa.me/628975808407?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}
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
