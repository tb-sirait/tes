import React, { useState } from "react";
import { Cpu, MemoryStick, HardDrive, Monitor } from "lucide-react";

const ProductCard = ({ product, imageSrc, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const finalImgSrc = imgError ? "/api/placeholder/200/150" : imageSrc;

  return (
    <div className="sub-produk-card" onClick={onClick}>
      <div className="sub-produk-card-image">
        <img
          src={finalImgSrc}
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
        {product.specs && Object.keys(product.specs).length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default ProductCard;
