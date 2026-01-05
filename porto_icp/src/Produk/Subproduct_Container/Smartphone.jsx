import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Smartphone = () => {
  const { brand, id } = useParams();

  if (brand && id) {
    return (
      <>
        <Helmet>
          <title>Detail Smartphone | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail produk smartphone untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/smartphone/${brand}/${id}`}
          />
        </Helmet>
        <DetailProduk dataSource="../produk.json" />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Smartphone | Infoduta Computindo Perkasa</title>
        <meta
          name="title"
          content="Produk Smartphone | Infoduta Computindo Perkasa"
        />
        <meta
          name="description"
          content="Temukan berbagai pilihan Smartphone dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Smartphone, Smartphone Bisnis, Mobile Phone, Infoduta Computindo Perkasa"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Produk Smartphone - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Smartphone dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/smartphone"
        />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://www.infoduta.com/produk/smartphone"
        />
      </Helmet>

      <SubProduk
        jenisBarang="smartphone"
        title="Smartphone"
        description="Temukan berbagai pilihan Smartphone dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../produk.json"
      />
    </>
  );
};

export default Smartphone;
