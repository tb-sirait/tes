import React, { useState, useEffect } from "react";
import serverData from "../server.json";
import "./laptop.css";

import { useNavigate, useParams } from "react-router-dom";

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
const images = import.meta.glob("../../assets/produk/**", {
  eager: true,
  as: "url",
});

const getImageUrl = (imagePath) => {
  // Normalize path to start with ../../assets/produk/
  const normalizedPath = imagePath.startsWith("assets/produk")
    ? "../../" + imagePath
    : imagePath;
  return images[normalizedPath] || null;
};

const ProductCard = ({ product, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError
    ? "/api/placeholder/200/150"
    : getImageUrl(product.gambar) || "/api/placeholder/200/150";

  return (
    <div className="filter-product-card" onClick={() => onViewDetails(product)}>
      <div className="filter-product-image">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgError(true)}
        />
      </div>
      <div className="filter-product-info">
        <h3>{product.name}</h3>
        <div className="filter-product-meta">
          <span className="brand">{product.brand}</span>
        </div>
        <div className="filter-specs">
          {product.processor && (
            <SpecItem
              icon={<Cpu />}
              label="Processor"
              value={product.processor}
            />
          )}
          {product.memory && (
            <SpecItem
              icon={<MemoryStick />}
              label="Memory"
              value={product.memory}
            />
          )}
          {product.storage && (
            <SpecItem
              icon={<HardDrive />}
              label="Storage"
              value={
                Array.isArray(product.storage)
                  ? product.storage.join(", ")
                  : product.storage
              }
            />
          )}
          {product.raid && (
            <SpecItem icon={<Filter />} label="RAID" value={product.raid} />
          )}
          {product.psu && (
            <SpecItem icon={<Star />} label="PSU" value={product.psu} />
          )}
          {product.os && (
            <SpecItem icon={<Monitor />} label="OS" value={product.os} />
          )}
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ icon, label, value }) => (
  <div className="filter-spec-item">
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
    <div className="filter-product-header">
      <div className="header-text">
        <h1>Produk Server</h1>
        <p>
          Temukan berbagai pilihan Server dengan spesifikasi terbaik yang sesuai
          dengan kebutuhan perusahaan Anda.
        </p>
      </div>

      <div className="laptop-search-filter-bar">
        <h5 style={{ marginRight: "10px", color: "#1434a4" }}>Cari:</h5>
        <input
          type="text"
          placeholder="Cari server..."
          value={searchQuery}
          onChange={onSearchChange}
          className="laptop-search-input"
        />
        <select
          value={selectedBrand}
          onChange={onBrandChange}
          className="brand-select"
        >
          <option value="">Semua Merek</option>
          {brandOptions.map((brand, idx) => (
            <option key={idx} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ProductModal = ({ product, isOpen, onClose }) => {
  useEffect(() => {
      const handleEsc = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const storageValue = Array.isArray(product.storage)
    ? product.storage.join(", ")
    : product.storage;

  const imgSrc = getImageUrl(product.gambar) || "/api/placeholder/200/150";

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div
        className="filter-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="filter-modal-body">
          <div className="filter-modal-image">
            <img src={imgSrc} alt={product.name} />
          </div>
          <div className="filter-modaldetails">
            <h2>{product.name}</h2>
            <div className="meta">
              <span className="brand-tag">{product.brand}</span>
            </div>
            <div className="filter-modal-specs">
              {product.processor && (
                <SpecItem
                  icon={<Cpu />}
                  label="Processor"
                  value={product.processor}
                />
              )}
              {product.memory && (
                <SpecItem
                  icon={<MemoryStick />}
                  label="Memory"
                  value={product.memory}
                />
              )}
              {storageValue && (
                <SpecItem
                  icon={<HardDrive />}
                  label="Storage"
                  value={storageValue}
                />
              )}
              {product.raid && (
                <SpecItem icon={<Filter />} label="RAID" value={product.raid} />
              )}
              {product.psu && (
                <SpecItem icon={<Star />} label="PSU" value={product.psu} />
              )}
              {product.os && (
                <SpecItem icon={<Monitor />} label="OS" value={product.os} />
              )}
              {product.tpm && (
                <SpecItem icon={<Mail />} label="TPM" value={product.tpm} />
              )}
              {product.idrac && (
                <SpecItem
                  icon={<Phone />}
                  label="iDRAC"
                  value={product.idrac}
                />
              )}
              {product.network && product.network.length > 0 && (
                <SpecItem
                  icon={<Filter />}
                  label="Network"
                  value={product.network.join(", ")}
                />
              )}
              {product.accessories && product.accessories.length > 0 && (
                <SpecItem
                  icon={<Star />}
                  label="Accessories"
                  value={product.accessories.join(", ")}
                />
              )}
            </div>
            <div className="filter-modal-actions">
              <a
                className="contact-button"
                href={`https://wa.me/6285545031039?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`}
              >
                <MessageCircle className="chat-icon" /> Hubungi Kami
              </a>
              <div className="extra-info">
                <p>
                  <strong>✨ Penawaran spesial:</strong> Gratis konsultasi dan
                  bantuan instalasi produk.
                </p>
                <p>
                  <strong>🚚 Pesan Antar:</strong> Tersedia antar barang untuk
                  Jakarta dan Sekitarnya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Server = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    // Update URL tanpa reload halaman
    navigate(`/produk/server/${product.brand}/${product.id}`);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    // Kembalikan URL ke /produk tanpa reload halaman
    navigate("/produk/server");
  };

  useEffect(() => {
    const sortedServers = serverData.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    setProducts(sortedServers);
  }, []);

  const filteredProducts = products.filter((product) => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  useEffect(() => {
    if (id && products.length > 0) {
      const found = products.find((p) => String(p.id) === id);
      if (found) {
        setSelectedProduct(found);
      }
    }
  }, [id, products]);

  return (
    <div className="laptop-page">
      <Navbar />
      <ProductHeader
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedBrand={selectedBrand}
        onBrandChange={(e) => setSelectedBrand(e.target.value)}
        brandOptions={[...new Set(products.map((p) => p.brand))].sort()}
      />

      <div className="filter-product-grid" style={{ marginTop: "30px" }}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={handleOpenModal}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />

      <Footer />
    </div>
  );
};

export default Server;
