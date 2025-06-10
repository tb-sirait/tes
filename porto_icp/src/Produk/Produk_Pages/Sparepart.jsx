import React, { useState, useEffect } from "react";
import produkData from "../../Produk/sparepart.json";
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

// Import images explicitly
import nvidia1 from "../../assets/produk/sparepart/nvidia/1.png";
import nvidia3 from "../../assets/produk/sparepart/nvidia/3.png";
import nvidia2 from "../../assets/produk/sparepart/nvidia/2.png";
import supermicro1 from "../../assets/produk/sparepart/supermicro/1.png";
import supermicro2 from "../../assets/produk/sparepart/supermicro/2.png";
import hynix1 from "../../assets/produk/sparepart/hynix/1.png";
import supermicro3 from "../../assets/produk/sparepart/supermicro/3.png";
import supermicro4 from "../../assets/produk/sparepart/supermicro/4.png";
import gigabyte1 from "../../assets/produk/sparepart/gigabyte/1.png";
import intelI5 from "../../assets/produk/sparepart/intel/i5.png";
import vgen1 from "../../assets/produk/sparepart/vgen/1.png";
import orbit1 from "../../assets/produk/sparepart/Orbit/1.png";
import samsung1 from "../../assets/produk/sparepart/samsung/1.png";
import ugreen1 from "../../assets/produk/sparepart/ugreen/1.png";
import belden1 from "../../assets/produk/sparepart/belden/1.png";
import mikrotik1 from "../../assets/produk/sparepart/mikrotik/1.png";
import dlink1 from "../../assets/produk/sparepart/Dlink/1.png";
import ruijie1 from "../../assets/produk/sparepart/ruijie/1.png";
import sandisk1 from "../../assets/produk/sparepart/sandisk/1.png";
import vention1 from "../../assets/produk/sparepart/vention/1.png";

const imageMap = {
  "Nvidia A100 80GB PCIE": nvidia1,
  "Nvidia Tesla V100 32GB PCIe 3.0 GPU": nvidia3,
  "NVIDIA L40S Passive PCIE 48GB": nvidia2,
  "BACKPLANE DAUGHTER CARD BPN-SAS3-216EL (Brand Supermicro)": supermicro1,
  "POWER SUPPLY PWS-920P-SQ": supermicro2,
  "MEMORY 8GB 2RX8 PC3L 12800R": hynix1,
  "SUPERMICRO SAS2-216EL SAS DAUGHTER CARD 2PORT EXPANDER FOR SAS2-216EB BACKPLANE": supermicro3,
  "SUPERMICRO X9DRi-LN4F+REV 1.20A System board": supermicro4,
  "Motherboard Gigabyte H610MK DDR4 Socket LGA 1700": gigabyte1,
  "Processor Intel Core i5-12400 LGA 1700": intelI5,
  "Memory RAM V-GEN Longdimm Platinum 8GB DDR4 2666Mhz (PC-21300)": vgen1,
  "Modem orbit Telkomsel Orbit 5G Z1 Modem WiFi 5G": orbit1,
  "Samsung SSD NVME PM9A1 512GB": samsung1,
  "UGREEN Kabel HDMI To VGA Converter": ugreen1,
  "CABLE UTP 1000FT/ROLL CAT5E BELDEN 1583A": belden1,
  "Mikrotik RB750GR3": mikrotik1,
  "Dlink DGS 1016D/C": dlink1,
  "Ruijie RG-EW1200G PRO": ruijie1,
  "USB Flash Drives SDCZ50-032G-B35 SanDisk Cruzer Blade USB Flash Drive 32GB 2.0": sandisk1,
  "USB Flash Drives SDCZ50-064G-B35 SanDisk Cruzer Blade USB Flash Drive 64GB 2.0": sandisk1,
  "Kabel HDMI Vention B02 5m High Speed 4K FHD 1080p 3D HDR - B02  (HDMI Male to Male Cable)": vention1,
};

const ProductCard = ({ product, onViewDetails }) => {
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
          <span className="type">{product.jenis}</span>
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const imgSrc = imageMap[product.name] || "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img src={imgSrc} alt={product.name} />
          </div>
          <div className="modal-details">
            <h2>{product.name}</h2>
            <div className="meta">
              <span className="brand-tag">{product.brand}</span>
              <span> | </span>
              <span className="type-tag">{product.jenis}</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="modal-actions">
              <div className="contact-options">
                <a className="contact-button"
                href={`https://wa.me/628975808407?text=${encodeURIComponent(`Saya berminat pada unit produk ${product.name} untuk perusahaan saya. Bisa diskusi untuk produknya?`)}`} target="_blank" rel="noopener noreferrer"><MessageCircle /> Hubungi Kami</a>
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
        <h1>Sparepart</h1>
        <p>
          Temukan berbagai pilihan Sparepart yang sesuai dengan kebutuhan perusahaan Anda.
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

const Sparepart = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const sparepartProducts = produkData
      .sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sparepartProducts);
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
        brandOptions={[...new Set(products.map(p => p.brand))]}/>

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

export default Sparepart;
