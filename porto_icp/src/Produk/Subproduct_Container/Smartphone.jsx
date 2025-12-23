import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Smartphone = () => {
  const { id } = useParams();

  if (id) {
    return (
      <>
        <Helmet>
          <title>Detail Smartphone | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail spesifikasi lengkap produk smartphone untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/smartphone/${id}`}
          />
        </Helmet>
        <DetailProduk />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Smartphone | Infoduta Computindo Perkasa</title>
        <meta
          name="description"
          content="Temukan berbagai pilihan Smartphone dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Smartphone, HP, Handphone, Smartphone Bisnis, Infoduta Computindo Perkasa, Solusi IT"
        />
        <meta
          property="og:title"
          content="Produk Smartphone - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Smartphone dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/smartphone"
        />
        <link
          rel="canonical"
          href="https://www.infoduta.com/produk/smartphone"
        />
      </Helmet>
      <SubProduk
        jenisBarang="smartphone"
        title="Produk Smartphone"
        description="Temukan berbagai pilihan Smartphone dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
      />
    </>
  );
};

export default Smartphone;
