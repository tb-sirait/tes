import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import produkData from "../produk.json";

// ─── SEO constants ────────────────────────────────────────────────────────────
const BASE_URL = "https://www.infoduta.com";
const SITE_NAME = "Infoduta Computindo Perkasa";

const COMPUTER_SEO = {
  title: `Produk Computer & PC Terbaik untuk Bisnis | ${SITE_NAME}`,
  description:
    "Temukan berbagai pilihan PC dan Desktop terbaik — komputer bisnis, workstation, all-in-one — dengan harga kompetitif. Cocok untuk kebutuhan perusahaan maupun personal. Cek katalog lengkap kami.",
  keywords:
    "computer bisnis, PC desktop, komputer kantor, workstation, all-in-one PC, beli komputer jakarta, Infoduta Computindo Perkasa, PC HP, PC Dell, PC Lenovo, desktop Apple iMac",
  canonicalUrl: `${BASE_URL}/produk/computer`,
  ogImage: `${BASE_URL}/og/computer-catalog.jpg`,
};

// ─── Helper: konversi path gambar lokal → URL publik ─────────────────────────
const toPublicImageUrl = (imagePath) => {
  if (!imagePath) return null;
  const cleaned = imagePath.replace(/^\/src\//, "/");
  return `${BASE_URL}${cleaned}`;
};

// ─── Helper: buat brand slug untuk URL ───────────────────────────────────────
const toBrandSlug = (brand) => brand.replace(/\s+/g, "-");

// ─── Helper: serialize JSON-LD ────────────────────────────────────────────────
const toJsonLd = (obj) => JSON.stringify(obj);

// ─── Filter hanya produk PC dari produk.json ──────────────────────────────────
const computerData = produkData.filter((p) => p.jenis?.toLowerCase() === "pc");

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
      name: "Computer",
      item: COMPUTER_SEO.canonicalUrl,
    },
  ],
};

// ─── JSON-LD: ItemList katalog — hanya ListItem + URL, tanpa offers/harga ─────
// Google akan crawl tiap URL ini secara individual untuk ambil data Product
// dari halaman detail masing-masing. Ini cara paling aman dan bebas error GSC.
const computerCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Katalog Computer & PC — Infoduta Computindo Perkasa",
  description: COMPUTER_SEO.description,
  url: COMPUTER_SEO.canonicalUrl,
  numberOfItems: computerData.length,
  itemListElement: computerData.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `${BASE_URL}/produk/computer/${toBrandSlug(product.brand)}/${product.id}`,
  })),
};

// ─── JSON-LD: WebPage katalog ─────────────────────────────────────────────────
const catalogWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: COMPUTER_SEO.title,
  description: COMPUTER_SEO.description,
  url: COMPUTER_SEO.canonicalUrl,
  inLanguage: "id-ID",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  },
  breadcrumb: catalogBreadcrumbJsonLd,
};

// ─── Helmet: halaman katalog ──────────────────────────────────────────────────
const ComputerCatalogHelmet = () => (
  <Helmet>
    <html lang="id" />
    <title>{COMPUTER_SEO.title}</title>
    <meta name="description" content={COMPUTER_SEO.description} />
    <meta name="keywords" content={COMPUTER_SEO.keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={COMPUTER_SEO.canonicalUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={COMPUTER_SEO.title} />
    <meta property="og:description" content={COMPUTER_SEO.description} />
    <meta property="og:url" content={COMPUTER_SEO.canonicalUrl} />
    <meta property="og:image" content={COMPUTER_SEO.ogImage} />
    <meta property="og:locale" content="id_ID" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={COMPUTER_SEO.title} />
    <meta name="twitter:description" content={COMPUTER_SEO.description} />
    <meta name="twitter:image" content={COMPUTER_SEO.ogImage} />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">{toJsonLd(catalogWebPageJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(catalogBreadcrumbJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(computerCatalogJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
  </Helmet>
);

// ─── Helmet: halaman detail produk ───────────────────────────────────────────
const ComputerDetailHelmet = ({ brand, id }) => {
  const brandDecoded = decodeURIComponent(brand).replace(/-/g, " ");
  const detailUrl = `${BASE_URL}/produk/computer/${brand}/${id}`;

  // Ambil data produk dari produk.json berdasarkan id & jenis PC
  const product = produkData.find(
    (p) => String(p.id) === String(id) && p.jenis?.toLowerCase() === "pc",
  );

  const productName = product?.name || `Computer ${brandDecoded}`;
  const productDesc =
    product?.description ||
    `Spesifikasi dan detail computer ${brandDecoded} — temukan informasi lengkap produk ini di katalog Infoduta Computindo Perkasa.`;
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
        name: "Computer",
        item: COMPUTER_SEO.canonicalUrl,
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
  // Menggunakan "InquiryAction" sebagai sinyal bahwa produk tersedia
  // untuk ditanyakan/dipesan, tanpa mensyaratkan harga dari schema.org
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDesc,
    category: "PC",
    brand: { "@type": "Brand", name: brandDecoded },
    url: detailUrl,
    ...(productImage && { image: productImage }),

    // Specs sebagai additionalProperty — dipertahankan, tidak butuh harga
    ...(product?.specs && {
      additionalProperty: [
        product.specs.cpu && {
          "@type": "PropertyValue",
          name: "Processor",
          value: product.specs.cpu,
        },
        product.specs.ram && {
          "@type": "PropertyValue",
          name: "RAM",
          value: product.specs.ram,
        },
        product.specs.storage && {
          "@type": "PropertyValue",
          name: "Storage",
          value: product.specs.storage,
        },
        product.specs.gpu && {
          "@type": "PropertyValue",
          name: "GPU",
          value: product.specs.gpu,
        },
      ].filter(Boolean),
    }),

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
const Computer = () => {
  const { brand, id } = useParams();

  // ── Halaman Detail Produk ──
  if (brand && id) {
    return (
      <>
        <ComputerDetailHelmet brand={brand} id={id} />
        <DetailProduk dataSource="../produk.json" />
      </>
    );
  }

  // ── Halaman Katalog ──
  return (
    <>
      <ComputerCatalogHelmet />
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