import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Software = () => {
  const { brand, id } = useParams();

  if (brand && id) {
    return (
      <>
        <Helmet>
          <title>Detail Software | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail produk software untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/software/${brand}/${id}`}
          />
        </Helmet>
        <DetailProduk dataSource="../software.json" />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Software | Infoduta Computindo Perkasa</title>
        <meta
          name="title"
          content="Produk Software | Infoduta Computindo Perkasa"
        />
        <meta
          name="description"
          content="Temukan berbagai pilihan Software dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Software, Microsoft Office, Windows, Adobe, Infoduta Computindo Perkasa"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Produk Software - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Software dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/software"
        />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.infoduta.com/produk/software" />
      </Helmet>

      <SubProduk
        jenisBarang="software"
        title="Software"
        description="Temukan berbagai pilihan Software dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../software.json"
      />
    </>
  );
};

export default Software;
