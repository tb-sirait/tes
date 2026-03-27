import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import sparepartData from "../../Produk/sparepart.json";

// ─── SEO constants ────────────────────────────────────────────────────────────
const BASE_URL = "https://www.infoduta.com";
const SITE_NAME = "Infoduta Computindo Perkasa";

const SPAREPART_SEO = {
  title: `Produk Sparepart Komputer Terbaik & Terlengkap | ${SITE_NAME}`,
  description:
    "Temukan berbagai pilihan Sparepart komputer terbaik — SSD, RAM, HDD, processor, VGA, motherboard, dan lainnya — dengan kualitas terjamin dan harga kompetitif. Cocok untuk upgrade maupun perbaikan perangkat. Cek katalog lengkap kami.",
  keywords:
    "sparepart komputer, SSD murah, RAM laptop, HDD eksternal, processor Intel, processor AMD, VGA card, motherboard, sparepart PC, upgrade komputer jakarta, Infoduta Computindo Perkasa, Kingston, Samsung SSD, Corsair RAM",
  canonicalUrl: `${BASE_URL}/produk/sparepart`,
  ogImage: `${BASE_URL}/og/sparepart-catalog.jpg`,
};

// ─── Helper: konversi path gambar lokal → URL publik ─────────────────────────
// sparepart.json memakai field "images" berupa array
// contoh: "/assets/produk/sparepart/ssd/1.png" → "https://www.infoduta.com/assets/produk/sparepart/ssd/1.png"
const toPublicImageUrl = (imagePath) => {
  if (!imagePath) return null;
  const cleaned = imagePath.replace(/^\/src\//, "/").replace(/^(?!\/)/, "/");
  return `${BASE_URL}${cleaned}`;
};

// ─── Helper: buat brand slug untuk URL ───────────────────────────────────────
const toBrandSlug = (brand) => brand.replace(/\s+/g, "-");

// ─── Helper: serialize JSON-LD ────────────────────────────────────────────────
const toJsonLd = (obj) => JSON.stringify(obj);

// ─── JSON-LD: Organization (dipakai di katalog & detail) ─────────────────────
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Indonesian",
  },
};

// ─── JSON-LD: BreadcrumbList (katalog) ───────────────────────────────────────
const catalogBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Beranda",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Produk",
      item: `${BASE_URL}/produk`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Sparepart",
      item: SPAREPART_SEO.canonicalUrl,
    },
  ],
};

// ─── JSON-LD: ItemList katalog — hanya ListItem + URL, tanpa offers/harga ─────
// Google akan crawl tiap URL ini secara individual untuk ambil data Product
// dari halaman detail masing-masing. Ini cara paling aman dan bebas error GSC.
const sparepartCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Katalog Sparepart Komputer — Infoduta Computindo Perkasa",
  description: SPAREPART_SEO.description,
  url: SPAREPART_SEO.canonicalUrl,
  numberOfItems: sparepartData.length,
  itemListElement: sparepartData.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `${BASE_URL}/produk/sparepart/${toBrandSlug(product.brand)}/${product.id}`,
  })),
};

// ─── JSON-LD: WebPage katalog ─────────────────────────────────────────────────
const catalogWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: SPAREPART_SEO.title,
  description: SPAREPART_SEO.description,
  url: SPAREPART_SEO.canonicalUrl,
  inLanguage: "id-ID",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  },
  breadcrumb: catalogBreadcrumbJsonLd,
};

// ─── Helmet: halaman katalog ──────────────────────────────────────────────────
const SparepartCatalogHelmet = () => (
  <Helmet>
    <html lang="id" />
    <title>{SPAREPART_SEO.title}</title>
    <meta name="description" content={SPAREPART_SEO.description} />
    <meta name="keywords" content={SPAREPART_SEO.keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={SPAREPART_SEO.canonicalUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={SPAREPART_SEO.title} />
    <meta property="og:description" content={SPAREPART_SEO.description} />
    <meta property="og:url" content={SPAREPART_SEO.canonicalUrl} />
    <meta property="og:image" content={SPAREPART_SEO.ogImage} />
    <meta property="og:locale" content="id_ID" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SPAREPART_SEO.title} />
    <meta name="twitter:description" content={SPAREPART_SEO.description} />
    <meta name="twitter:image" content={SPAREPART_SEO.ogImage} />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">{toJsonLd(catalogWebPageJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(catalogBreadcrumbJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(sparepartCatalogJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
  </Helmet>
);

// ─── Helmet: halaman detail produk ───────────────────────────────────────────
const SparepartDetailHelmet = ({ brand, id }) => {
  const brandDecoded = decodeURIComponent(brand).replace(/-/g, " ");
  const detailUrl = `${BASE_URL}/produk/sparepart/${brand}/${id}`;

  // Ambil data produk dari sparepart.json berdasarkan id
  const product = sparepartData.find((p) => String(p.id) === String(id));

  const productName = product?.name || `Sparepart ${brandDecoded}`;
  const productDesc =
    product?.description ||
    `Spesifikasi dan detail sparepart ${brandDecoded} — temukan informasi lengkap produk ini di katalog Infoduta Computindo Perkasa.`;
  const productCategory = product?.jenis || "Sparepart";
  const productImage = product?.images?.[0]
    ? toPublicImageUrl(product.images[0])
    : null;

  const detailTitle = `${productName} | ${SITE_NAME}`;

  // ── Breadcrumb detail ───────────────────────────────────────────────────────
  const detailBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produk",
        item: `${BASE_URL}/produk`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Sparepart",
        item: SPAREPART_SEO.canonicalUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: productName,
        item: detailUrl,
      },
    ],
  };

  // ── Product JSON-LD — tanpa offers/harga, ganti potentialAction ─────────────
  // Field "jenis" dari sparepart.json (SSD, RAM, HDD, dll) dipakai sebagai
  // category — memberi konteks kategori yang spesifik ke Google tanpa harga
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDesc,
    category: productCategory,
    brand: { "@type": "Brand", name: brandDecoded },
    url: detailUrl,
    ...(productImage && { image: productImage }),

    // potentialAction menggantikan offers — tidak butuh harga,
    // tapi tetap memberi sinyal ke Google bahwa produk bisa dihubungi/dipesan
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Hubungi untuk Informasi Harga",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/kontak?produk=${encodeURIComponent(productName)}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  return (
    <Helmet>
      <html lang="id" />
      <title>{detailTitle}</title>
      <meta name="description" content={productDesc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={detailUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={detailTitle} />
      <meta property="og:description" content={productDesc} />
      <meta property="og:url" content={detailUrl} />
      <meta property="og:locale" content="id_ID" />
      {productImage && <meta property="og:image" content={productImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={detailTitle} />
      <meta name="twitter:description" content={productDesc} />
      {productImage && <meta name="twitter:image" content={productImage} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{toJsonLd(productJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(detailBreadcrumbJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
    </Helmet>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Sparepart = () => {
  const { brand, id } = useParams();

  // ── Halaman Detail Produk ──
  if (brand && id) {
    return (
      <>
        <SparepartDetailHelmet brand={brand} id={id} />
        <DetailProduk dataSource="../../Produk/sparepart.json" />
      </>
    );
  }

  // ── Halaman Katalog ──
  return (
    <>
      <SparepartCatalogHelmet />
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