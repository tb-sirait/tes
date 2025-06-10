import React, { useState, useEffect } from "react";
import produkData from "../produk.json";

import "./Laptop.css";

import DellLatitude3440Laptop1 from "../../assets/produk/Dell/Notebook/Lattitude/3440_Laptop/1.png";
import LenovoNotebookV141 from "../../assets/produk/Lenovo/Notebook_V14/1.png";
import DellXPS93101 from "../../assets/produk/Dell/Notebook/XPS/9310/1.png";
import DellLatitude34201 from "../../assets/produk/Dell/Notebook/Lattitude/3420/1.png";
import DellLatitude34401 from "../../assets/produk/Dell/Notebook/Lattitude/3440_laptop/1.png";
import LenovoL141 from "../../assets/produk/Lenovo/L14/1.png";
import AcerTravelMate1 from "../../assets/produk/Acer/TravelMate/1.png";
import DellLatitude33901 from "../../assets/produk/Dell/Notebook/Lattitude/3390/1.png";
import DellLatitude34101 from "../../assets/produk/Dell/Notebook/Lattitude/3410/1.png";
import DellXPS93101_2 from "../../assets/produk/Dell/Notebook/XPS/9310/1.png";
import DellXPS95101 from "../../assets/produk/Dell/Notebook/XPS/9510/1.png";
import DellVostro34001 from "../../assets/produk/Dell/Notebook/Vostro/3400/1.png";
import DellLatitude73101 from "../../assets/produk/Dell/Notebook/Lattitude/7310/1.png";
import LenovoX121 from "../../assets/produk/Lenovo/X12/1.png";
import LenovoE141 from "../../assets/produk/Lenovo/E14/1.png";
import LenovoL131 from "../../assets/produk/Lenovo/L13/1.png";

const imageMap = {
  "Latitude 3440 Laptop": DellLatitude3440Laptop1,
  "Notebook V14-IIL": LenovoNotebookV141,
  "XPS 9310 Laptop": DellXPS93101,
  "Latitude 3420": DellLatitude34201,
  "Latitude 3440": DellLatitude34401,
  "ThinkPad L14 Gen 4": LenovoL141,
  "TravelMate P214": AcerTravelMate1,
  "Latitude 3390 2-in-1": DellLatitude33901,
  "Latitude 3410": DellLatitude34101,
  "XPS 9310": DellXPS93101_2,
  "XPS 15 (9510)": DellXPS95101,
  "Vostro 3400 i5-1135G7": DellVostro34001,
  "Latitude 7310 CTO 8GB": DellLatitude73101,
  "Lenovo X12 Detachable Gen 2 (Type 21LK, 21LL)": LenovoX121,
  "Lenovo Think Pad E14 Gen 6": LenovoE141,
  "Lenovo Thinkpad L13 Gen 5 Screen 13.3”": LenovoL131,
};

import {
  Search,
  Filter,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  X,
  AppWindow,
  MessageCircle,
} from "lucide-react";
import "./Laptop.css";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

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
        <h1>Produk Laptop</h1>
        <p>
          Temukan berbagai pilihan laptop dengan spesifikasi terbaik yang sesuai dengan kebutuhan Anda.
        </p>
      </div>

      <div className="search-filter-bar">
        <h5 style={{marginRight: "0px",color: "#1434a4"}}>Cari:</h5>
        <input
          type="text"
          placeholder="Cari laptop..."
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

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="laptop-page modal-overlay" onClick={onClose}>
      <div className="laptop-page modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img
          src={product.images?.[0] ? imageMap[product.name] || '/api/placeholder/200/150' : '/api/placeholder/200/150'}
          alt={product.name}
        />
      </div>
      <div className="modal-details">
        <h2>{product.name}</h2>
        <div className="meta">
          <span className="brand-tag">{product.brand} </span>
          <span> | </span>
          <span className="type-tag">{product.jenis}</span>
        </div>
        <div className="modal-specs">
          {product.specs?.cpu && <SpecItem icon={<Cpu />} label="Prosesor (CPU)" value={product.specs.cpu} />}
          {product.specs?.ram && <SpecItem icon={<MemoryStick />} label="RAM" value={product.specs.ram} />}
          {product.specs?.storage && <SpecItem icon={<HardDrive />} label="Penyimpanan" value={product.specs.storage} />}
          {product.specs?.gpu && <SpecItem icon={<Monitor />} label="GPU" value={product.specs.gpu} />}
          {product.specs?.os && <SpecItem icon={<AppWindow />} label="Sistem Operasi" value={product.specs.os} />}
        </div>
        <div className="modal-actions">
          <div className="contact-options">
            <a className="contact-button"
            href={`https://wa.me/628975808407?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}>
            <MessageCircle />
             Hubungi Kami</a>
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

const Laptop = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const laptopProducts = produkData
      .filter(p => p.jenis?.toLowerCase() === 'laptop')
      .sort((a, b) => a.name.localeCompare(b.name));
    setProducts(laptopProducts);
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
        brandOptions={[...new Set(products.map(p => p.brand))]}
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
