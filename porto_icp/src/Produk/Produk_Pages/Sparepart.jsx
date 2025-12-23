import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Sparepart = () => {
  const { id } = useParams();

  if (id) {
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
            href={`https://www.infoduta.com/produk/sparepart/${id}`}
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
          name="description"
          content="Temukan berbagai pilihan Sparepart komputer yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Sparepart, Suku Cadang, Komponen Komputer, RAM, SSD, HDD, Infoduta Computindo Perkasa"
        />
        <meta
          property="og:title"
          content="Produk Sparepart - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Sparepart komputer yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/sparepart"
        />
        <link
          rel="canonical"
          href="https://www.infoduta.com/produk/sparepart"
        />
      </Helmet>
      // Sparepart.jsx
      <SubProduk
        jenisBarang="sparepart"
        title="Sparepart"
        description="Sparepart komputer dan aksesoris"
        dataSource="../../Produk/sparepart.json"
      />
    </>
  );
};

export default Sparepart;
