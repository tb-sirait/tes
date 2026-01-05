import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Hardware = () => {
  const { brand, id } = useParams();

  if (brand && id) {
    return (
      <>
        <Helmet>
          <title>Detail Hardware | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail produk hardware untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/hardware/${brand}/${id}`}
          />
        </Helmet>
        <DetailProduk dataSource="../hardware.json" />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Hardware | Infoduta Computindo Perkasa</title>
        <meta
          name="title"
          content="Produk Hardware | Infoduta Computindo Perkasa"
        />
        <meta
          name="description"
          content="Temukan berbagai pilihan Hardware dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Hardware, Perangkat Keras, Printer, Scanner, Networking, Infoduta Computindo Perkasa"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Produk Hardware - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Hardware dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/hardware"
        />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.infoduta.com/produk/hardware" />
      </Helmet>

      <SubProduk
        jenisBarang="hardware"
        title="Hardware"
        description="Temukan berbagai pilihan Hardware dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../hardware.json"
      />
    </>
  );
};

export default Hardware;
