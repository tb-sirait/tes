import React, { useState, useEffect } from "react";
import softwareData from "../software.json";
import "./Laptop.css";
import {
  Search,
  X,
  MessageCircle,
} from "lucide-react";
import "./Laptop.css";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

// Import images explicitly
import microsoft1 from "../../assets/software/microsoft/1.png";
import microsoft2 from "../../assets/software/microsoft/2.png";
import microsoft3 from "../../assets/software/microsoft/3.png";
import microsoft4 from "../../assets/software/microsoft/4.png";
import microsoft5 from "../../assets/software/microsoft/5.png";
import microsoft6 from "../../assets/software/microsoft/6.png";
import windows1 from "../../assets/software/windows/1.png";
import adobe1 from "../../assets/software/adobe/1.png";
import sql1 from "../../assets/software/sql/1.png";

const imageMap = {
  "Microsoft Office 365 Family": microsoft1,
  "Microsoft Office 365 Personal": microsoft2,
  "Microsoft Office 2024 Home and Student": microsoft3,
  "Microsoft Office 2024 Home and Business": microsoft4,
  "Microsoft Office Standard 2024": microsoft5,
  "Microsoft Office Professional Plus 2024": microsoft6,
  "Windows 11 Pro": windows1,
  "Windows Server 2025 Standard - 16 Core License Pack": microsoft2,
  "Acrobat Pro for teams Subscription New": adobe1,
  "Microsoft SQL Server 2022 Standard Edition": sql1,
};

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image">
        <img
          src={imageMap[product.name] || ""}
          alt={product.name}
          style={{ width: "100%", height: "150px", objectFit: "contain" }}
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        {product.usage && <p style={{ fontSize: "13px",color: "#f1f2e2" }}>Penggunaan: {product.usage}</p>}
      </div>
    </div>
  );
};

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const imgSrc = imageMap[product.name] || "/api/placeholder/200/150";

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
            {product.usage && <p>Penggunaan: {product.usage}</p>}
            <div className="modal-actions">
              <a className="contact-button"
              href={`https://wa.me/6285545031039?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}><MessageCircle /> Hubungi Kami</a>
            </div>
            <div className="extra-info">
              <p><strong>✨ Penawaran spesial:</strong> Gratis konsultasi dan bantuan instalasi produk.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductHeader = ({
  searchQuery,
  onSearchChange,
  selectedUsage,
  onUsageChange,
  usageOptions,
}) => {
  return (
    <div className="product-header">
      <div className="header-text">
        <h1>Produk Software</h1>
        <p>
          Temukan berbagai pilihan software yang sesuai dengan kebutuhan perushaan Anda.
        </p>
      </div>

      <div className="search-filter-bar">
        <h5 style={{marginRight: "0px",color: "#1434a4"}}>Cari:</h5>
        <input
          type="text"
          placeholder="Cari software..."
          value={searchQuery}
          onChange={onSearchChange}
          className="search-input"
        />
        <select
          value={selectedUsage}
          onChange={onUsageChange}
          className="brand-select"
        >
          <option value="">Opsi Penggunaan</option>
          {usageOptions.map((usage, idx) => (
            <option key={idx} value={usage}>{usage}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Software = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedUsage, setSelectedUsage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const sortedProducts = softwareData.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sortedProducts);
  }, []);

  // Extract unique usage options from products
  const usageOptions = Array.from(new Set(products.map(p => p.usage).filter(Boolean)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUsage = !selectedUsage || product.usage === selectedUsage;
    return matchesSearch && matchesUsage;
  });

  return (
    <div className="laptop-page">
      <Navbar />
      <ProductHeader
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedUsage={selectedUsage}
        onUsageChange={(e) => setSelectedUsage(e.target.value)}
        usageOptions={usageOptions}
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

export default Software;
