import React, { useState } from "react";
import { Cpu, MemoryStick, HardDrive, Monitor } from "lucide-react";

const ProductCard = ({ product, imageMap, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const firstImagePath =
    product.images && product.images.length > 0 ? product.images[0] : null;
  const imgSrc = imgError
    ? "/api/placeholder/200/150"
    : (firstImagePath && imageMap[firstImagePath]) ||
      "/api/placeholder/200/150";

  return (
    <div className="sub-produk-card" onClick={onClick}>
      <div className="sub-produk-card-image">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgError(true)}
        />
      </div>
      <div className="sub-produk-card-info">
        <h3>{product.name}</h3>
        <div className="sub-produk-card-meta">
          <span className="sub-produk-brand">{product.brand}</span>
          <span className="sub-produk-type">{product.jenis}</span>
        </div>
        <div className="sub-produk-specs">
          {product.specs?.cpu && (
            <div className="sub-produk-spec-item">
              <Cpu size={16} />
              <span>{product.specs.cpu}</span>
            </div>
          )}
          {product.specs?.ram && (
            <div className="sub-produk-spec-item">
              <MemoryStick size={16} />
              <span>{product.specs.ram}</span>
            </div>
          )}
          {product.specs?.storage && (
            <div className="sub-produk-spec-item">
              <HardDrive size={16} />
              <span>{product.specs.storage}</span>
            </div>
          )}
          {product.specs?.gpu && (
            <div className="sub-produk-spec-item">
              <Monitor size={16} />
              <span>{product.specs.gpu}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
