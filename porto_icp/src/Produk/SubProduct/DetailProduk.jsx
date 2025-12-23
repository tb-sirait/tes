import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  AppWindow,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Package,
  Shield,
  Truck,
} from "lucide-react";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";
import produkData from "../produk.json";
import "./detailproduk.css";

// Dynamically import all images
const images = import.meta.glob("../../assets/produk/**/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const imageMap = {};
for (const path in images) {
  const normalizedPath = path
    .replace(/^..\/..\/assets\//, "")
    .replace(/\\\\/g, "/")
    .replace(/\\/g, "/");
  imageMap[normalizedPath] = images[path].default || images[path];
}

const DetailProduk = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { brand, id } = useParams();

  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("spesifikasi");
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    const found = produkData.find((p) => String(p.id) === id);
    if (found) {
      setProduct(found);
      document.title = `${found.name} | Infoduta Computindo Perkasa`;
    } else {
      document.title = "Produk Tidak Ditemukan | Infoduta Computindo Perkasa";
    }
  }, [id]);

  if (!product) {
    return (
      <div className="details-page">
        <Navbar />
        <div className="details-not-found">
          <h2>Produk tidak ditemukan</h2>
          <button onClick={() => navigate(-1)}>Kembali</button>
        </div>
        <Footer />
      </div>
    );
  }

  const imagePaths = product.images || [];
  const currentImagePath = imagePaths[currentImageIndex];
  const currentImageSrc = imgError[currentImageIndex]
    ? "/api/placeholder/400/300"
    : (currentImagePath && imageMap[currentImagePath]) ||
      "/api/placeholder/400/300";

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imagePaths.length - 1 : prev - 1,
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Breadcrumb
  const getBreadcrumb = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    const categoryPath = paths[1]; // produk/computer -> computer

    return (
      <div className="details-breadcrumb">
        <span onClick={() => navigate("/")} className="details-breadcrumb-link">
          Beranda
        </span>
        <span className="details-breadcrumb-separator">/</span>
        <span
          onClick={() => navigate("/produk")}
          className="details-breadcrumb-link"
        >
          Produk
        </span>
        <span className="details-breadcrumb-separator">/</span>
        <span
          onClick={() => navigate(`/produk/${categoryPath}`)}
          className="details-breadcrumb-link"
        >
          {categoryPath.charAt(0).toUpperCase() + categoryPath.slice(1)}
        </span>
        <span className="details-breadcrumb-separator">/</span>
        <span className="details-breadcrumb-link">{product.brand}</span>
        <span className="details-breadcrumb-separator">/</span>
        <span className="details-breadcrumb-current">{product.name}</span>
      </div>
    );
  };

  // Render thumbnails with navigation
  const renderThumbnails = () => {
    const visibleThumbs = 3;
    const startIndex = Math.max(
      0,
      currentImageIndex - Math.floor(visibleThumbs / 2),
    );
    const endIndex = Math.min(imagePaths.length, startIndex + visibleThumbs);
    const adjustedStart = Math.max(0, endIndex - visibleThumbs);

    return (
      <div className="details-thumbnails-container">
        {imagePaths.length > visibleThumbs && currentImageIndex > 0 && (
          <button
            className="details-thumbnail-nav details-thumbnail-prev"
            onClick={handlePrevImage}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="details-thumbnails">
          {imagePaths.slice(adjustedStart, endIndex).map((imgPath, idx) => {
            const actualIndex = adjustedStart + idx;
            const thumbSrc = imgError[actualIndex]
              ? "/api/placeholder/80/60"
              : (imgPath && imageMap[imgPath]) || "/api/placeholder/80/60";

            return (
              <div
                key={actualIndex}
                className={`details-thumbnail ${
                  actualIndex === currentImageIndex ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(actualIndex)}
              >
                <img
                  src={thumbSrc}
                  alt={`${product.name} ${actualIndex + 1}`}
                  onError={() =>
                    setImgError((prev) => ({ ...prev, [actualIndex]: true }))
                  }
                />
              </div>
            );
          })}
        </div>

        {imagePaths.length > visibleThumbs &&
          currentImageIndex < imagePaths.length - 1 && (
            <button
              className="details-thumbnail-nav details-thumbnail-next"
              onClick={handleNextImage}
            >
              <ChevronRight size={20} />
            </button>
          )}
      </div>
    );
  };

  return (
    <div className="details-page">
      <Navbar />

      {/* Breadcrumb */}
      {getBreadcrumb()}

      {/* Product Detail Section */}
      <div className="details-container">
        {/* Left - Product Image */}
        <div className="details-image-section">
          <div className="details-main-image">
            <img
              src={currentImageSrc}
              alt={product.name}
              onError={() =>
                setImgError((prev) => ({ ...prev, [currentImageIndex]: true }))
              }
            />
          </div>

          {imagePaths.length > 0 && renderThumbnails()}
        </div>

        {/* Right - Product Info */}
        <div className="details-info-section">
          <h1>{product.name}</h1>
          <div className="details-meta">
            <span className="details-brand-tag">{product.brand}</span>
            <span className="details-type-tag">{product.jenis}</span>
          </div>

          <div className="details-description">
            <h3>Deskripsi:</h3>
            <p>{product.deskripsi || "Deskripsi produk tidak tersedia."}</p>
          </div>

          <a
            className="details-contact-button"
            href={`https://wa.me/6285545031039?text=${encodeURIComponent(
              `Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} /> Hubungi Kami
          </a>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="details-tabs-container">
        <div className="details-tabs-header">
          <button
            className={`details-tab ${activeTab === "spesifikasi" ? "active" : ""}`}
            onClick={() => setActiveTab("spesifikasi")}
          >
            Detail Spesifikasi
          </button>
          <button
            className={`details-tab ${activeTab === "layanan" ? "active" : ""}`}
            onClick={() => setActiveTab("layanan")}
          >
            Layanan produk
          </button>
          <button
            className={`details-tab ${activeTab === "aftersales" ? "active" : ""}`}
            onClick={() => setActiveTab("aftersales")}
          >
            Layanan Purna Jual
          </button>
        </div>

        <div className="details-tabs-content">
          {activeTab === "spesifikasi" && (
            <div className="details-specs-content">
              {product.specs?.cpu && (
                <div className="details-spec-row">
                  <div className="details-spec-icon">
                    <Cpu size={24} />
                  </div>
                  <div className="details-spec-info">
                    <strong>Prosesor (CPU)</strong>
                    <span>{product.specs.cpu}</span>
                  </div>
                </div>
              )}
              {product.specs?.ram && (
                <div className="details-spec-row">
                  <div className="details-spec-icon">
                    <MemoryStick size={24} />
                  </div>
                  <div className="details-spec-info">
                    <strong>RAM</strong>
                    <span>{product.specs.ram}</span>
                  </div>
                </div>
              )}
              {product.specs?.storage && (
                <div className="details-spec-row">
                  <div className="details-spec-icon">
                    <HardDrive size={24} />
                  </div>
                  <div className="details-spec-info">
                    <strong>Penyimpanan</strong>
                    <span>{product.specs.storage}</span>
                  </div>
                </div>
              )}
              {product.specs?.gpu && (
                <div className="details-spec-row">
                  <div className="details-spec-icon">
                    <Monitor size={24} />
                  </div>
                  <div className="details-spec-info">
                    <strong>GPU</strong>
                    <span>{product.specs.gpu}</span>
                  </div>
                </div>
              )}
              {product.specs?.os && (
                <div className="details-spec-row">
                  <div className="details-spec-icon">
                    <AppWindow size={24} />
                  </div>
                  <div className="details-spec-info">
                    <strong>Sistem Operasi</strong>
                    <span>{product.specs.os}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "layanan" && (
            <div className="details-service-content">
              <div className="details-service-card">
                <Truck size={32} />
                <h3>Pengiriman Jabodetabek</h3>
                <p>
                  Kami menyediakan layanan pengiriman khusus untuk wilayah
                  Jakarta, Bogor, Depok, Tangerang, dan Bekasi dengan armada
                  sendiri.
                </p>
              </div>
              <div className="details-service-card">
                <Package size={32} />
                <h3>Kirim Paket Jarak Jauh</h3>
                <p>
                  Untuk pengiriman ke luar Jabodetabek, kami bekerja sama dengan
                  jasa ekspedisi terpercaya untuk memastikan produk sampai
                  dengan aman.
                </p>
              </div>
            </div>
          )}

          {activeTab === "aftersales" && (
            <div className="details-aftersales-content">
              <div className="details-warranty-card">
                <Shield size={32} />
                <h3>Garansi Toko</h3>
                <ul>
                  <li>Garansi penggantian unit jika terdapat cacat produksi</li>
                  <li>Berlaku 7 hari setelah pembelian</li>
                  <li>
                    Syarat: produk dalam kondisi lengkap dan belum dimodifikasi
                  </li>
                </ul>
              </div>
              <div className="details-warranty-card">
                <Shield size={32} />
                <h3>Garansi Produk</h3>
                <ul>
                  <li>Garansi resmi dari distributor/brand</li>
                  <li>Berlaku sesuai ketentuan masing-masing brand</li>
                  <li>Meliputi kerusakan hardware dan software bawaan</li>
                </ul>
              </div>
              <div className="details-warranty-card">
                <Package size={32} />
                <h3>Yang Digaransi</h3>
                <ul>
                  <li>Unit produk utama</li>
                  <li>Aksesori resmi yang disertakan</li>
                  <li>Pengiriman (jika terjadi kerusakan saat pengiriman)</li>
                  <li>Instalasi awal (gratis konsultasi teknis)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailProduk;
