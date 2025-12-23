import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Laptop = () => {
  const { id } = useParams();

  if (id) {
    return (
      <>
        <Helmet>
          <title>Detail Laptop | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail spesifikasi lengkap produk laptop untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/laptop/${id}`}
          />
        </Helmet>
        <DetailProduk />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Laptop | Infoduta Computindo Perkasa</title>
        <meta
          name="description"
          content="Temukan berbagai pilihan Laptop dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Laptop, Notebook, Laptop Bisnis, Laptop Gaming, Infoduta Computindo Perkasa, Solusi IT"
        />
        <meta
          property="og:title"
          content="Produk Laptop - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Laptop dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/laptop"
        />
        <link rel="canonical" href="https://www.infoduta.com/produk/laptop" />
      </Helmet>
      <SubProduk
        jenisBarang="laptop"
        title="Produk Laptop"
        description="Temukan berbagai pilihan Laptop dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
      />
    </>
  );
};

export default Laptop;
