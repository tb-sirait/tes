import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import produkData from "../produk.json";
import { Helmet } from "react-helmet";
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
  AppWindow,
  Mail,
} from "lucide-react";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

// Dynamically import all images under src/assets/produk
const images = import.meta.glob("../../assets/produk/**/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const imageMap = {};
for (const path in images) {
  // Normalize path to match JSON image paths
  const normalizedPath = path
    .replace(/^..\/..\/assets\//, "")
    .replace(/\\\\/g, "/")
    .replace(/\\/g, "/");
  imageMap[normalizedPath] = images[path].default || images[path];
}

const ProductCard = ({ product, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);

  // Use first image path from product.images to get image src from imageMap
  const firstImagePath =
    product.images && product.images.length > 0 ? product.images[0] : null;
  const imgSrc = imgError
    ? "/api/placeholder/200/150"
    : (firstImagePath && imageMap[firstImagePath]) ||
      "/api/placeholder/200/150";

  return (
    <>
      <Helmet>
        <title>Komputer | Infoduta Computindo Perkasa</title>
        <meta
          name="description"
          content="Temukan berbagai pilihan Komputer dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Komputer, PC, Desktop, Workstation, Infoduta Cipta Pratama, Solusi IT, Perangkat Keras, Hardware, Komputer Bisnis"
        />
        <meta name="author" content="Infoduta Computindo Perkasa" />
        <meta
          property="og:title"
          content="Produk Komputer - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Komputer dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:image"
          content="https://www.infoduta.com/og-image-produk-komputer.jpg"
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/computer"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.infoduta.com/produk/computer" />
      </Helmet>
      <div
        className="filter-product-card"
        onClick={() => onViewDetails(product)}
      >
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
            <span className="type">{product.jenis}</span>
          </div>
          <div className="filter-specs">
            {product.specs?.cpu && (
              <SpecItem
                icon={<Cpu />}
                label="Prosesor"
                value={product.specs.cpu}
              />
            )}
            {product.specs?.ram && (
              <SpecItem
                icon={<MemoryStick />}
                label="RAM"
                value={product.specs.ram}
              />
            )}
            {product.specs?.storage && (
              <SpecItem
                icon={<HardDrive />}
                label="Penyimpanan"
                value={product.specs.storage}
              />
            )}
            {product.specs?.gpu && (
              <SpecItem
                icon={<Monitor />}
                label="GPU"
                value={product.specs.gpu}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SpecItem = ({ icon, label, value }) => (
  <div className="filter-spec-item">
    <div className="icon-box">{icon}</div>
    <div className="spec-text">
      <strong>{label}</strong>&nbsp;<small>{value}</small>
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
        <h1>Produk Komputer</h1>
        <p>
          Temukan berbagai pilihan Komputer dengan spesifikasi terbaik yang
          sesuai dengan kebutuhan perusahaan Anda.
        </p>
      </div>

      <div className="laptop-search-filter-bar">
        <h5 style={{ marginRight: "10px", color: "#1434a4" }}>Cari:</h5>
        <input
          type="text"
          placeholder="Cari barang..."
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
  const [imgError, setImgError] = React.useState(false);
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
      document.documentElement.style.overflow = "hidden"; // kunci scroll
    } else {
      document.documentElement.style.overflow = "auto"; // hidupkan lagi
    }

    return () => {
      document.documentElement.style.overflow = "auto"; // cleanup
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Use first image path from product.images to get image src from imageMap
  const firstImagePath =
    product.images && product.images.length > 0 ? product.images[0] : null;
  const imgSrc = imgError
    ? "/api/placeholder/200/150"
    : (firstImagePath && imageMap[firstImagePath]) ||
      "/api/placeholder/200/150";

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
            <img
              src={imgSrc}
              alt={product.name}
              onError={() => setImgError(true)}
            />
          </div>
          <div className="filter-modal-details">
            <h2>{product.name}</h2>
            <div className="meta">
              <span className="brand-tag">{product.brand}</span>
              <span> | </span>
              <span className="type-tag">{product.jenis}</span>
            </div>
            <div className="filter-modal-specs">
              {product.specs?.cpu && (
                <SpecItem
                  icon={<Cpu />}
                  label="Prosesor (CPU)"
                  value={product.specs.cpu}
                />
              )}
              {product.specs?.ram && (
                <SpecItem
                  icon={<MemoryStick />}
                  label="RAM"
                  value={product.specs.ram}
                />
              )}
              {product.specs?.storage && (
                <SpecItem
                  icon={<HardDrive />}
                  label="Penyimpanan"
                  value={product.specs.storage}
                />
              )}
              {product.specs?.gpu && (
                <SpecItem
                  icon={<Monitor />}
                  label="GPU"
                  value={product.specs.gpu}
                />
              )}
              {product.specs?.os && (
                <SpecItem
                  icon={<AppWindow />}
                  label="Sistem Operasi"
                  value={product.specs.os}
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

const Computer = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams(); // <-- ambil param dari URL

  useEffect(() => {
    const pcProducts = produkData
      .filter((p) => p.jenis?.toLowerCase() === "pc")
      .sort((a, b) => a.name.localeCompare(b.name));
    setProducts(pcProducts);
  }, []);

  // kalau ada params, buka modal produk sesuai id
  useEffect(() => {
    if (id && products.length > 0) {
      const found = products.find((p) => String(p.id) === id);
      if (found) {
        setSelectedProduct(found);
      }
    }
  }, [id, products]);

  const filteredProducts = products.filter((product) => {
    const brandMatch = !selectedBrand || product.brand === selectedBrand;
    const nameMatch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    navigate(`/produk/computer/${product.brand}/${product.id}`); // <-- update URL
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    navigate("/produk/computer"); // <-- reset URL ke /computer
  };

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
            key={product.name}
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

export default Computer;
