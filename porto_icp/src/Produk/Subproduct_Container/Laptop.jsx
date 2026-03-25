import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";

// ─── SEO constants ───────────────────────────────────────────────────────────
const BASE_URL = "https://www.infoduta.com";
const SITE_NAME = "Infoduta Computindo Perkasa";

const LAPTOP_SEO = {
  title: `Produk Laptop Terbaik untuk Bisnis & Workstation | ${SITE_NAME}`,
  description:
    "Temukan berbagai pilihan Laptop terbaik — laptop bisnis, Workstation, ultrabook — dengan harga kompetitif. Cocok untuk kebutuhan perusahaan maupun personal. Cek katalog lengkap kami.",
  keywords:
    "laptop terbaik, laptop bisnis, laptop workstation, ultrabook, laptop murah berkualitas, beli laptop jakarta, Infoduta Computindo Perkasa, laptop HP, laptop Dell, laptop Lenovo, laptop Apple MacBook",
  canonicalUrl: `${BASE_URL}/produk/laptop`,
  ogImage: `${BASE_URL}/og/laptop-catalog.jpg`, // ganti dengan path OG image Anda
};

// ─── JSON-LD: BreadcrumbList ──────────────────────────────────────────────────
const breadcrumbJsonLd = {
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
      name: "Laptop",
      item: LAPTOP_SEO.canonicalUrl,
    },
  ],
};

// ─── JSON-LD: ItemList (katalog laptop) ───────────────────────────────────────
// Isi array ini dengan data statis ringkas dari produk.json Anda.
// Ini membantu Google langsung memahami isi halaman tanpa menjalankan JS.
const laptopCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Katalog Laptop — Infoduta Computindo Perkasa",
  description: LAPTOP_SEO.description,
  url: LAPTOP_SEO.canonicalUrl,
  // Tambahkan item produk di sini sesuai data Anda, contoh:
  // itemListElement: [
  //   {
  //     "@type": "ListItem",
  //     position: 1,
  //     item: {
  //       "@type": "Product",
  //       name: "ASUS VivoBook 14",
  //       brand: { "@type": "Brand", name: "ASUS" },
  //       url: `${BASE_URL}/produk/laptop/ASUS/001`,
  //       image: `${BASE_URL}/assets/produk/laptop/asus-vivobook.jpg`,
  //       description: "Laptop ringan untuk produktivitas sehari-hari",
  //     },
  //   },
  // ],
};

// ─── JSON-LD: Organization ────────────────────────────────────────────────────
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

// ─── JSON-LD: WebPage ─────────────────────────────────────────────────────────
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: LAPTOP_SEO.title,
  description: LAPTOP_SEO.description,
  url: LAPTOP_SEO.canonicalUrl,
  inLanguage: "id-ID",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  },
  breadcrumb: breadcrumbJsonLd,
};

// ─── Helper: serialize JSON-LD ────────────────────────────────────────────────
const toJsonLd = (obj) => JSON.stringify(obj);

// ─── Helmet untuk halaman katalog ─────────────────────────────────────────────
const LaptopCatalogHelmet = () => (
  <Helmet>
    {/* Primary */}
    <html lang="id" />
    <title>{LAPTOP_SEO.title}</title>
    <meta name="description" content={LAPTOP_SEO.description} />
    <meta name="keywords" content={LAPTOP_SEO.keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={LAPTOP_SEO.canonicalUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={LAPTOP_SEO.title} />
    <meta property="og:description" content={LAPTOP_SEO.description} />
    <meta property="og:url" content={LAPTOP_SEO.canonicalUrl} />
    <meta property="og:image" content={LAPTOP_SEO.ogImage} />
    <meta property="og:locale" content="id_ID" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={LAPTOP_SEO.title} />
    <meta name="twitter:description" content={LAPTOP_SEO.description} />
    <meta name="twitter:image" content={LAPTOP_SEO.ogImage} />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">{toJsonLd(webPageJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(breadcrumbJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(laptopCatalogJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
  </Helmet>
);

// ─── Helmet untuk halaman detail produk ───────────────────────────────────────
const LaptopDetailHelmet = ({ brand, id }) => {
  const brandDecoded = decodeURIComponent(brand).replace(/-/g, " ");
  const detailTitle = `Detail Laptop ${brandDecoded} | ${SITE_NAME}`;
  const detailDesc = `Spesifikasi dan harga laptop ${brandDecoded} — temukan detail lengkap produk ini di katalog Infoduta Computindo Perkasa.`;
  const detailUrl = `${BASE_URL}/produk/laptop/${brand}/${id}`;

  // JSON-LD untuk halaman detail produk individual
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Laptop ${brandDecoded}`,
    brand: { "@type": "Brand", name: brandDecoded },
    description: detailDesc,
    url: detailUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };

  const detailBreadcrumb = {
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
        name: "Laptop",
        item: LAPTOP_SEO.canonicalUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `Laptop ${brandDecoded}`,
        item: detailUrl,
      },
    ],
  };

  return (
    <Helmet>
      <html lang="id" />
      <title>{detailTitle}</title>
      <meta name="description" content={detailDesc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={detailUrl} />

      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={detailTitle} />
      <meta property="og:description" content={detailDesc} />
      <meta property="og:url" content={detailUrl} />
      <meta property="og:locale" content="id_ID" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={detailTitle} />
      <meta name="twitter:description" content={detailDesc} />

      <script type="application/ld+json">{toJsonLd(productJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(detailBreadcrumb)}</script>
      <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
    </Helmet>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Laptop = () => {
  const { brand, id } = useParams();

  // ── Halaman Detail Produk ──
  if (brand && id) {
    return (
      <>
        <LaptopDetailHelmet brand={brand} id={id} />
        <DetailProduk dataSource="../produk.json" />
      </>
    );
  }

  // ── Halaman Katalog ──
  return (
    <>
      <LaptopCatalogHelmet />
      <SubProduk
        jenisBarang="laptop"
        title="Laptop"
        description="Temukan berbagai pilihan Laptop dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../produk.json"
      />
    </>
  );
};

export default Laptop;
