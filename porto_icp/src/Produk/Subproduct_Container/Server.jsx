import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Server = () => {
  const { id } = useParams();

  if (id) {
    return (
      <>
        <Helmet>
          <title>Detail Server | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail produk server untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/server/${id}`}
          />
        </Helmet>
        <DetailProduk dataSource="../server.json" />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Server | Infoduta Computindo Perkasa</title>
        <meta
          name="title"
          content="Produk Server | Infoduta Computindo Perkasa"
        />
        <meta
          name="description"
          content="Temukan berbagai pilihan Server dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Server, Dell Server, HP Server, Lenovo Server, Infoduta Computindo Perkasa"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Produk Server - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Server dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/server"
        />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.infoduta.com/produk/server" />
      </Helmet>

      <SubProduk
        jenisBarang="server"
        title="Server"
        description="Temukan berbagai pilihan Server dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../server.json"
      />
    </>
  );
};

export default Server;
