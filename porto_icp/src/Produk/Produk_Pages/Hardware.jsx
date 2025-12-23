import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Hardware = () => {
  const { id } = useParams();

  if (id) {
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
            href={`https://www.infoduta.com/produk/hardware/${id}`}
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
          name="description"
          content="Temukan berbagai pilihan Hardware komputer yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Hardware, Perangkat Keras, Monitor, Keyboard, Mouse, Printer, Infoduta Computindo Perkasa"
        />
        <meta
          property="og:title"
          content="Produk Hardware - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Hardware komputer yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/hardware"
        />
        <link rel="canonical" href="https://www.infoduta.com/produk/hardware" />
      </Helmet>
      // Hardware.jsx
      <SubProduk
        jenisBarang="hardware"
        title="Hardware"
        description="Perangkat keras berkualitas"
        dataSource="../hardware.json"
      />
    </>
  );
};

export default Hardware;
