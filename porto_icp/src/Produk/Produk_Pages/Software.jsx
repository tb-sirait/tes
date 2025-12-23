import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Software = () => {
  const { id } = useParams();

  if (id) {
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
            href={`https://www.infoduta.com/produk/software/${id}`}
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
          name="description"
          content="Temukan berbagai pilihan Software yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Software, Lisensi Software, Aplikasi, Program, Windows, Office, Infoduta Computindo Perkasa"
        />
        <meta
          property="og:title"
          content="Produk Software - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Software yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/software"
        />
        <link rel="canonical" href="https://www.infoduta.com/produk/software" />
      </Helmet>
      // Software.jsx
      <SubProduk
        jenisBarang="software"
        title="Software"
        description="Lisensi software original"
        dataSource="../software.json"
      />
    </>
  );
};

export default Software;
