import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Laptop = () => {
  const { brand, id } = useParams();

  if (brand && id) {
    return (
      <>
        <Helmet>
          <title>Detail Laptop | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail produk laptop untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/laptop/${brand}/${id}`}
          />
        </Helmet>
        <DetailProduk dataSource="../produk.json" />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Laptop | Infoduta Computindo Perkasa</title>
        <meta
          name="title"
          content="Produk Laptop | Infoduta Computindo Perkasa"
        />
        <meta
          name="description"
          content="Temukan berbagai pilihan Laptop dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Laptop, Laptop Bisnis, Laptop Gaming, Infoduta Computindo Perkasa"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Produk Laptop - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Laptop dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/laptop"
        />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.infoduta.com/produk/laptop" />
      </Helmet>

      <SubProduk
        jenisBarang="laptop"
        title="Laptop"
        description="Temukan berbagai pilihan Laptop dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../produk.json"
      />
    </>
  );
};

export default Laptop;
