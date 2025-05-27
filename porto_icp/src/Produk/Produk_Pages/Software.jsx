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

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-info">
        <h3>{product.name}</h3>
        {product.usage && <p style={{color:"#000000"}}>Usage: {product.usage}</p>}
      </div>
    </div>
  );
};

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-body">
          <div className="modal-details">
            <h2>{product.name}</h2>
            {product.usage && <p>Usage: {product.usage}</p>}
            <div className="modal-actions">
              <button className="contact-button"><MessageCircle /> Hubungi Kami</button>
            </div>
            <div className="extra-info">
              <p><strong>✨ Penawaran spesial:</strong> Gratis konsultasi dan bantuan instalansi produk.</p>
              <p><strong>🚚 Pesan Antar:</strong> Tersedia antar barang untuk Jakarta dan Sekitarnya</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Software = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const sortedProducts = softwareData.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sortedProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    return !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="laptop-page">
      <Navbar />

      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search software..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

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