import React from "react";
import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Sparepart = () => {
  const { brand, id } = useParams();

  if (brand && id) {
    return (
      <>
        <Helmet>
          <title>Detail Sparepart | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail produk sparepart untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/sparepart/${brand}/${id}`}
          />
        </Helmet>
        <DetailProduk dataSource="../../Produk/sparepart.json" />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Sparepart | Infoduta Computindo Perkasa</title>
        <meta
          name="title"
          content="Produk Sparepart | Infoduta Computindo Perkasa"
        />
        <meta
          name="description"
          content="Temukan berbagai pilihan Sparepart dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Sparepart, SSD, RAM, HDD, Processor, Infoduta Computindo Perkasa"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Produk Sparepart - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Sparepart dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/sparepart"
        />
        <meta property="og:site_name" content="Infoduta Computindo Perkasa" />
        <meta property="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://www.infoduta.com/produk/sparepart"
        />
      </Helmet>

      <SubProduk
        jenisBarang="sparepart"
        title="Sparepart"
        description="Temukan berbagai pilihan Sparepart dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../../Produk/sparepart.json"
      />
    </>
  );
};

export default Sparepart;
