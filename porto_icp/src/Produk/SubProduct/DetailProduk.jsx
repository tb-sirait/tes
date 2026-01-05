import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  Pickaxe as Service,
  Send,
} from "lucide-react";
import Navbar from "../../Navigation/Navbar.jsx";
import Footer from "../../Navigation/footer.jsx";

// Import semua data sources
import produkData from "../produk.json";
import hardwareData from "../hardware.json";
import softwareData from "../software.json";
import sparepartData from "../../Produk/sparepart.json";
import serverData from "../server.json";

import "./detailproduk.css";

// Dynamically import all images
const images = import.meta.glob("../../assets/produk/**/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

// Software images
import microsoft1 from "../../assets/software/microsoft/1.png";
import microsoft2 from "../../assets/software/microsoft/2.png";
import microsoft3 from "../../assets/software/microsoft/3.png";
import microsoft4 from "../../assets/software/microsoft/4.png";
import microsoft5 from "../../assets/software/microsoft/5.png";
import microsoft6 from "../../assets/software/microsoft/6.png";
import windows1 from "../../assets/software/windows/1.png";
import adobe1 from "../../assets/software/adobe/1.png";
import adobe2 from "../../assets/software/adobe/2.png";
import adobe3 from "../../assets/software/adobe/3.png";
import sql1 from "../../assets/software/sql/1.png";
import sql2 from "../../assets/software/sql/2.png";
import heimdal1 from "../../assets/software/heimdal/1.png";
import pdf1 from "../../assets/software/pdf/1.png";
import autocad1 from "../../assets/software/autocad/1.png";
import autocad2 from "../../assets/software/autocad/2.png";
import thinkcell1 from "../../assets/software/thinkcell/1.png";
import sketchup1 from "../../assets/software/sketchup/1.png";
import enscape1 from "../../assets/software/enscape/1.png";
import chatgpt1 from "../../assets/software/chatgpt/1.png";
import hootsuite1 from "../../assets/software/hootsuite/1.png";
import sid1 from "../../assets/software/sid/1.png";
import figma1 from "../../assets/software/figma/1.svg";
import vmware1 from "../../assets/software/vmware/1.png";
import fortitoken1 from "../../assets/software/fortitoken/1.svg";
import canva1 from "../../assets/software/canva/1.png";

const softwareImageMap = {
  "Microsoft Office 365 Family": microsoft1,
  "Microsoft Office 365 Personal": microsoft2,
  "Microsoft Office 2024 Home and Student": microsoft3,
  "Microsoft Office 2024 Home and Business": microsoft4,
  "Microsoft Office Professional Plus 2024": microsoft6,
  "Microsoft Office Standard 2024": microsoft5,
  "Windows 11 Pro": windows1,
  "Acrobat Pro for teams Subscription New": adobe1,
  "Windows Server 2025 Standard - 16 Core License Pack": microsoft2,
  "Microsoft SQL Server 2022 Standard Edition": sql1,
  "Heimdal EPDR Plus & Ransomware Encryption Protection": heimdal1,
  "PDF Exchange Pro": pdf1,
  "AutoCAD LT 2024 Commercial New Single-user": autocad1,
  "AutoCAD LT 2026 Commercial New Single-user ELD Annual Subscription":
    autocad2,
  "Thinkcell Annual Subscription": thinkcell1,
  "Software SketchUp Pro For Professional Use, ANN TRM CTR": sketchup1,
  "SketchUp Pro For Professional Use": sketchup1,
  "Software Enscape Fixed Seat License": enscape1,
  "ChatGPT Team": chatgpt1,
  "Hootsuite Professional": hootsuite1,
  "S.id – Pro": sid1,
  "Figma Organization Dev Seat": figma1,
  "License Figma Full Seat": figma1,
  "Adobe Illustrator": adobe2,
  "Adobe Photoshop": adobe3,
  "Windows Server 2025  - CAL": microsoft3,
  "Windows Server 2025 Standard": microsoft4,
  "SQL Server Standard Edition": sql2,
  "Vmware Cloud Foundation 5": vmware1,
  FortiToken: fortitoken1,
  "Canva PRO": canva1,
};

const imageMap = {};
for (const path in images) {
  const normalizedPath = path
    .replace(/^..\/..\/assets\//, "")
    .replace(/\\\\/g, "/")
    .replace(/\\/g, "/");
  imageMap[normalizedPath] = images[path].default || images[path];
}

const DetailProduk = ({ dataSource }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // brand tidak digunakan, jadi dihapus

  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("spesifikasi");
  const [imgError, setImgError] = useState({});

  // Determine category from URL path
  const category = location.pathname.split("/")[2]; // e.g., "server" from "/produk/server/Dell/1"

  // Effect untuk update document title secara manual (fallback)
  useEffect(() => {
    if (product && product.name && product.brand) {
      document.title = `${product.name} - ${product.brand} | Infoduta Computindo Perkasa`;
    }
  }, [product]);

  // Effect untuk load product data
  useEffect(() => {
    let found = null;
    let dataSourceType = "";

    // Get data based on dataSource prop
    const getData = () => {
      if (dataSource === "../hardware.json")
        return { data: hardwareData, type: "hardware" };
      if (dataSource === "../software.json")
        return { data: softwareData, type: "software" };
      if (dataSource === "../../Produk/sparepart.json")
        return { data: sparepartData, type: "sparepart" };
      if (dataSource === "../server.json")
        return { data: serverData, type: "server" };
      return { data: produkData, type: "produk" };
    };

    const { data, type } = getData();
    dataSourceType = type;

    // Cari produk berdasarkan id
    found = data.find((p) => String(p.id) === id);

    if (found) {
      setProduct({ ...found, dataSource: dataSourceType, category });
    } else {
      setProduct(null);
    }
  }, [id, category, dataSource]);

  if (!product) {
    return (
      <div className="details-page">
        <Helmet>
          <title>Produk Tidak Ditemukan | Infoduta Computindo Perkasa</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navbar />
        <div className="details-not-found">
          <h2>Produk tidak ditemukan</h2>
          <button onClick={() => navigate(-1)}>Kembali</button>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate SEO-friendly metadata (setelah product sudah pasti ada)
  const productTitle = `${product.name} - ${product.brand} | Infoduta Computindo Perkasa`;
  const productDescription =
    product.description ||
    product.deskripsi ||
    `${product.name} dari ${product.brand}. Hubungi kami untuk informasi lebih lanjut tentang spesifikasi dan harga.`;
  const categoryLabel =
    category === "computer"
      ? "Computer"
      : category === "software"
        ? "Software"
        : category === "hardware"
          ? "Hardware"
          : category === "sparepart"
            ? "Sparepart"
            : category === "server"
              ? "Server"
              : category === "laptop"
                ? "Laptop"
                : category === "smartphone"
                  ? "Smartphone"
                  : category.charAt(0).toUpperCase() + category.slice(1);

  // Generate keywords untuk SEO
  const keywords = [
    product.name,
    product.brand,
    categoryLabel,
    "Infoduta Computindo Perkasa",
    "Jakarta",
    "Indonesia",
    "IT Solutions",
  ].join(", ");

  // Structured Data: Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: `${window.location.origin}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produk",
        item: `${window.location.origin}/produk`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `${window.location.origin}/produk/${category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.brand,
        item: `${window.location.origin}/produk/${category}?brand=${product.brand}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: product.name,
        item: window.location.href,
      },
    ],
  };

  // Structured Data: Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    description: productDescription,
    category: categoryLabel,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IDR",
      seller: {
        "@type": "Organization",
        name: "Infoduta Computindo Perkasa",
      },
    },
  };

  // Get images array berdasarkan kategori
  const getImagePaths = () => {
    if (product.dataSource === "software") {
      const img = softwareImageMap[product.name];
      return img ? [img] : [];
    } else if (product.dataSource === "hardware") {
      return product.images ? [product.images] : [];
    } else if (product.dataSource === "sparepart") {
      return product.images || [];
    } else if (product.dataSource === "server") {
      return product.gambar ? [product.gambar] : [];
    } else {
      return product.images || [];
    }
  };

  const imagePaths = getImagePaths();

  // Get resolved image source
  const getResolvedImageSrc = (imgPath, index) => {
    if (imgError[index]) return "/api/placeholder/400/300";

    if (product.dataSource === "software") {
      return imgPath || "/api/placeholder/400/300";
    }

    if (product.dataSource === "hardware") {
      const normalizedPath = imgPath
        .replace(/^\/src\/assets\//, "")
        .replace(/\\/g, "/");
      return imageMap[normalizedPath] || "/api/placeholder/400/300";
    }

    if (product.dataSource === "sparepart") {
      const normalizedPath = imgPath
        .replace(/^\/assets\//, "")
        .replace(/\\/g, "/");
      return imageMap[normalizedPath] || "/api/placeholder/400/300";
    }

    if (product.dataSource === "server") {
      const normalizedPath = imgPath
        .replace(/^assets\//, "")
        .replace(/\\/g, "/");
      return imageMap[normalizedPath] || "/api/placeholder/400/300";
    }

    return imageMap[imgPath] || "/api/placeholder/400/300";
  };

  const currentImagePath = imagePaths[currentImageIndex];
  const currentImageSrc = getResolvedImageSrc(
    currentImagePath,
    currentImageIndex,
  );

  // Get first image for OG meta tags
  const firstImageSrc =
    imagePaths.length > 0
      ? getResolvedImageSrc(imagePaths[0], 0)
      : "/api/placeholder/400/300";

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

  // Breadcrumb component
  const getBreadcrumb = () => {
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
          onClick={() => navigate(`/produk/${category}`)}
          className="details-breadcrumb-link"
        >
          {categoryLabel}
        </span>
        <span className="details-breadcrumb-separator">/</span>
        <span className="details-breadcrumb-link">{product.brand}</span>
        <span className="details-breadcrumb-separator">/</span>
        <span className="details-breadcrumb-current">{product.name}</span>
      </div>
    );
  };

  // Render thumbnails
  const renderThumbnails = () => {
    if (imagePaths.length <= 1) return null;

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
            const thumbSrc = getResolvedImageSrc(imgPath, actualIndex);

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

  // Get product type label
  const getProductType = () => {
    if (product.dataSource === "server") return "Server";
    if (product.dataSource === "hardware") return product.type || "Hardware";
    if (product.dataSource === "software") return "Software";
    if (product.dataSource === "sparepart") return product.jenis || "Sparepart";
    return product.jenis || product.type || "Product";
  };

  return (
    <div className="details-page">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{productTitle}</title>
        <meta name="title" content={productTitle} />
        <meta name="description" content={productDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Infoduta Computindo Perkasa" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={productTitle} />
        <meta property="og:description" content={productDescription} />
        <meta property="og:image" content={firstImageSrc} />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={productTitle} />
        <meta property="twitter:description" content={productDescription} />
        <meta property="twitter:image" content={firstImageSrc} />

        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />

        {/* Structured Data - Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        {/* Structured Data - Product */}
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

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

          {renderThumbnails()}
        </div>

        {/* Right - Product Info */}
        <div className="details-info-section">
          <h1>{product.name}</h1>
          <div className="details-meta">
            <span className="details-brand-tag">{product.brand}</span>
            <span className="details-type-tag">{getProductType()}</span>
          </div>

          <div className="details-description">
            <h3>Deskripsi:</h3>
            <p>
              {product.description ||
                product.deskripsi ||
                "Deskripsi produk tidak tersedia."}
            </p>
          </div>

          {/* Software usage info */}
          {product.dataSource === "software" && product.usage && (
            <div className="details-usage-info">
              <h3>Durasi:</h3>
              <p>{product.usage}</p>
            </div>
          )}

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
              {/* Server Specs - Complete Details */}
              {product.dataSource === "server" && (
                <>
                  {product.processor && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Cpu size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Processor</strong>
                        <span>{product.processor}</span>
                      </div>
                    </div>
                  )}
                  {product.mainboard && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Monitor size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Mainboard</strong>
                        <span>{product.mainboard}</span>
                      </div>
                    </div>
                  )}
                  {product.memory && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <MemoryStick size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Memory</strong>
                        <span>{product.memory}</span>
                      </div>
                    </div>
                  )}
                  {product.storage && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <HardDrive size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Storage</strong>
                        <span>{product.storage}</span>
                      </div>
                    </div>
                  )}
                  {product.raid && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Shield size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>RAID Support</strong>
                        <span>{product.raid}</span>
                      </div>
                    </div>
                  )}
                  {product.psu && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Package size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Power Supply</strong>
                        <span>{product.psu}</span>
                      </div>
                    </div>
                  )}
                  {product.tpm && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Shield size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>TPM</strong>
                        <span>{product.tpm}</span>
                      </div>
                    </div>
                  )}
                  {product.idrac && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Monitor size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>iDRAC / Remote Management</strong>
                        <span>{product.idrac}</span>
                      </div>
                    </div>
                  )}
                  {product.network && product.network.length > 0 && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <AppWindow size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Network</strong>
                        <span>
                          {Array.isArray(product.network)
                            ? product.network.join(", ")
                            : product.network}
                        </span>
                      </div>
                    </div>
                  )}
                  {product.nic && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <AppWindow size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>NIC</strong>
                        <span>{product.nic}</span>
                      </div>
                    </div>
                  )}
                  {product.riser && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Package size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Riser / Expansion Slot</strong>
                        <span>{product.riser}</span>
                      </div>
                    </div>
                  )}
                  {product.chassis && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Package size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Chassis</strong>
                        <span>{product.chassis}</span>
                      </div>
                    </div>
                  )}
                  {product.accessories && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Package size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Accessories</strong>
                        <span>{product.accessories}</span>
                      </div>
                    </div>
                  )}
                  {product.os && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <AppWindow size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Operating System</strong>
                        <span>{product.os}</span>
                      </div>
                    </div>
                  )}
                  {product.warranty && (
                    <div className="details-spec-row">
                      <div className="details-spec-icon">
                        <Shield size={24} />
                      </div>
                      <div className="details-spec-info">
                        <strong>Warranty</strong>
                        <span>{product.warranty}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Laptop/PC/Smartphone Specs */}
              {product.dataSource === "produk" && product.specs && (
                <>
                  {product.specs.cpu && (
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
                  {product.specs.ram && (
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
                  {product.specs.storage && (
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
                  {product.specs.gpu && (
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
                  {product.specs.os && (
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
                </>
              )}

              {/* Hardware/Software/Sparepart - show description */}
              {["hardware", "software", "sparepart"].includes(
                product.dataSource,
              ) && (
                <div className="details-spec-description">
                  <p>
                    {product.description ||
                      product.deskripsi ||
                      "Spesifikasi detail tidak tersedia untuk produk ini."}
                  </p>
                </div>
              )}

              {/* No specs available */}
              {product.dataSource === "produk" &&
                (!product.specs || Object.keys(product.specs).length === 0) && (
                  <div className="details-spec-description">
                    <p>Spesifikasi detail tidak tersedia untuk produk ini.</p>
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
              <div className="details-service-card">
                <Service size={32} />
                <h3>Instalasi & Setup</h3>
                <p>
                  Tim teknisi kami siap membantu instalasi dan setup awal
                  perangkat di lokasi Anda untuk memastikan semuanya berjalan
                  lancar.
                </p>
              </div>
              <div className="details-service-card">
                <Send size={32} />
                <h3>Pengiriman Software tercepat</h3>
                <p>
                  Untuk produk software, kami menyediakan pengiriman lisensi
                  secara digital melalui email dalam waktu 1x24 jam setelah
                  pembayaran dikonfirmasi.
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
