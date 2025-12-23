import { useParams } from "react-router-dom";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import { Helmet } from "react-helmet";

const Computer = () => {
  const { id } = useParams();
  

  // If there's an ID in the URL, show DetailProduk
  // Otherwise, show SubProduk list
  if (id) {
    return (
      <>
        <Helmet>
          <title>Detail Komputer | Infoduta Computindo Perkasa</title>
          <meta
            name="description"
            content="Detail spesifikasi lengkap produk komputer untuk kebutuhan bisnis Anda."
          />
          <link
            rel="canonical"
            href={`https://www.infoduta.com/produk/computer/${id}`}
          />
        </Helmet>
        <DetailProduk />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produk Komputer | Infoduta Computindo Perkasa</title>
        <meta
          name="description"
          content="Temukan berbagai pilihan Komputer dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          name="keywords"
          content="Produk Komputer, PC, Desktop, Workstation, Infoduta Computindo Perkasa, Solusi IT, Perangkat Keras, Hardware, Komputer Bisnis"
        />
        <meta
          property="og:title"
          content="Produk Komputer - Infoduta Computindo Perkasa"
        />
        <meta
          property="og:description"
          content="Temukan berbagai pilihan Komputer dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        />
        <meta
          property="og:url"
          content="https://www.infoduta.com/produk/computer"
        />
        <link rel="canonical" href="https://www.infoduta.com/produk/computer" />
      </Helmet>
      <SubProduk
        jenisBarang="PC"
        title="Produk Komputer"
        description="Temukan berbagai pilihan Komputer dengan spesifikasi terbaik yang sesuai dengan kebutuhan perusahaan Anda."
      />
    </>
  );
};

export default Computer;
