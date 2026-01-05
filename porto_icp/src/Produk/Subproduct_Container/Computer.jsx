import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Computer = () => {
  const { brand, id } = useParams();

  if (brand && id) {
    return (
      <>
        <Helmet>
          <title>Detail Computer | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail produk computer untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/computer/${brand}/${id}`}
          />
        </Helmet>
        <DetailProduk dataSource="../produk.json" />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Computer | Infoduta Computindo Perkasa</title>
        <meta
          name="title"
          content="Produk Computer | Infoduta Computindo Perkasa"
        />
        <meta
          name="description"
          content="Temukan berbagai pilihan Computer dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Computer, PC Bisnis, Desktop, Infoduta Computindo Perkasa"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Produk Computer - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Computer dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/computer"
        />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.infoduta.com/produk/computer" />
      </Helmet>

      <SubProduk
        jenisBarang="PC"
        title="Computer"
        description="Temukan berbagai pilihan Computer dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../produk.json"
      />
    </>
  );
};

export default Computer;
